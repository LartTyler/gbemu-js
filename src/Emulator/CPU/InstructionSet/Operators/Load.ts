import {HardwareBusInterface} from '../../../Hardware';
import {RegisterKey} from '../../Registers';
import {Operator, OperatorInterface} from '../InstructionManager';

const loadRegisterIntoRegister = (source: RegisterKey, destination: RegisterKey, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	registers[destination] = registers[source];

	registers.m = 1;
};

const loadAddressIntoRegister = (address: number, destination: RegisterKey, hardware: HardwareBusInterface): void => {
	const {memory, registers} = hardware;

	registers[destination] = memory.readByte(address);

	registers.m = 2;
};

const loadPairAddressIntoRegister = (high: RegisterKey, low: RegisterKey, destination: RegisterKey, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	loadAddressIntoRegister((registers[high] << 8) + registers[low], destination, hardware);
};

const loadRegisterIntoAddress = (address: number, source: RegisterKey, hardware: HardwareBusInterface): void => {
	const {memory, registers} = hardware;

	memory.writeByte(address, registers[source]);

	registers.m = 2;
};

const loadRegisterIntoPairAddress = (source: RegisterKey, high: RegisterKey, low: RegisterKey, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	loadRegisterIntoAddress((registers[high] << 8) + registers[low], source, hardware);
};

const loadAddressWordIntoPair = (address: number, high: RegisterKey, low: RegisterKey, hardware: HardwareBusInterface): void => {
	const {memory, registers} = hardware;

	registers[low] = memory.readByte(address);
	registers[high] = memory.readByte(address + 1);

	registers.m = 3;
};

const loadPCAddressWordIntoPair = (high: RegisterKey, low: RegisterKey, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	loadAddressWordIntoPair(registers.programCount, high, low, hardware);

	registers.programCount += 2;
};

export const LoadOperators: OperatorInterface[] = [
	// region Load into registers
	new Operator('LoadRegisterBIntoA', 0x78, hardware => loadRegisterIntoRegister('b', 'a', hardware)),
	new Operator('LoadRegisterCIntoA', 0x79, hardware => loadRegisterIntoRegister('c', 'a', hardware)),
	new Operator('LoadRegisterDIntoA', 0x7A, hardware => loadRegisterIntoRegister('d', 'a', hardware)),
	new Operator('LoadRegisterEIntoA', 0x7B, hardware => loadRegisterIntoRegister('e', 'a', hardware)),
	new Operator('LoadRegisterHIntoA', 0x7C, hardware => loadRegisterIntoRegister('h', 'a', hardware)),
	new Operator('LoadRegisterLIntoA', 0x7D, hardware => loadRegisterIntoRegister('l', 'a', hardware)),
	new Operator('LoadRegisterAIntoA', 0x7F, hardware => loadRegisterIntoRegister('a', 'a', hardware)),
	new Operator('LoadPCAddressIntoA', 0x3E, hardware => loadAddressIntoRegister(hardware.registers.programCount++, 'a', hardware)),
	new Operator('LoadHLAddressIntoA', 0x7E, hardware => {
		const registers = hardware.registers;

		loadAddressIntoRegister((registers.h << 8) + registers.l, 'a', hardware);
	}),

	new Operator('LoadRegisterBIntoB', 0x40, hardware => loadRegisterIntoRegister('b', 'b', hardware)),
	new Operator('LoadRegisterCIntoB', 0x41, hardware => loadRegisterIntoRegister('c', 'b', hardware)),
	new Operator('LoadRegisterDIntoB', 0x42, hardware => loadRegisterIntoRegister('d', 'b', hardware)),
	new Operator('LoadRegisterEIntoB', 0x43, hardware => loadRegisterIntoRegister('e', 'b', hardware)),
	new Operator('LoadRegisterHIntoB', 0x44, hardware => loadRegisterIntoRegister('h', 'b', hardware)),
	new Operator('LoadRegisterLIntoB', 0x45, hardware => loadRegisterIntoRegister('l', 'b', hardware)),
	new Operator('LoadRegisterAIntoB', 0x47, hardware => loadRegisterIntoRegister('a', 'b', hardware)),
	new Operator('LoadPCAddressIntoB', 0x06, hardware => loadAddressIntoRegister(hardware.registers.programCount++, 'b', hardware)),
	new Operator('LoadHLAddressIntoB', 0x46, hardware => {
		const registers = hardware.registers;

		loadAddressIntoRegister((registers.h << 8) + registers.l, 'b', hardware);
	}),

	new Operator('LoadRegisterBIntoC', 0x48, hardware => loadRegisterIntoRegister('b', 'c', hardware)),
	new Operator('LoadRegisterCIntoC', 0x49, hardware => loadRegisterIntoRegister('c', 'c', hardware)),
	new Operator('LoadRegisterDIntoC', 0x4A, hardware => loadRegisterIntoRegister('d', 'c', hardware)),
	new Operator('LoadRegisterEIntoC', 0x4B, hardware => loadRegisterIntoRegister('e', 'c', hardware)),
	new Operator('LoadRegisterHIntoC', 0x4C, hardware => loadRegisterIntoRegister('h', 'c', hardware)),
	new Operator('LoadRegisterLIntoC', 0x4D, hardware => loadRegisterIntoRegister('l', 'c', hardware)),
	new Operator('LoadRegisterAIntoC', 0x4F, hardware => loadRegisterIntoRegister('a', 'c', hardware)),
	new Operator('LoadPCAddressIntoC', 0x0E, hardware => loadAddressIntoRegister(hardware.registers.programCount++, 'c', hardware)),
	new Operator('LoadHLAddressIntoC', 0x4E, hardware => {
		const registers = hardware.registers;

		loadAddressIntoRegister((registers.h << 8) + registers.l, 'c', hardware);
	}),

	new Operator('LoadRegisterBIntoD', 0x50, hardware => loadRegisterIntoRegister('b', 'd', hardware)),
	new Operator('LoadRegisterCIntoD', 0x51, hardware => loadRegisterIntoRegister('c', 'd', hardware)),
	new Operator('LoadRegisterDIntoD', 0x52, hardware => loadRegisterIntoRegister('d', 'd', hardware)),
	new Operator('LoadRegisterEIntoD', 0x53, hardware => loadRegisterIntoRegister('e', 'd', hardware)),
	new Operator('LoadRegisterHIntoD', 0x54, hardware => loadRegisterIntoRegister('h', 'd', hardware)),
	new Operator('LoadRegisterLIntoD', 0x55, hardware => loadRegisterIntoRegister('l', 'd', hardware)),
	new Operator('LoadRegisterAIntoD', 0x57, hardware => loadRegisterIntoRegister('a', 'd', hardware)),
	new Operator('LoadPCAddressIntoD', 0x16, hardware => loadAddressIntoRegister(hardware.registers.programCount++, 'd', hardware)),
	new Operator('LoadHLAddressIntoD', 0x56, hardware => {
		const registers = hardware.registers;

		loadAddressIntoRegister((registers.h << 8) + registers.l, 'd', hardware);
	}),

	new Operator('LoadRegisterBIntoE', 0x58, hardware => loadRegisterIntoRegister('b', 'e', hardware)),
	new Operator('LoadRegisterCIntoE', 0x59, hardware => loadRegisterIntoRegister('c', 'e', hardware)),
	new Operator('LoadRegisterDIntoE', 0x5A, hardware => loadRegisterIntoRegister('d', 'e', hardware)),
	new Operator('LoadRegisterEIntoE', 0x5B, hardware => loadRegisterIntoRegister('e', 'e', hardware)),
	new Operator('LoadRegisterHIntoE', 0x5C, hardware => loadRegisterIntoRegister('h', 'e', hardware)),
	new Operator('LoadRegisterLIntoE', 0x5D, hardware => loadRegisterIntoRegister('l', 'e', hardware)),
	new Operator('LoadRegisterAIntoE', 0x5F, hardware => loadRegisterIntoRegister('a', 'e', hardware)),
	new Operator('LoadPCAddressIntoE', 0x1E, hardware => loadAddressIntoRegister(hardware.registers.programCount++, 'e', hardware)),
	new Operator('LoadHLAddressIntoE', 0x5E, hardware => {
		const registers = hardware.registers;

		loadAddressIntoRegister((registers.h << 8) + registers.l, 'e', hardware);
	}),

	new Operator('LoadRegisterBIntoH', 0x60, hardware => loadRegisterIntoRegister('b', 'h', hardware)),
	new Operator('LoadRegisterCIntoH', 0x61, hardware => loadRegisterIntoRegister('c', 'h', hardware)),
	new Operator('LoadRegisterDIntoH', 0x62, hardware => loadRegisterIntoRegister('d', 'h', hardware)),
	new Operator('LoadRegisterEIntoH', 0x63, hardware => loadRegisterIntoRegister('e', 'h', hardware)),
	new Operator('LoadRegisterHIntoH', 0x64, hardware => loadRegisterIntoRegister('h', 'h', hardware)),
	new Operator('LoadRegisterLIntoH', 0x65, hardware => loadRegisterIntoRegister('l', 'h', hardware)),
	new Operator('LoadRegisterAIntoH', 0x67, hardware => loadRegisterIntoRegister('a', 'h', hardware)),
	new Operator('LoadPCAddressIntoH', 0x26, hardware => loadAddressIntoRegister(hardware.registers.programCount++, 'h', hardware)),
	new Operator('LoadHLAddressIntoH', 0x66, hardware => {
		const registers = hardware.registers;

		loadAddressIntoRegister((registers.h << 8) + registers.l, 'h', hardware);
	}),

	new Operator('LoadRegisterBIntoL', 0x68, hardware => loadRegisterIntoRegister('b', 'l', hardware)),
	new Operator('LoadRegisterCIntoL', 0x69, hardware => loadRegisterIntoRegister('c', 'l', hardware)),
	new Operator('LoadRegisterDIntoL', 0x6A, hardware => loadRegisterIntoRegister('d', 'l', hardware)),
	new Operator('LoadRegisterEIntoL', 0x6B, hardware => loadRegisterIntoRegister('e', 'l', hardware)),
	new Operator('LoadRegisterHIntoL', 0x6C, hardware => loadRegisterIntoRegister('h', 'l', hardware)),
	new Operator('LoadRegisterLIntoL', 0x6D, hardware => loadRegisterIntoRegister('l', 'l', hardware)),
	new Operator('LoadRegisterAIntoL', 0x6F, hardware => loadRegisterIntoRegister('a', 'l', hardware)),
	new Operator('LoadPCAddressIntoL', 0x2E, hardware => loadAddressIntoRegister(hardware.registers.programCount++, 'l', hardware)),
	new Operator('LoadHLAddressIntoL', 0x6E, hardware => {
		const registers = hardware.registers;

		loadAddressIntoRegister((registers.h << 8) + registers.l, 'l', hardware);
	}),

	new Operator('LoadBCAddressIntoA', 0x0A, hardware => loadPairAddressIntoRegister('b', 'c', 'a', hardware)),
	new Operator('LoadDEAddressIntoA', 0x1A, hardware => loadPairAddressIntoRegister('d', 'e', 'a', hardware)),

	new Operator('LoadPCAddressWordIntoBCPair', 0x01, hardware => loadPCAddressWordIntoPair('b', 'c', hardware)),
	new Operator('LoadPCAddressWordIntoDEPair', 0x11, hardware => loadPCAddressWordIntoPair('d', 'e', hardware)),
	new Operator('LoadPCAddressWordIntoHLPair', 0x21, hardware => loadPCAddressWordIntoPair('h', 'l', hardware)),
	// endregion

	// region Load registers into memory
	new Operator('LoadAIntoHLAddress', 0x77, hardware => loadRegisterIntoPairAddress('a', 'h', 'l', hardware)),
	new Operator('LoadBIntoHLAddress', 0x70, hardware => loadRegisterIntoPairAddress('b', 'h', 'l', hardware)),
	new Operator('LoadCIntoHLAddress', 0x71, hardware => loadRegisterIntoPairAddress('c', 'h', 'l', hardware)),
	new Operator('LoadDIntoHLAddress', 0x72, hardware => loadRegisterIntoPairAddress('d', 'h', 'l', hardware)),
	new Operator('LoadEIntoHLAddress', 0x73, hardware => loadRegisterIntoPairAddress('e', 'h', 'l', hardware)),
	new Operator('LoadHIntoHLAddress', 0x74, hardware => loadRegisterIntoPairAddress('h', 'h', 'l', hardware)),
	new Operator('LoadLIntoHLAddress', 0x75, hardware => loadRegisterIntoPairAddress('l', 'h', 'l', hardware)),

	new Operator('LoadAIntoBCAddress', 0x02, hardware => loadRegisterIntoPairAddress('a', 'b', 'c', hardware)),
	new Operator('LoadAIntoDEAddress', 0x12, hardware => loadRegisterIntoPairAddress('a', 'd', 'e', hardware)),
	// endregion

	// region Load and increment
	new Operator('LoadAIntoHLAddressAndIncrement', 0x22, hardware => {
		const registers = hardware.registers;

		hardware.memory.writeByte((registers.h << 8) + registers.l, registers.a);

		registers.l = (registers.l + 1) & 255;

		if (!registers.l)
			registers.h = (registers.h + 1) & 255;

		registers.m = 2;
	}),
	new Operator('LoadHLAddressIntoAAndIncrement', 0x2A, hardware => {
		const registers = hardware.registers;

		registers.a = hardware.memory.readByte((registers.h << 8) + registers.l);

		registers.l = (registers.l + 1) & 255;

		if (!registers.l)
			registers.h = (registers.h + 1) & 255;

		registers.m = 2;
	}),
	// endregion

	// region Load and decrement
	new Operator('LoadAIntoHLAddressAndDecrement', 0x32, hardware => {
		const registers = hardware.registers;

		hardware.memory.writeByte((registers.h << 8) + registers.l, registers.a);

		registers.l = (registers.l - 1) & 255;

		if (registers.l === 255)
			registers.h = (registers.h - 1) & 255;

		registers.m = 2;
	}),
	new Operator('LoadHLAddressIntoAAndDecrement', 0x3A, hardware => {
		const registers = hardware.registers;

		registers.a = hardware.memory.readByte((registers.h << 8) + registers.l);

		registers.l = (registers.l - 1) & 255;

		if (registers.l === 255)
			registers.h = (registers.h - 1) & 255;

		registers.m = 2;
	}),
	// endregion

	// region Load using uint8
	new Operator('LoadPCAddress8IntoA', 0xF0, hardware => {
		const {memory, registers} = hardware;

		registers.a = memory.readByte(0xFF00 + memory.readByte(registers.programCount++));

		registers.m = 3;
	}),
	new Operator('LoadAIntoPCAddress8', 0xE0, hardware => {
		const {memory, registers} = hardware;

		memory.writeByte(0xFF00 + memory.readByte(registers.programCount++), registers.a);

		registers.m = 3;
	}),
	new Operator('LoadCAddress8IntoA', 0xF2, hardware => {
		const registers = hardware.registers;

		registers.a = hardware.memory.readByte(0xFF00 + registers.c);

		registers.m = 2;
	}),
	new Operator('LoadAIntoCAddress8', 0xE2, hardware => {
		const registers = hardware.registers;

		hardware.memory.writeByte(0xFF00 + registers.c, registers.a);

		registers.m = 2;
	}),
	new Operator('WeirdLoadThingWithSPAndHL', 0xF8, hardware => {
		const registers = hardware.registers;

		let value = hardware.memory.readByte(registers.programCount++);

		if (value > 127)
			value = -((~value + 1) & 255);

		value += registers.stackPointer;

		registers.h = (value >> 8) & 255;
		registers.l = value & 255;

		registers.m = 3;
	}),
	// endregion

	new Operator('LoadPCAddressIntoHLAddress', 0x36, hardware => {
		const {memory, registers} = hardware;

		memory.writeByte((registers.h << 8) + registers.l, memory.readByte(registers.programCount++));

		registers.m = 3;
	}),

	new Operator('LoadAIntoPCAddress16', 0xEA, hardware => {
		const {memory, registers} = hardware;

		memory.writeByte(memory.readWord(registers.programCount), registers.a);

		registers.programCount += 2;
		registers.m = 4;
	}),
	new Operator('LoadPCAddress16IntoA', 0xFA, hardware => {
		const {memory, registers} = hardware;

		registers.a = memory.readByte(memory.readWord(registers.programCount));

		registers.programCount += 2;
		registers.m = 4;
	}),

	new Operator('LoadPCAddressWordIntoSP', 0x31, hardware => {
		const registers = hardware.registers;

		registers.stackPointer = hardware.memory.readWord(registers.programCount);

		registers.programCount += 2;
		registers.m = 3;
	}),
];