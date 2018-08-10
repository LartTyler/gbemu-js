import {HeaderRegions, Headers, RomSizeBanks, RamSizeBanks} from './Headers';
import {CartMemory, MemoryTypes} from './Memory';

export interface CartInterface {
	readonly headers: Headers;

	readByte(address: number): number;
	writeByte(address: number, value: number): void;
}

export class Cart implements CartInterface {
	public readonly headers: Headers;

	private romBanks: number;
	private ramBanks: number;
	private memory: CartMemory;

	public constructor(buffer: ArrayBuffer) {
		const data = new Uint8Array(buffer);

		this.headers = new Headers(
			String.fromCharCode(...data.slice(HeaderRegions.title.start, HeaderRegions.title.end)).replace(/\0/g, ''),
			data[HeaderRegions.type],
			data[HeaderRegions.romSize],
			data[HeaderRegions.ramSize],
		);

		this.romBanks = RomSizeBanks[this.headers.romSize] || 0;
		this.ramBanks = RamSizeBanks[this.headers.ramSize] || 0;

		const MemoryType = MemoryTypes.getMemoryClass(this.headers.type);

		this.memory = new MemoryType(data, this.romBanks, this.ramBanks);
	}

	public readByte(address: number): number {
		return this.memory.readByte(address);
	}

	public writeByte(address: number, value: number): void {
		this.memory.writeByte(address, value);
	}
}