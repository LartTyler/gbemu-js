import {HardwareBusAwareInterface, HardwareBusInterface} from '../Hardware';
import {Palette} from './Color';

export interface GpuInterface {
	vram: Int16Array;
	oam: Int16Array;

	updateTile(address: number, value: number): void;
	updateOAM(address: number, value: number): void;
	step(): void;
	reset(): void;

	readByte(address: number): number;
	writeByte(address: number, value: number): void;
}

/**
 * OAM_READ: 80 ticks
 * VRAM_READ: 172 ticks
 * HBLANK: 204 ticks
 *
 * Full line = OAM_READ + VRAM_READ + HBLANK = 456 ticks
 */
export enum RenderingMode {
	HBLANK,
	VBLANK,
	OAM_READ,
	VRAM_READ,
}

export class Gpu implements GpuInterface, HardwareBusAwareInterface {
	public vram: Int16Array;
	public oam: Int16Array;

	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	private screen: ImageData;
	private tileset: number[][][];
	private palette: Palette;

	private scrollX: number = 0;
	private scrollY: number = 0;
	private bgMap = false;
	private bgTile = 0;
	private mode = RenderingMode.HBLANK;
	private modeClock = 0;
	private line = 0;

	private hardware: HardwareBusInterface = null;

	public constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.palette = new Palette();

		this.reset();
	}

	public updateTile(address: number, value: number): void {
		address &= 0x1FFE;

		const tile = (address >> 4) & 511;
		const y = (address >> 1) & 7;

		let sx;

		for (let x = 0; x < 8; x++) {
			sx = 1 << (7 - x);

			this.tileset[tile][y][x] = (this.vram[address] & sx ? 1 : 0) | (this.vram[address + 1] & sx ? 2 : 0);
		}
	}

	public updateOAM(address: number, value: number): void {

	}

	public step(): void {
		this.modeClock += this.hardware.cpu.registers.t;

		switch (this.mode) {
			case RenderingMode.OAM_READ:
				if (this.modeClock >= 80) {
					this.modeClock = 0;
					this.mode = RenderingMode.VRAM_READ;
				}

				break;

			case RenderingMode.VRAM_READ:
				if (this.modeClock >= 172) {
					this.modeClock = 0;
					this.mode = RenderingMode.HBLANK;

					this.render();
				}

				break;

			case RenderingMode.HBLANK:
				if (this.modeClock >= 204) {
					this.modeClock = 0;

					if (++this.line === 143) {
						this.mode = RenderingMode.VBLANK;

						this.context.putImageData(this.screen, 0, 0);
					} else
						this.mode = RenderingMode.OAM_READ;
				}

				break;

			case RenderingMode.VBLANK:
				if (this.modeClock >= 456) {
					this.modeClock = 0;

					if (++this.line > 153) {
						this.mode = RenderingMode.OAM_READ;
						this.line = 0;
					}
				}

				break;
		}
	}

	public reset(): void {
		this.palette.reset();

		this.vram = new Int16Array(1 << 13); // 8k
		this.oam = new Int16Array(160);

		this.context = this.canvas.getContext('2d');
		this.screen = this.context.createImageData(160, 144);

		this.context.putImageData(this.screen, 0, 0);

		this.tileset = [];

		for (let i = 0; i < 512; i++) {
			this.tileset.push([]);

			for (let j = 0; j < 8; j++)
				this.tileset[i].push((new Array(8).fill(0)));
		}
	}

	public readByte(address: number): number {
		console.log(address - 0xFF40);

		return 0;
	}

	public writeByte(address: number, value: number): void {
		console.log(address - 0xFF40);
	}

	public setHardwareBus(hardware: HardwareBusInterface): void {
		this.hardware = hardware
	}

	protected render(): void {
		let mapOffset = this.bgMap ? 0x1C00 : 0x1800;
		mapOffset += ((this.line + this.scrollY) & 255) >> 3;

		let lineOffset = this.scrollX >> 3;

		let y = (this.line + this.scrollY) & 7;
		let x = this.scrollX & 7;

		let canvasOffset = this.line * 160 * 4;

		let tile = this.vram[mapOffset + lineOffset];

		if (this.bgTile === 1 && tile < 128)
			tile += 256;

		for (let i = 0; i < 160; i++) {
			let color = this.palette.get(this.tileset[tile][y][x]);

			this.screen.data[canvasOffset++] = color.r;
			this.screen.data[canvasOffset++] = color.g;
			this.screen.data[canvasOffset++] = color.b;
			this.screen.data[canvasOffset++] = color.a;

			if (++x === 8) {
				x = 0;

				lineOffset = (lineOffset + 1) & 31;
				tile = this.vram[mapOffset + lineOffset];

				if (this.bgTile === 1 && tile < 128)
					tile += 256;
			}
		}
	}
}