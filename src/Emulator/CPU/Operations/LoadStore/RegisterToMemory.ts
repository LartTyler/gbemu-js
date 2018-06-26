import {HardwareBusInterface} from '../../../Hardware';
import {RegisterKey} from '../../Registers';
import {OperatorCallback, OperatorSet} from '../index';

const loadRegisterToMemory = (source: RegisterKey, highReg: RegisterKey, lowReg: RegisterKey, hardware: HardwareBusInterface) => {
	const memory = hardware.memory;
	const registers = hardware.cpu.registers;

	const high = registers[highReg];
	const low = registers[lowReg];

	memory.writeByte((high << 8) + low, registers[source]);

	registers.m = 2;
};

const loadRegisterToHLMemory = (source: RegisterKey, hardware: HardwareBusInterface) => {
	loadRegisterToMemory(source, 'h', 'l', hardware);
};

export interface RegisterToMemoryOperatorSet extends OperatorSet {
	LoadAIntoHLAddress: OperatorCallback;
	LoadBIntoHLAddress: OperatorCallback;
	LoadCIntoHLAddress: OperatorCallback;
	LoadDIntoHLAddress: OperatorCallback;
	LoadEIntoHLAddress: OperatorCallback;
	LoadHIntoHLAddress: OperatorCallback;
	LoadLIntoHLAddress: OperatorCallback;

	LoadAIntoBCAddress: OperatorCallback;
	LoadAIntoDEAddress: OperatorCallback;

	LoadAIntoPCAddress: OperatorCallback;

	LoadAIntoHLAddressAndIncrement: OperatorCallback;
	LoadAIntoHLAddressAndDecrement: OperatorCallback;

	LoadAIntoPCWithMagicAddress: OperatorCallback;
	LoadAIntoCWithMagicAddress: OperatorCallback;
}

export const RegisterToMemoryOperators: RegisterToMemoryOperatorSet = {
	LoadAIntoHLAddress: hardware => loadRegisterToHLMemory('a', hardware),
	LoadBIntoHLAddress: hardware => loadRegisterToHLMemory('b', hardware),
	LoadCIntoHLAddress: hardware => loadRegisterToHLMemory('c', hardware),
	LoadDIntoHLAddress: hardware => loadRegisterToHLMemory('d', hardware),
	LoadEIntoHLAddress: hardware => loadRegisterToHLMemory('e', hardware),
	LoadHIntoHLAddress: hardware => loadRegisterToHLMemory('h', hardware),
	LoadLIntoHLAddress: hardware => loadRegisterToHLMemory('l', hardware),

	LoadAIntoBCAddress: hardware => loadRegisterToMemory('a', 'b', 'c', hardware),
	LoadAIntoDEAddress: hardware => loadRegisterToMemory('a', 'd', 'e', hardware),

	LoadAIntoPCAddress: hardware => {
		const memory = hardware.memory;
		const registers = hardware.cpu.registers;

		memory.writeByte(memory.readWord(registers.programCount), registers.a);
		registers.programCount += 2;

		registers.m = 4;
	},

	LoadAIntoHLAddressAndIncrement: hardware => {
		const memory = hardware.memory;
		const registers = hardware.cpu.registers;

		memory.writeByte((registers.h << 8) + registers.l, registers.a);

		registers.l = (registers.l + 1) & 255;

		if (!registers.l)
			registers.h = (registers.h + 1) & 255;

		registers.m = 2;
	},

	LoadAIntoHLAddressAndDecrement: hardware => {
		const memory = hardware.memory;
		const registers = hardware.cpu.registers;

		memory.writeByte((registers.h << 8) + registers.l, registers.a);

		registers.l = (registers.l - 1) & 255;

		if (registers.l === 255)
			registers.h = (registers.h - 1) & 255;

		registers.m = 2;
	},

	LoadAIntoPCWithMagicAddress: hardware => {
		const memory = hardware.memory;
		const registers = hardware.cpu.registers;

		memory.writeByte(0xFF00 + memory.readByte(registers.programCount++), registers.a);

		registers.m = 3;
	},

	LoadAIntoCWithMagicAddress: hardware => {
		const memory = hardware.memory;
		const registers = hardware.cpu.registers;

		memory.writeByte(0xFF00 + registers.c, registers.a);

		registers.m = 2;
	},
};