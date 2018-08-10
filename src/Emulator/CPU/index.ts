import {Application} from '../../Application';
import {HardwareBusAwareInterface, HardwareBusInterface} from '../Hardware';
import {lpad, toHex} from '../util';
import {Clock, ClockInterface} from './Clock';
import {CpuAfterInstructionCallEvent} from './Events/CpuAfterInstructionCallEvent';
import {CpuAfterStepEvent} from './Events/CpuAfterStepEvent';
import {CpuInstructionCallEvent} from './Events/CpuInstructionCallEvent';
import {CpuStepEvent} from './Events/CpuStepEvent';
import {PrimaryInstructions} from './InstructionSet';
import {RegisterSet, RegisterSetInterface} from './Registers';

export interface CpuInterface {
	clock: ClockInterface;
	registers: RegisterSetInterface;

	allowInterrupts: boolean;

	halt: boolean;
	stop: boolean;

	exec(): void;
	reset(): void;
}

export class Cpu implements CpuInterface, HardwareBusAwareInterface {
	public clock: ClockInterface;
	public registers: RegisterSetInterface;

	public halt: boolean = false;
	public stop: boolean = false;
	public allowInterrupts: boolean = true;
	public tickInterval: number = 1;
	public enableLog: boolean = false;

	private hardware: HardwareBusInterface = null;
	private tickIntervalId: number = null;

	public constructor() {
		this.clock = new Clock();
		this.registers = new RegisterSet();
	}

	public setHardwareBus(hardware: HardwareBusInterface): void {
		this.hardware = hardware;
	}

	public exec(): void {
		this.halt = false;
		this.stop = false;

		this.frame();
	}

	public reset(): void {
		this.clock.reset();
		this.registers.reset();

		this.halt = true;
		this.stop = false;
	}

	protected frame(): void {
		this.tickIntervalId = null;

		const frameClock = this.clock.m + 17556;

		do {
			Application.getEventDispatcher().dispatch(new CpuStepEvent(this));

			this.step();

			if (this.halt || this.stop)
				return;
		} while (this.tickInterval === 1 && this.clock.m < frameClock);

		this.tickIntervalId = setTimeout(() => this.frame(), this.tickInterval);
	}

	protected step(): void {
		const opcode = this.hardware.memory.readByte(this.registers.programCount++);
		let operator = PrimaryInstructions.getByCode(opcode);

		this.registers.programCount &= 65535;

		if (!operator) {
			this.stop = true;

			throw new Error(`Instruction ${toHex(opcode)} is not implemented (at ${(this.registers.programCount - 1) & 65535})`);
		}

		const event = new CpuInstructionCallEvent(this, operator);

		Application.getEventDispatcher().dispatch(event);

		operator = event.operator;

		if (this.enableLog)
			console.log(`${lpad(this.registers.programCount.toString(), 5)}: (${toHex(operator.opcode)}) ${operator.name}`);

		operator.invoke(this.hardware);

		this.hardware.gpu.step();

		const memory = this.hardware.memory;

		if (this.allowInterrupts && memory.interruptsEnabled && memory.interruptFlags) {
			this.halt = false;
			this.allowInterrupts = false;

			const interrupts = memory.interruptsEnabled & memory.interruptFlags;

			if (interrupts & 1) {
				memory.interruptFlags &= 0xFE;

				PrimaryInstructions.getByName('InterruptJumpTo40').invoke(this.hardware);
			} else if (interrupts & 2) {
				memory.interruptFlags &= 0xFD;

				PrimaryInstructions.getByName('InterruptJumpTo48').invoke(this.hardware);
			} else if (interrupts & 4) {
				memory.interruptFlags &= 0xFB;

				PrimaryInstructions.getByName('InterruptJumpTo50').invoke(this.hardware);
			} else if (interrupts & 8) {
				memory.interruptFlags &= 0xF7;

				PrimaryInstructions.getByName('InterruptJumpTo58').invoke(this.hardware);
			} else if (interrupts & 16) {
				memory.interruptFlags &= 0xEF;

				PrimaryInstructions.getByName('InterruptJumpTo60').invoke(this.hardware);
			} else
				this.allowInterrupts = true;
		}

		this.clock.m += this.registers.m;

		Application.getEventDispatcher().dispatch(new CpuAfterInstructionCallEvent(this, operator));
	}
}