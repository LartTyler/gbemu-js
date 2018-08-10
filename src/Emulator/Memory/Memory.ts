import {GpuInterface} from '../_GPU';
import {VideoMemory, VideoMemoryInterface} from '../GPU/VideoMemory';
import {HardwareBusAwareInterface, HardwareBusInterface} from '../Hardware';
import {JoypadInterface} from '../Joypad';
import {pairTo16Bit, toHex} from '../util';
import {bios} from './bios';
import {Cart, CartInterface} from './Cart/Cart';
import {findRegion, MemoryRegion} from './Regions';

export interface MemoryInterface {
	interruptsEnabled: number;
	interruptFlags: number;

	readonly video: VideoMemoryInterface;

	readByte(address: number): number;
	readWord(address: number): number;
	writeByte(address: number, value: number): void;
	writeWord(address: number, value: number): void;

	load(cartFile: File): Promise<FileReader>;
	reset(full?: boolean): void;
}

export class Memory implements MemoryInterface, HardwareBusAwareInterface {
	public readonly video: VideoMemoryInterface;

	public interruptsEnabled: number = 0;
	public interruptFlags: number = 0;

	protected bios: Uint8Array;
	protected workingRam: Uint8Array;
	protected ioRam: Uint8Array;
	protected zeroPageRam: Uint8Array;

	protected biosEnabled: boolean = true;
	protected cart: CartInterface = null;
	protected joypad: JoypadInterface = null;
	protected gpu: GpuInterface = null;

	public constructor() {
		this.bios = bios;
		this.video = new VideoMemory();

		this.reset();
	}

	public setHardwareBus(hardware: HardwareBusInterface): void {
		this.joypad = hardware.joypad;
		this.gpu = hardware.gpu;
	}

	public load(cartFile: File): Promise<FileReader> {
		const reader = new FileReader();

		return new Promise<FileReader>((resolve, reject) => {
			reader.addEventListener('load', () => {
				this.cart = new Cart(reader.result.split('').map((char: string) => char.charCodeAt(0)));

				resolve(reader);
			});

			reader.addEventListener('error', () => reject(reader.error));
			reader.addEventListener('abort', () => reject(null));

			reader.readAsBinaryString(cartFile);
		});
	}

	public readByte(address: number): number {
		const region = findRegion(address);

		// Disable the BIOS once we begin executing instructions on the cart
		if (address === 0x100)
			this.biosEnabled = false;

		switch (region) {
			case MemoryRegion.BIOS:
				if (this.biosEnabled)
					return this.bios[address];

			case MemoryRegion.CART:
				return this.cart.readByte(address);

			case MemoryRegion.VIDEO:
				return this.video.readByte(address);

			case MemoryRegion.WORKING:
				return this.workingRam[address & 0x1FFF];

			case MemoryRegion.INTERRUPT_ENABLE:
				return this.interruptsEnabled;

			case MemoryRegion.INTERRUPT_FLAGS:
				return this.interruptFlags;

			case MemoryRegion.ZERO_PAGE:
				return this.zeroPageRam[address & 0x7F];

			case MemoryRegion.JOYPAD:
				return this.joypad.readByte(address);

			case MemoryRegion.TIMER:
				throw new Error('Timer not yet implemented');

			case MemoryRegion.GPU:
				return this.gpu.readByte(address);

			case MemoryRegion.LCD:
				throw new Error('LCD not yet implemented');

			case MemoryRegion.IO:
				return this.ioRam[address & 0xFF];

			case MemoryRegion.BLANK:
				return 0;

			default:
				throw new Error(`Unmapped address ${toHex(address, 4)}`);
		}
	}

	public readWord(address: number): number {
		return pairTo16Bit(this.readByte(address + 1), this.readByte(address));
	}

	public writeByte(address: number, value: number): void {
		const region = findRegion(address);

		switch (region) {
			case MemoryRegion.BIOS:
			case MemoryRegion.CART:
				this.cart.writeByte(address, value);

				break;

			case MemoryRegion.VIDEO:
				this.video.writeByte(address, value);

				break;

			case MemoryRegion.WORKING:
				this.workingRam[address & 0x1FFF] = value;

				break;

			case MemoryRegion.INTERRUPT_ENABLE:
				this.interruptsEnabled = value;

				break;

			case MemoryRegion.INTERRUPT_FLAGS:
				this.interruptFlags = value;

				break;

			case MemoryRegion.ZERO_PAGE:
				this.zeroPageRam[address & 0x7F] = value;

				break;

			case MemoryRegion.JOYPAD:
				this.joypad.writeByte(address, value);

				break;

			case MemoryRegion.TIMER:
				throw new Error('Timer not yet implemented');

			case MemoryRegion.GPU:
				this.gpu.writeByte(address, value);

				break;

			case MemoryRegion.LCD:
				throw new Error('LCD not yet implemented');

			case MemoryRegion.IO:
				this.ioRam[address & 0xFF] = value;

				break;

			case MemoryRegion.BLANK:
				break;

			default:
				throw new Error(`Unmapped address ${toHex(address, 4)}`);
		}
	}

	public writeWord(address: number, value: number): void {
		this.writeByte(address, value & 0xFF);
		this.writeByte(address + 1, value >> 8);
	}

	public reset(full: boolean = false): void {
		this.biosEnabled = this.bios.length > 0;
		this.interruptsEnabled = 0;
		this.interruptFlags = 0;

		this.workingRam = new Uint8Array(0x2000); // 8k working RAM
		this.ioRam = new Uint8Array(0x80); // 128b IO RAM
		this.zeroPageRam = new Uint8Array(0x7F); // 127b zero page RAM

		this.video.reset();

		if (full)
			this.cart = null;
	}
}