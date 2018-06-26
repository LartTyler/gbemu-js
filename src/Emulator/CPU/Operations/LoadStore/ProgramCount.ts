import {MemoryInterface} from '../../../Memory/index';
import {RegisterKey, RegisterSetInterface} from '../../Registers';
import {OperatorCallback, OperatorSet} from '../index';

const pcToRegisterAndAdvance = (destination: RegisterKey, memory: MemoryInterface, registers: RegisterSetInterface) => {
	registers[destination] = memory.readByte(registers.programCount++);
};

export interface ProgramCountOperatorSet extends OperatorSet {
	LoadPCToA_Advance: OperatorCallback;
	LoadPCToB_Advance: OperatorCallback;
	LoadPCToC_Advance: OperatorCallback;
	LoadPCToD_Advance: OperatorCallback;
	LoadPCToE_Advance: OperatorCallback;
	LoadPCToH_Advance: OperatorCallback;
	LoadPCToL_Advance: OperatorCallback;

	LoadPCWordIntoA: OperatorCallback;

	LoadPCWordIntoHL: OperatorCallback;

	SomeCrazyShitWithHLAndSP: OperatorCallback;
}

export const ProgramCountOperators: ProgramCountOperatorSet = {
	LoadPCToA_Advance: hardware => pcToRegisterAndAdvance('a', hardware.memory, hardware.cpu.registers),
	LoadPCToB_Advance: hardware => pcToRegisterAndAdvance('b', hardware.memory, hardware.cpu.registers),
	LoadPCToC_Advance: hardware => pcToRegisterAndAdvance('c', hardware.memory, hardware.cpu.registers),
	LoadPCToD_Advance: hardware => pcToRegisterAndAdvance('d', hardware.memory, hardware.cpu.registers),
	LoadPCToE_Advance: hardware => pcToRegisterAndAdvance('e', hardware.memory, hardware.cpu.registers),
	LoadPCToH_Advance: hardware => pcToRegisterAndAdvance('h', hardware.memory, hardware.cpu.registers),
	LoadPCToL_Advance: hardware => pcToRegisterAndAdvance('l', hardware.memory, hardware.cpu.registers),

	LoadPCWordIntoA: hardware => {
		const memory = hardware.memory;
		const registers = hardware.cpu.registers;

		registers.a = memory.readByte(memory.readWord(registers.programCount));
		registers.programCount += 2;

		registers.m = 4;
	},

	LoadPCWordIntoHL: hardware => {
		const memory = hardware.memory;
		const registers = hardware.cpu.registers;

		const index = memory.readWord(registers.programCount);

		registers.programCount += 2;

		memory.writeWord(index, (registers.h << 8) + registers.l);

		registers.m = 5;
	},

	SomeCrazyShitWithHLAndSP: hardware => {
		const memory = hardware.memory;
		const registers = hardware.cpu.registers;

		let i = memory.readByte(registers.programCount++);

		if (i > 127)
			i = -((~i + 1) & 255);

		i += registers.stackPointer;

		registers.h = (i >> 8) & 255;
		registers.l = i & 255;

		registers.m = 3;
	},
};