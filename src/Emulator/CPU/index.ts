import {HardwareBusAwareInterface, HardwareBusInterface} from '../Hardware';
import {Clock, ClockInterface} from './Clock';
import {AddOperators, AddOperatorSet} from './Operations/Add';
import {CompareOperators, CompareOperatorSet} from './Operations/Compare';
import {ExtraOperators, ExtraOperatorSet} from './Operations/Extra';
import {OperatorCallback, OperatorSet} from './Operations/index';
import {MemoryOperators, MemoryOperatorSet} from './Operations/Memory';
import {RegisterSet, RegisterSetInterface} from './Registers';

export interface CompoundOperatorSet extends OperatorSet,
	AddOperatorSet,
	CompareOperatorSet,
	ExtraOperatorSet,
	MemoryOperatorSet {
}

export interface CpuInterface {
	clock: ClockInterface;
	registers: RegisterSetInterface;
	operators: CompoundOperatorSet;
	opcodes: OperatorCallback[];

	halt: boolean;
	stop: boolean;

	step(): void;
	exec(): void;
	reset(): void;
}

export class Cpu implements CpuInterface, HardwareBusAwareInterface {
	public clock: ClockInterface;
	public registers: RegisterSetInterface;
	public operators: CompoundOperatorSet;
	public opcodes: OperatorCallback[];

	public halt: boolean = false;
	public stop: boolean = false;

	private hardware: HardwareBusInterface = null;

	public constructor() {
		this.clock = new Clock();
		this.registers = new RegisterSet();
		this.operators = {
			...AddOperators,
			...CompareOperators,
			...ExtraOperators,
			...MemoryOperators,
		};

		this.opcodes = [

		];
	}

	public setHardwareBus(hardware: HardwareBusInterface): void {
		this.hardware = hardware;
	}

	public step(): void {
		const op = this.hardware.memory.readByte(this.registers.programCount++);

		this.opcodes[op](this.hardware);

		this.registers.programCount &= 65535;
		this.clock.m += this.registers.m;
		this.clock.t += this.registers.t;

		this.hardware.gpu.step();
	}

	public exec(): void {
		while (!this.halt && !this.stop)
			this.step();
	}

	public reset(): void {
		this.clock.reset();
		this.registers.reset();

		this.halt = false;
		this.stop = false;
	}
}