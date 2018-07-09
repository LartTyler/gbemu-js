import {HardwareBusAwareInterface, HardwareBusInterface} from '../Hardware';
import {toHex} from '../util';
import {Clock, ClockInterface} from './Clock';
import {PrimaryInstructions} from './InstructionSet';
import {RegisterSet, RegisterSetInterface} from './Registers';

export interface CpuInterface {
	clock: ClockInterface;
	registers: RegisterSetInterface;

	allowInterrupts: boolean;

	halt: boolean;
	stop: boolean;

	step(): void;
	exec(): void;
	reset(): void;
}

export class Cpu implements CpuInterface, HardwareBusAwareInterface {
	public clock: ClockInterface;
	public registers: RegisterSetInterface;

	public halt: boolean = false;
	public stop: boolean = false;
	public allowInterrupts: boolean = true;

	private hardware: HardwareBusInterface = null;
	private tickIntervalId: number = null;

	public constructor() {
		this.clock = new Clock();
		this.registers = new RegisterSet();
	}

	public setHardwareBus(hardware: HardwareBusInterface): void {
		this.hardware = hardware;
	}

	public step(): void {
		const opcode = this.hardware.memory.readByte(this.registers.programCount++);
		const operator = PrimaryInstructions.getByCode(opcode);

		this.registers.programCount &= 65535;

		if (!operator) {
			this.stop = true;

			throw new Error(`Instruction ${toHex(opcode)} is not implemented (at ${(this.registers.programCount - 1) & 65535})`);
		}

		operator.invoke(this.hardware);
		this.clock.m += this.registers.m;

		this.hardware.gpu.step();

		const memory = this.hardware.memory;

		if (this.allowInterrupts && memory.interruptsEnabled && memory.interruptFlags) {
			this.halt = false;
			this.allowInterrupts = false;

			// const interrupts = memory.interruptsEnabled & memory.interruptFlags;

			let fired = false;

			// TODO Add interrupt handling

			if (!fired)
				this.allowInterrupts = true;
		}
	}

	public exec(): void {
		this.halt = false;
		this.stop = false;

		this.tickIntervalId = setInterval(() => {
			const frameClock = this.clock.m + 17556;

			do {
				this.step();

				if (this.halt || this.stop) {
					clearInterval(this.tickIntervalId);

					this.tickIntervalId = null;
				}
			} while (this.clock.m < frameClock);
		}, 1);
	}

	public reset(): void {
		this.clock.reset();
		this.registers.reset();

		this.halt = true;
		this.stop = false;
	}
}