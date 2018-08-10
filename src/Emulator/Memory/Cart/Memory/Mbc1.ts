import {toHex} from '../../../util';
import {HeaderRegions} from '../Headers';
import {CartMemory} from './index';

export enum Mbc1Mode {
	ROM = 0x00,
	RAM = 0x01,
}

const logoData = [
	0xce, 0xed, 0x66, 0x66, 0xcc, 0x0d, 0x00, 0x0b, 0x03, 0x73, 0x00, 0x83,
	0x00, 0x0c, 0x00, 0x0d, 0x00, 0x08, 0x11, 0x1f, 0x88, 0x89, 0x00, 0x0e,
	0xdc, 0xcc, 0x6e, 0xe6, 0xdd, 0xdd, 0xd9, 0x99, 0xbb, 0xbb, 0x67, 0x63,
	0x6e, 0x0e, 0xec, 0xcc, 0xdd, 0xdc, 0x99, 0x9f, 0xbb, 0xb9, 0x33, 0x3e
];

const isMulticart = (data: Uint8Array, romBanks: number): boolean => {
	if (romBanks !== 64)
		return false;

	const {start, end} = HeaderRegions.logo;

	for (let i = 0, ii = data.length; i < ii; i += 0x4000) {
		const offset = i + start;
		const logo = data.slice(offset, i + end);

		let match = true;

		for (let j = 0, jj = logo.length; j < jj; j++) {
			if (data[offset + j] !== logoData[j]) {
				match = false;

				break;
			}
		}

		if (match)
			return true;
	}

	return false;
};

export class Mbc1 implements CartMemory {
	protected multicart: boolean;
	protected rom: Uint8Array[];
	protected ram: Uint8Array[];

	protected lbank: number = 1;
	protected hbank: number = 0;
	protected ramEnabled: boolean = false;
	protected mode: Mbc1Mode = Mbc1Mode.ROM;

	public constructor(data: Uint8Array, romBanks: number, ramBanks: number) {
		this.multicart = isMulticart(data, romBanks);

		this.rom = this.createMemory(romBanks, 0x4000, data); // $romBanks number of 16k memory segments
		this.ram = this.createMemory(ramBanks, 0x2000); // $ramBanks number of 8k memory segments
	}

	public readByte(address: number): number {
		const highNibble = address >> 12;

		if (highNibble <= 3) {
			let bank = 0;

			if (this.mode === Mbc1Mode.RAM) {
				if (this.multicart)
					bank = this.hbank << 4;
				else
					bank = this.hbank << 5;
			}

			return this.wrap(this.rom, bank)[address];
		} else if (highNibble <= 7) {
			let bank;

			if (this.multicart)
				bank = this.lbank & 15 | (this.hbank & 3) << 4;
			else
				bank = this.lbank | (this.hbank << 5);

			return this.wrap(this.rom, bank)[address & 0x3FFF];
		} else if (highNibble === 10 || highNibble === 11) {
			if (!this.ramEnabled)
				throw new Error('Cannot read RAM while RAM is disabled');
			else if (!this.ram.length)
				throw new Error('Cannot read RAM: no RAM banks loaded');

			let bank = 0;

			if (this.mode === Mbc1Mode.RAM)
				bank = this.hbank;

			return this.wrap(this.ram, bank)[address & 0x1FFF];
		}

		throw new Error(`Unmapped address ${toHex(address, 4)}`);
	}

	public writeByte(address: number, value: number): void {
		const highNibble = address >> 12;

		if (highNibble <= 1)
			this.ramEnabled = (value & 15) === 10;
		else if (highNibble <= 3) {
			value &= 0x1F;

			if (value === 0)
				value = 1;

			this.lbank = value;
		} else if (highNibble <= 5)
			this.hbank = value & 3;
		else if (highNibble <= 7)
			this.mode = value & 1;
		else if (highNibble === 10 || highNibble === 11) {
			if (!this.ramEnabled)
				throw new Error('Cannot write RAM while RAM is disabled');
			else if (!this.ram.length)
				throw new Error('Cannot write RAM: no RAM banks loaded');

			let bank = 0;

			if (this.mode === Mbc1Mode.RAM)
				bank = this.hbank;

			this.wrap(this.ram, bank)[address & 0x1FFF] = value;
		} else
			throw new Error(`Unmapped address ${toHex(address, 4)}`);
	}

	protected wrap(banks: Uint8Array[], index: number): Uint8Array {
		return banks[index & (banks.length - 1)];
	}

	protected createMemory(count: number, size: number, data?: Uint8Array): Uint8Array[] {
		return (new Array(count))
			.fill(null)
			.map((value, index): Uint8Array => {
				const offset = index * size;

				if (offset + size <= data.length)
					return data.slice(offset, offset + size);

				return new Uint8Array(size);
			});
	}
}