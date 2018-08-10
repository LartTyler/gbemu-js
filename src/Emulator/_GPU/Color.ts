export type ColorData = [number, number, number, number];

export class Color {
	public readonly data: ColorData;

	public constructor(data: ColorData) {
		this.data = data;
	}

	public get r(): number {
		return this.data[0];
	}

	public set r(value: number) {
		this.data[0] = value;
	}

	public get g(): number {
		return this.data[1];
	}

	public set g(value: number) {
		this.data[1] = value;
	}

	public get b(): number {
		return this.data[2];
	}

	public set b(value: number) {
		this.data[2] = value;
	}

	public get a(): number {
		return this.data[3];
	}

	public set a(value: number) {
		this.data[3] = value;
	}

	public static fromRGB(r: number, g: number, b: number, a: number): Color {
		return new Color([r, g, b, a]);
	}
}

export class Palette {
	private colors: Color[];

	public constructor() {
		this.reset();
	}

	public get(index: number): Color {
		if (index < 0 || index > this.colors.length)
			throw new Error(`Invalid palette index: ${index}`);

		return this.colors[index];
	}

	public reset(): void {
		this.colors = [
			Color.fromRGB(255, 255, 255, 255),
			Color.fromRGB(192, 192, 192, 255),
			Color.fromRGB(96, 96, 96, 255),
			Color.fromRGB(0, 0, 0, 255),
		];
	}
}