import {toHex} from '../../../util';
import {CartMemory} from './index';

export class Rom implements CartMemory {
	protected data: Uint8Array;

	public constructor(data: Uint8Array) {
		this.data = data.slice(0, 0x8000); // 32 KB
	}

	public readByte(address: number): number {
		if (address >= 0x8000)
			throw new Error(`Unmapped address ${toHex(address, 4)}`);

		return this.data[address];
	}

	public writeByte(address: number, value: number): void {
		throw new Error('Cannot write to ROM');
	}
}