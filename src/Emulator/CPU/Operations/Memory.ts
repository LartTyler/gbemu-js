import {OperatorCallback, OperatorSet} from './index';

export interface MemoryOperatorSet extends OperatorSet {
	PushBC: OperatorCallback;
	PopHL: OperatorCallback;
	LoadAbsA: OperatorCallback;
}

export const MemoryOperators: MemoryOperatorSet = {
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
	LoadAbsA: hardware => {
		const memory = hardware.memory;
		const registers = hardware.cpu.registers;

		const address = memory.readWord(registers.programCount);
		registers.programCount += 2;

		registers.a = memory.readByte(address);

		registers.m = 4;
	}
};