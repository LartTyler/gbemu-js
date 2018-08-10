import {CartType} from '../Headers';
import {Mbc1} from './Mbc1';
import {Rom} from './Rom';

interface CartMemoryConstructor {
	new (data: Uint8Array, romBanks: number, ramBanks: number): CartMemory;
}

export interface CartMemory {
	readByte(address: number): number;
	writeByte(address: number, value: number): void;
}

export class MemoryTypes {
	public static getMemoryClass(type: CartType): CartMemoryConstructor {
		if (type === CartType.ROM)
			return Rom;
		else if (type in [CartType.MBC1, CartType.MBC1_RAM, CartType.MBC1_RAM_BATTERY])
			return Mbc1;

		throw new Error(`${CartType[type]} is not supported yet`);
	}
}