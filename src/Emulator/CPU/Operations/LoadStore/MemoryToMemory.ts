import {OperatorCallback, OperatorSet} from '../index';

export interface MemoryToMemoryOperatorSet extends OperatorSet {
	LoadPCIntoHLAddress: OperatorCallback;
}

export const MemoryToMemoryOperators: MemoryToMemoryOperatorSet = {
	LoadPCIntoHLAddress: hardware => {
		const memory = hardware.memory;
		const registers = hardware.cpu.registers;

		memory.writeByte((registers.h << 8) + registers.l, memory.readByte(registers.programCount++));

		registers.m = 3;
	},
};