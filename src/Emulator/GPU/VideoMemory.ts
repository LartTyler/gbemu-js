import {toHex} from '../util';

export interface VideoMemoryInterface {
	readByte(address: number): number;
	writeByte(address: number, value: number): void;

	reset(): void;
}

export class VideoMemory implements VideoMemoryInterface {
	public bgMap: [Uint8Array, Uint8Array];
	public tiles: Uint8Array[][];
	public sprites: Uint8Array[];

	protected ram: Uint8Array;
	protected oam: Uint8Array;

	public constructor() {
		this.reset();
	}

	public readByte(address: number): number {
		const highNibble = address >> 12;

		if (highNibble === 8 || highNibble === 9)
			return this.ram[address & 0x1FFF];
		else if (highNibble === 15 && address > 0xFDFF)
			return this.oam[address & 0xFF];

		throw new Error(`Unmapped address ${toHex(address, 4)}`);
	}

	public writeByte(address: number, value: number): void {
		const highNibble = address >> 12;

		if (highNibble === 8 || highNibble === 9) {
			if (address > 0x97FF)
				this.bgMap[address >> 10 & 1][address & 0x3FF] = value;
			else {
				const pos = address & 0x1FFF;

				this.tiles[pos >> 4][pos >> 1 & 7] = this.getLine(this.ram[pos - 1], value);
			}

			this.ram[address & 0x1FFF] = value;
		} else if (highNibble === 15 && address > 0xFDFF) {
			const pos = address & 0xFF;

			this.sprites[pos >> 2][pos & 3] = value;
			this.oam[pos] = value;
		} else
			throw new Error(`Unmapped address ${toHex(address, 4)}`);
	}

	public reset(): void {
		this.ram = new Uint8Array(0x2000); // 8k video RAM
		this.oam = new Uint8Array(0xA0); // 160b OAM RAM

		this.bgMap = [(new Uint8Array(0x400)).fill(0), (new Uint8Array(0x400)).fill(0)];

		this.tiles = new Array(0x400);

		for (let tileIndex = 0; tileIndex < 0x400; tileIndex++) {
			const tile = new Array(8);

			for (let i = 0; i < 8; i++) {
				const part = new Uint8Array(8);

				for (let j = 0; j < 8; j++)
					part[j] = 0;

				tile[i] = part;
			}

			this.tiles[tileIndex] = tile;
		}

		this.sprites = new Array(40);

		for (let i = 0; i < 40; i++)
			this.sprites[i] = (new Uint8Array(4)).fill(0);
	}

	protected getLine(x: number, y: number): Uint8Array {
		const line = new Uint8Array(8);

		for (let b = 7; b >= 0; b--)
			line[7 - b] = (x >> b & 1) | (y >> b & 1) << 1;

		return line;
	}
}
