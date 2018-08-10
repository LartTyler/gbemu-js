import {Interrupt} from './Interrupts';
import {MemoryInterface} from './Memory/Memory';
import {toHex} from './util';

export enum KeyCodes {
	START = 13,
	SELECT = 16,
	LEFT = 37,
	UP = 38,
	RIGHT = 39,
	DOWN = 40,
	B = 88,
	A = 90,
}

export const KeyCodeValues = {
	[KeyCodes.START]: ~8,
	[KeyCodes.SELECT]: ~4,

	[KeyCodes.LEFT]: ~2,
	[KeyCodes.UP]: ~4,
	[KeyCodes.RIGHT]: ~1,
	[KeyCodes.DOWN]: ~8,

	[KeyCodes.B]: ~1,
	[KeyCodes.A]: ~2,
};

export interface JoypadInterface {
	onKeyDown(code: number): void;
	onKeyUp(code: number): void;
	readByte(address: number): number;
	writeByte(address: number, value: number): void;

	reset(): void;
}

export class Joypad implements JoypadInterface {
	protected memory: MemoryInterface = null;
	protected keys: {[code: number]: boolean};
	protected select: 0 | 1;
	protected joypad: [number, number];

	public constructor() {
		this.reset();
	}

	public onKeyDown(code: number): void {
		this.keys[code] = true;

		this.update();
	}

	public onKeyUp(code: number): void {
		this.keys[code] = false;

		this.update();
	}

	public readByte(address: number): number {
		if (address === 0xFF00)
			return this.joypad[this.select];

		throw new Error(`Unmapped address ${toHex(address, 4)}`);
	}

	public writeByte(address: number, value: number): void {
		if (address === 0xFF00) {
			const masked = value & 0x30;

			if (masked === 0x10)
				this.select = 0;
			else if (masked === 0x20)
				this.select = 1;
		} else
			throw new Error(`Unmapped address ${toHex(address, 4)}`);
	}

	public update(): void {
		this.joypad = [15, 15];

		if (this.keys[KeyCodes.START])
			this.joypad[0] &= KeyCodeValues[KeyCodes.START];

		if (this.keys[KeyCodes.SELECT])
			this.joypad[0] &= KeyCodeValues[KeyCodes.SELECT];

		if (this.keys[KeyCodes.A])
			this.joypad[0] &= KeyCodeValues[KeyCodes.A];

		if (this.keys[KeyCodes.B])
			this.joypad[0] &= KeyCodeValues[KeyCodes.B];

		if (this.keys[KeyCodes.LEFT])
			this.joypad[1] &= KeyCodeValues[KeyCodes.LEFT];

		if (this.keys[KeyCodes.UP])
			this.joypad[1] &= KeyCodeValues[KeyCodes.UP];

		if (this.keys[KeyCodes.RIGHT])
			this.joypad[1] &= KeyCodeValues[KeyCodes.RIGHT];

		if (this.keys[KeyCodes.DOWN])
			this.joypad[1] &= KeyCodeValues[KeyCodes.DOWN];

		this.memory.interruptFlags |= Interrupt.JOYPAD;
	}

	public reset(): void {
		this.keys = {};
		this.select = 0;
		this.joypad = [15, 15];
	}
}