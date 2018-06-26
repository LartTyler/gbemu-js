import {HardwareBusInterface} from '../../../Hardware';
import {RegisterKey} from '../../Registers';
import {OperatorCallback, OperatorSet} from '../index';

const loadMemoryToRegister = (destination: RegisterKey, highReg: RegisterKey, lowReg: RegisterKey, hardware: HardwareBusInterface) => {
	const memory = hardware.memory;
	const registers = hardware.cpu.registers;

	const high = registers[highReg];
	const low = registers[lowReg];

	registers[destination] = memory.readByte((high << 8) + low);

	registers.m = 2;
};

const loadHLMemoryToRegister = (destination: RegisterKey, hardware: HardwareBusInterface) => {
	loadMemoryToRegister(destination, 'h', 'l', hardware);
};

const loadPCAndNextIntoRegister = (destinationA: RegisterKey, destinationB: RegisterKey, hardware: HardwareBusInterface) => {
	const memory = hardware.memory;
	const registers = hardware.cpu.registers;

	registers[destinationA] = memory.readByte(registers.programCount++);
	registers[destinationB] = memory.readByte(registers.programCount++);

	registers.m = 3;
};

export interface MemoryToRegisterOperatorSet extends OperatorSet {
	LoadHLAddressIntoA: OperatorCallback;
	LoadHLAddressIntoB: OperatorCallback;
	LoadHLAddressIntoC: OperatorCallback;
	LoadHLAddressIntoD: OperatorCallback;
	LoadHLAddressIntoE: OperatorCallback;
	LoadHLAddressIntoH: OperatorCallback;
	LoadHLAddressIntoL: OperatorCallback;

	LoadBCAddressIntoA: OperatorCallback;
	LoadDEAddressIntoA: OperatorCallback;

	LoadPCAndNextIntoBC: OperatorCallback;
	LoadPCAndNextIntoDE: OperatorCallback;
	LoadPCAndNextIntoHL: OperatorCallback;
	LoadPCAndNextIntoSP: OperatorCallback;

	LoadPCWordIntoLH: OperatorCallback;

	LoadHLAddressIntoAAndIncrement: OperatorCallback;
	LoadHLAddressIntoAAndDecrement: OperatorCallback;

	LoadPCWithMagicIntoA: OperatorCallback;
	LoadCWithMagicAddressIntoA: OperatorCallback;
}

export const MemoryToRegisterOperators: MemoryToRegisterOperatorSet = {
	LoadHLAddressIntoA: hardware => loadHLMemoryToRegister('a', hardware),
	LoadHLAddressIntoB: hardware => loadHLMemoryToRegister('b', hardware),
	LoadHLAddressIntoC: hardware => loadHLMemoryToRegister('c', hardware),
	LoadHLAddressIntoD: hardware => loadHLMemoryToRegister('d', hardware),
	LoadHLAddressIntoE: hardware => loadHLMemoryToRegister('e', hardware),
	LoadHLAddressIntoH: hardware => loadHLMemoryToRegister('h', hardware),
	LoadHLAddressIntoL: hardware => loadHLMemoryToRegister('l', hardware),

	LoadBCAddressIntoA: hardware => loadMemoryToRegister('a', 'b', 'c', hardware),
	LoadDEAddressIntoA: hardware => loadMemoryToRegister('a', 'd', 'e', hardware),

	LoadPCAndNextIntoBC: hardware => loadPCAndNextIntoRegister('b', 'c', hardware),
	LoadPCAndNextIntoDE: hardware => loadPCAndNextIntoRegister('d', 'e', hardware),
	LoadPCAndNextIntoHL: hardware => loadPCAndNextIntoRegister('h', 'l', hardware),
	LoadPCAndNextIntoSP: hardware => {
		const registers = hardware.cpu.registers;

		registers.stackPointer = hardware.memory.readWord(registers.programCount);
		registers.programCount += 2;

		registers.m = 3;
	},

	LoadPCWordIntoLH: hardware => {
		const memory = hardware.memory;
		const registers = hardware.cpu.registers;

		const index = memory.readWord(registers.programCount);

		registers.programCount += 2;

		// TODO Should this be reversed?
		registers.l = memory.readByte(index);
		registers.h = memory.readByte(index + 1);

		registers.m = 5;
	},

	LoadHLAddressIntoAAndIncrement: hardware => {
		const memory = hardware.memory;
		const registers = hardware.cpu.registers;

		registers.a = memory.readByte((registers.h << 8) + registers.l);

		registers.l = (registers.l + 1) & 255;

		if (!registers.l)
			registers.h = (registers.h + 1) & 255;

		registers.m = 2;
	},

	LoadHLAddressIntoAAndDecrement: hardware => {
		const memory = hardware.memory;
		const registers = hardware.cpu.registers;

		registers.a = memory.readByte((registers.h << 8) + registers.l);

		registers.l = (registers.l - 1) & 255;

		if (registers.l === 255)
			registers.h = (registers.h - 1) & 255;

		registers.m = 2;
	},

	LoadPCWithMagicIntoA: hardware => {
		const memory = hardware.memory;
		const registers = hardware.cpu.registers;

		registers.a = memory.readByte(0xFF00 + memory.readByte(registers.programCount++));

		registers.m = 3;
	},

	LoadCWithMagicAddressIntoA: hardware => {
		const memory = hardware.memory;
		const registers = hardware.cpu.registers;

		registers.a = memory.readByte(0xFF00 + registers.c);

		registers.m = 2;
	},
};