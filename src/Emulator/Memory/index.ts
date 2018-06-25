import {HardwareBusAwareInterface, HardwareBusInterface} from '../Hardware';
import {bios} from './Bios';

export interface MemoryInterface {
	bios: Int16Array; // 256b
	rom: Int16Array; // 32k
	eram: Int16Array; // 8k
	wram: Int16Array; // 8k
	zram: Int16Array; // 128b

	readByte(address: number): number;
	readWord(address: number): number;
	writeByte(address: number, value: number): void;
	writeWord(address: number, value: number): void;

	load(file: File): Promise<FileReader>;
	reset(): void;
}

export class Memory implements MemoryInterface, HardwareBusAwareInterface {
	public bios: Int16Array;

	public rom: Int16Array;
	public eram: Int16Array;
	public wram: Int16Array;
	public zram: Int16Array;

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
				else if (this.hardware.cpu.registers.programCount === 0x0100)
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
				if (address >= 0xFF80)
					return this.zram[address & 0x7F];
				else
					return 0;
			}
		}
	}

	public readWord(address: number): number {
		return this.readByte(address) + (this.readByte(address + 1) << 8);
	}

	public writeByte(address: number, value: number): void {
		const masked = address & 0xF000;

		if (masked <= 0x7000) // ROM is not writable
			return;
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
			} else if (lowMasked === 0xF00 && address >= 0xFF80)
				this.zram[address & 0x7F] = value;
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
				this.rom = new Int16Array(reader.result);

				resolve(reader);
			});

			reader.addEventListener('error', () => reject(reader.error));
			reader.addEventListener('abort', () => reject(null));

			reader.readAsArrayBuffer(file);
		});
	}

	public reset(): void {
		this.inBios = true;

		this.rom = new Int16Array(1 << 15); // 32k
		this.eram = new Int16Array(1 << 13); // 8k
		this.wram = new Int16Array(1 << 13); // 8k
		this.zram = new Int16Array(128); // 128b
	}
}