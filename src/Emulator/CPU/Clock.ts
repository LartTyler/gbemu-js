/**
 * @see https://en.wikipedia.org/wiki/Zilog_Z80#Instruction_execution
 */
export interface ClockInterface {
	/**
	 * Machine cycles (also referred to as M-cycles)
	 */
	m: number;

	/**
	 * Clock periods (also referred to as T-cycles)
	 */
	t: number;

	reset(): void;
}

export class Clock implements ClockInterface {
	public t: number = 0;

	private _m: number = 0;

	get m() {
		return this._m;
	}

	set m(value: number) {
		this._m = value;
		this.t = value * 4;
	}

	public reset(): void {
		this.m = 0;
	}
}