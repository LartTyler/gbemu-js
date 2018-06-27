import {HardwareBusAwareInterface, HardwareBusInterface} from '../Hardware';
import {Clock, ClockInterface} from './Clock';
import {AddOperators, AddOperatorSet} from './Operations/Add';
import {BitManipulationOperators, BitManipulationOperatorSet} from './Operations/BitManipulation';
import {BitwiseOperators, BitwiseOperatorSet} from './Operations/Bitwise';
import {CompareOperators, CompareOperatorSet} from './Operations/Compare';
import {DecrementOperators, DecrementOperatorSet} from './Operations/Decrement';
import {ExtraOperators, ExtraOperatorSet} from './Operations/Extra';
import {IncrementOperators, IncrementOperatorSet} from './Operations/Increment';
import {OperatorCallback, OperatorSet} from './Operations/index';
import {LoadStoreOperators, LoadStoreOperatorSet} from './Operations/LoadStore';
import {toCbcodeMap, toOpcodeMap} from './Operations/mappings';
import {StackOperators, StackOperatorSet} from './Operations/Stack';
import {SubtractOperators, SubtractOperatorSet} from './Operations/Subtract';
import {RegisterSet, RegisterSetInterface} from './Registers';

export interface CompoundOperatorSet extends OperatorSet,
	AddOperatorSet,
	BitManipulationOperatorSet,
	BitwiseOperatorSet,
	CompareOperatorSet,
	DecrementOperatorSet,
	ExtraOperatorSet,
	IncrementOperatorSet,
	LoadStoreOperatorSet,
	StackOperatorSet,
	SubtractOperatorSet {
}

export interface CpuInterface {
	clock: ClockInterface;
	registers: RegisterSetInterface;
	operators: CompoundOperatorSet;
	opcodes: OperatorCallback[];
	cbcodes: OperatorCallback[];

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
	public cbcodes: OperatorCallback[];

	public halt: boolean = false;
	public stop: boolean = false;

	private hardware: HardwareBusInterface = null;

	public constructor() {
		this.clock = new Clock();
		this.registers = new RegisterSet();
		this.operators = {
			...AddOperators,
			...BitManipulationOperators,
			...BitwiseOperators,
			...CompareOperators,
			...DecrementOperators,
			...ExtraOperators,
			...IncrementOperators,
			...LoadStoreOperators,
			...StackOperators,
			...SubtractOperators,
		};

		this.opcodes = toOpcodeMap(this.operators);
		this.cbcodes = toCbcodeMap(this.operators);
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
		this.halt = false;
		this.stop = false;

		while (!this.halt && !this.stop)
			this.step();
	}

	public reset(): void {
		this.clock.reset();
		this.registers.reset();

		this.halt = true;
		this.stop = false;
	}
}