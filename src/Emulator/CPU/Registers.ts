import {Clock, ClockInterface} from './Clock';

export type RegisterKey = 'a' | 'b' | 'c' | 'd' | 'e' | 'h' | 'l' | 'stackPointer';

export interface RegisterSetInterface {
	a: number;
	b: number;
	c: number;
	d: number;
	e: number;
	h: number;
	l: number;

	flags: number;

	stackPointer: number;
	programCount: number;

	m: number;
	t: number;

	reset(): void;
}

export enum RegisterFlag {
	CARRY = 0x10,
	HALF_CARRY = 0x20,
	OPERATION = 0x40,
	ZERO = 0x80,
}

export class RegisterSet implements RegisterSetInterface {
	public a: number;
	public b: number;
	public c: number;
	public d: number;
	public e: number;
	public h: number;
	public l: number;

	public flags: number;

	public stackPointer: number;
	public programCount: number;

	private clock: ClockInterface;

	public constructor(clock?: ClockInterface) {
		this.clock = clock || new Clock();

		this.reset();
	}

	public reset(): void {
		this.a = 0;
		this.b = 0;
		this.c = 0;
		this.d = 0;
		this.e = 0;
		this.h = 0;
		this.l = 0;

		this.flags = 0;

		this.stackPointer = 0;
		this.programCount = 0;

		this.clock.reset();
	}

	get m() {
		return this.clock.m;
	}

	set m(value: number) {
		this.clock.m = value;
	}

	get t() {
		return this.clock.t;
	}

	set t(value: number) {
		this.clock.t = value;
	}
}