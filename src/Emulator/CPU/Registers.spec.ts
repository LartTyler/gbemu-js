import {RegisterSet} from './Registers';

describe('Registers', () => {
	test('should initialize with empty registers', () => {
		const registers = new RegisterSet();

		expect(registers.a).toBe(0);
		expect(registers.b).toBe(0);
		expect(registers.c).toBe(0);
		expect(registers.d).toBe(0);
		expect(registers.e).toBe(0);
		expect(registers.h).toBe(0);
		expect(registers.l).toBe(0);

		expect(registers.flags).toBe(0);

		expect(registers.programCount).toBe(0);
		expect(registers.stackPointer).toBe(0);

		expect(registers.m).toBe(0);
		expect(registers.t).toBe(0);
	});

	test('should update registers', () => {
		const registers = new RegisterSet();

		registers.a = 1;

		expect(registers.a).toBe(1);
	});

	test('should update clock cylces', () => {
		const registers = new RegisterSet();

		registers.m = 1;

		expect(registers.m).toBe(1);
		expect(registers.t).toBe(4);

		registers.m = 4;

		expect(registers.m).toBe(4);
		expect(registers.t).toBe(16);
	});

	test('should reset', () => {
		const registers = new RegisterSet();

		registers.a = 1;
		registers.b = 5;
		registers.m = 2;

		registers.reset();

		expect(registers.a).toBe(0);
		expect(registers.b).toBe(0);
		expect(registers.m).toBe(0);
		expect(registers.t).toBe(0);
	});
});