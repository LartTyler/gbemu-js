import {OperatorCallback, OperatorSet} from './index';

export interface StackOperatorSet extends OperatorSet {
	PushBC: OperatorCallback;
	PopHL: OperatorCallback;
}

export const StackOperators: StackOperatorSet = {
	PushBC: hardware => {
		const memory = hardware.memory;
		const registers = hardware.cpu.registers;

		memory.writeByte(--registers.stackPointer, registers.b);
		memory.writeByte(--registers.stackPointer, registers.c);

		registers.m = 3;
	},
	PopHL: hardware => {
		const memory = hardware.memory;
		const registers = hardware.cpu.registers;

		registers.l = memory.readByte(registers.stackPointer++);
		registers.h = memory.readByte(registers.stackPointer++);

		registers.m = 3;
	},
};