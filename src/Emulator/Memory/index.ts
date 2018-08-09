import {HardwareBusAwareInterface, HardwareBusInterface} from '../Hardware';
import {toHex} from '../util';
import {bios} from './Bios';

export interface MemoryInterface {
	bios: number[]; // 256b
	rom: number[]; // 32k
	eram: number[]; // 8k
	wram: number[]; // 8k
	zram: number[]; // 128b

	interruptsEnabled: number;
	interruptFlags: number;

	readByte(address: number): number;
	readWord(address: number): number;
	writeByte(address: number, value: number): void;
	writeWord(address: number, value: number): void;

	load(file: File): Promise<FileReader>;
	reset(): void;
}

export class Memory implements MemoryInterface, HardwareBusAwareInterface {
	public bios: number[];

	public rom: number[];
	public eram: number[];
	public wram: number[];
	public zram: number[];
	public interruptsEnabled: number;
	public interruptFlags: number;

	private inBios: boolean = true;
	private hardware: HardwareBusInterface = null;

	public constructor() {
		this.bios = bios;

		this.reset();
	}

	public readByte(address: number): number {
		const masked = address & 0xF000;

		if (masked === 0x0000) { // BIOS / High ROM0
			if (this.inBios) {
				if (address < 0x0100)
					return this.bios[address];
				else if (this.hardware.cpu.registers.programCount >= 0x0100)
					this.inBios = false;
			}

			return this.rom[address];
		} else if (masked <= 0x7000) // ROM0 / ROM1 (unbanked)
			return this.rom[address];
		else if (masked <= 0x9000) // Video RAM
			return this.hardware.gpu.vram[address & 0x1FFF];
		else if (masked <= 0xB000) // External RAM
			return this.eram[address & 0x1FFF];
		else if (masked <= 0xFD00) // Working RAM and WRAM shadow
			return this.wram[address & 0x1FFF];
		else {
			const lowMasked = address & 0x0F00;

			if (lowMasked === 0xE00) { // Graphics object attribute memory (OAM)
				if (address < 0xFEA0)
					return this.hardware.gpu.oam[address & 0xFF];
				else
					return 0;
			} else if (lowMasked === 0xF00) { // Zero-page RAM
				if (address === 0xFFFF)
					return this.interruptsEnabled;
				if (address >= 0xFF80)
					return this.zram[address & 0x7F];
				else {
					const ioMasked = address & 0xF0;

					if (ioMasked === 0x00) {
						const handlerMask = ioMasked & 0xF;

						if (handlerMask === 0)
							throw new Error('KEY not yet implemented');
						else if (handlerMask >= 4 && handlerMask <= 7)
							throw new Error('TIMER not yet implemented');
						else if (handlerMask === 15)
							return this.interruptFlags;
						else
							return 0;
					} else if (ioMasked >= 0x40 && ioMasked <= 0x70)
						return this.hardware.gpu.readByte(address);
					else
						return 0;
				}
			}
		}
	}

	public readWord(address: number): number {
		return this.readByte(address) + (this.readByte(address + 1) << 8);
	}

	public writeByte(address: number, value: number): void {
		const masked = address & 0xF000;

		if (masked <= 0x7000) // BIOS and ROM are not writable
			throw new Error(`Tried to write BIOS or ROM (0x${address.toString(16).toUpperCase()})`);
		else if (masked <= 0x9000) { // Video RAM
			const mapped = address & 0x1FFF;

			this.hardware.gpu.vram[mapped] = value;
			this.hardware.gpu.updateTile(mapped, value); // TODO this may need to be the full address, not the mapped one
		} else if (masked <= 0xB000) // External RAM
			this.eram[address & 0x1FFF] = value;
		else if (masked <= 0xFD000) // Working RAM / WRAM shadow
			this.wram[address & 0x1FFF] = value;
		else {
			const lowMasked = address & 0x0F00;

			if (lowMasked === 0xE00) {
				const mapped = address & 0xFF;

				if (mapped < 0xA0)
					return;

				this.hardware.gpu.updateOAM(mapped, value);
			} else if (lowMasked === 0xF00) { // Zero-page RAM
				if (address === 0xFFFF)
					this.interruptsEnabled = value;
				else if (address >= 0xFF80)
					this.zram[address & 0x7F] = value;
				else {
					const ioMasked = address & 0xF0;

					if (ioMasked === 0x00) {
						const handlerMask = ioMasked & 0xF;

						if (handlerMask === 0)
							throw new Error('KEY not yet implemented');
						else if (handlerMask >= 4 && handlerMask <= 7)
							throw new Error('TIMER not yet implemented');
						else if (handlerMask === 15)
							this.interruptFlags = value;
					} else if (ioMasked >= 0x40 && ioMasked <= 0x70)
						this.hardware.gpu.writeByte(address, value);
				}
			}
		}
	}

	public writeWord(address: number, value: number): void {
		this.writeByte(address, value & 255);
		this.writeByte(address + 1, value >> 8);
	}

	public setHardwareBus(hardware: HardwareBusInterface): void {
		this.hardware = hardware;
	}

	public load(file: File): Promise<FileReader> {
		const reader = new FileReader();

		return new Promise<FileReader>((resolve, reject) => {
			reader.addEventListener('load', () => {
				this.rom = reader.result.split('').map((char: string) => char.charCodeAt(0));

				resolve(reader);
			});

			reader.addEventListener('error', () => reject(reader.error));
			reader.addEventListener('abort', () => reject(null));

			reader.readAsBinaryString(file);
		});
	}

	public reset(): void {
		this.inBios = true;

		this.rom = (new Array(1 << 15)).fill(0); // 32k
		this.eram = (new Array(1 << 13)).fill(0); // 8k
		this.wram = (new Array(1 << 13)).fill(0); // 8k
		this.zram = (new Array(128)).fill(0); // 128b

		this.interruptsEnabled = 0;
		this.interruptFlags = 0;
	}
}