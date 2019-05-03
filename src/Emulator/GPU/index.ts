import {HardwareBusAwareInterface, HardwareBusInterface} from '../Hardware';

export enum GpuState {
	HORIZ_BLANK = 0,
	VERT_BLANK = 1,
	OAM_READ = 2,
	VRAM_READ = 3,
}

export enum StateClockSteps {
	SCANLINE_OAM = 80,
	SCANLINE_VRAM = 172,
	HORIZ_BLANK = 204,
	LINE_DRAW = 456,
	VERT_BLANK = LINE_DRAW * 10,
	FRAME_FINISH = 70224,
}

interface GpuInterface {
	step(): void;
	reset(): void;
}

export class Gpu implements GpuInterface, HardwareBusAwareInterface {
	protected canvas: HTMLCanvasElement;
	protected context: CanvasRenderingContext2D;
	protected screen: ImageData;
	protected hardware: HardwareBusInterface;

	protected state: GpuState = GpuState.HORIZ_BLANK;
	protected clock: number = 0;
	protected line: number = 0;

	public constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;

		this.reset();
	}

	public render(): void {
	}

	public draw(): void {
		this.context.putImageData(this.screen, 0, 0);
	}

	public step(): void {
		this.clock += this.hardware.cpu.registers.t;

		switch (this.state) {
			case GpuState.OAM_READ:
				if (this.clock >= StateClockSteps.SCANLINE_OAM) {
					this.clock = 0;
					this.state = GpuState.VRAM_READ;
				}

				break;

			case GpuState.VRAM_READ:
				if (this.clock >= StateClockSteps.SCANLINE_VRAM) {
					this.clock = 0;
					this.state = GpuState.HORIZ_BLANK;

					this.render();
				}

				break;

			case GpuState.HORIZ_BLANK:
				if (this.clock >= StateClockSteps.HORIZ_BLANK) {
					this.clock = 0;

					if (++this.line === 143) {
						this.state = GpuState.VERT_BLANK;

						this.draw();
					} else
						this.state = GpuState.OAM_READ;
				}

				break;

			case GpuState.VERT_BLANK:
				if (this.clock >= StateClockSteps.LINE_DRAW) {
					this.clock = 0;

					if (++this.line > 153) {
						this.state = GpuState.OAM_READ;
						this.line = 0;
					}
				}

				break;

			default:
				throw new Error('Unrecognized state ' + this.state);
		}
	}

	public setHardwareBus(hardware: HardwareBusInterface): void {
		this.hardware = hardware;
	}

	public reset(): void {
		this.context = this.canvas.getContext('2d');
		this.screen = this.context.createImageData(160, 144);

		this.context.putImageData(this.screen, 0, 0);
	}
}
