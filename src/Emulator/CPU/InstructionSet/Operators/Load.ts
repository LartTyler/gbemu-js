import {HardwareBusInterface} from '../../../Hardware';
import {RegisterKey} from '../../Registers';
import {Operator, OperatorInterface} from '../InstructionManager';

const loadRegisterIntoRegister = (
	source: RegisterKey,
	destination: RegisterKey,
	hardware: HardwareBusInterface,
): void => {
	const registers = hardware.registers;

	registers[destination] = registers[source];

	registers.m = 1;
};

const loadAddressIntoRegister = (address: number, destination: RegisterKey, hardware: HardwareBusInterface): void => {
	const {memory, registers} = hardware;

	registers[destination] = memory.readByte(address);

	registers.m = 2;
};

const loadPairAddressIntoRegister = (
	high: RegisterKey,
	low: RegisterKey,
	destination: RegisterKey,
	hardware: HardwareBusInterface,
): void => {
	const registers = hardware.registers;

	loadAddressIntoRegister((registers[high] << 8) + registers[low], destination, hardware);
};

const loadRegisterIntoAddress = (address: number, source: RegisterKey, hardware: HardwareBusInterface): void => {
	const {memory, registers} = hardware;

	memory.writeByte(address, registers[source]);

	registers.m = 2;
};

const loadRegisterIntoPairAddress = (
	source: RegisterKey,
	high: RegisterKey,
	low: RegisterKey,
	hardware: HardwareBusInterface,
): void => {
	const registers = hardware.registers;

	loadRegisterIntoAddress((registers[high] << 8) + registers[low], source, hardware);
};

const loadAddressWordIntoPair = (
	address: number,
	high: RegisterKey,
	low: RegisterKey,
	hardware: HardwareBusInterface,
): void => {
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
	new Operator('LoadRegisterBIntoA', 0x78, hardware => loadRegisterIntoRegister('b', 'a', hardware), 'LD a, b'),
	new Operator('LoadRegisterCIntoA', 0x79, hardware => loadRegisterIntoRegister('c', 'a', hardware), 'LD a, c'),
	new Operator('LoadRegisterDIntoA', 0x7A, hardware => loadRegisterIntoRegister('d', 'a', hardware), 'LD a, d'),
	new Operator('LoadRegisterEIntoA', 0x7B, hardware => loadRegisterIntoRegister('e', 'a', hardware), 'LD a, e'),
	new Operator('LoadRegisterHIntoA', 0x7C, hardware => loadRegisterIntoRegister('h', 'a', hardware), 'LD a, h'),
	new Operator('LoadRegisterLIntoA', 0x7D, hardware => loadRegisterIntoRegister('l', 'a', hardware), 'LD a, l'),
	new Operator('LoadRegisterAIntoA', 0x7F, hardware => loadRegisterIntoRegister('a', 'a', hardware), 'LD a, a'),
	new Operator(
		'LoadPCAddressIntoA',
		0x3E,
		hardware => loadAddressIntoRegister(hardware.registers.programCount++, 'a', hardware),
		'LD a, (pc)',
		2,
	),
	new Operator('LoadHLAddressIntoA', 0x7E, hardware => {
		const registers = hardware.registers;

		loadAddressIntoRegister((registers.h << 8) + registers.l, 'a', hardware);
	}, 'LD a, (hl)'),

	new Operator('LoadRegisterBIntoB', 0x40, hardware => loadRegisterIntoRegister('b', 'b', hardware), 'LD b, b'),
	new Operator('LoadRegisterCIntoB', 0x41, hardware => loadRegisterIntoRegister('c', 'b', hardware), 'LD b, c'),
	new Operator('LoadRegisterDIntoB', 0x42, hardware => loadRegisterIntoRegister('d', 'b', hardware), 'LD b, d'),
	new Operator('LoadRegisterEIntoB', 0x43, hardware => loadRegisterIntoRegister('e', 'b', hardware), 'LD b, e'),
	new Operator('LoadRegisterHIntoB', 0x44, hardware => loadRegisterIntoRegister('h', 'b', hardware), 'LD b, h'),
	new Operator('LoadRegisterLIntoB', 0x45, hardware => loadRegisterIntoRegister('l', 'b', hardware), 'LD b, l'),
	new Operator('LoadRegisterAIntoB', 0x47, hardware => loadRegisterIntoRegister('a', 'b', hardware), 'LD b, a'),
	new Operator(
		'LoadPCAddressIntoB',
		0x06,
		hardware => loadAddressIntoRegister(hardware.registers.programCount++, 'b', hardware),
		'LD b, (pc)',
		2,
	),
	new Operator('LoadHLAddressIntoB', 0x46, hardware => {
		const registers = hardware.registers;

		loadAddressIntoRegister((registers.h << 8) + registers.l, 'b', hardware);
	}, 'LD b, (hl)'),

	new Operator('LoadRegisterBIntoC', 0x48, hardware => loadRegisterIntoRegister('b', 'c', hardware), 'LD c, b'),
	new Operator('LoadRegisterCIntoC', 0x49, hardware => loadRegisterIntoRegister('c', 'c', hardware), 'LD c, c'),
	new Operator('LoadRegisterDIntoC', 0x4A, hardware => loadRegisterIntoRegister('d', 'c', hardware), 'LD c, d'),
	new Operator('LoadRegisterEIntoC', 0x4B, hardware => loadRegisterIntoRegister('e', 'c', hardware), 'LD c, e'),
	new Operator('LoadRegisterHIntoC', 0x4C, hardware => loadRegisterIntoRegister('h', 'c', hardware), 'LD c, h'),
	new Operator('LoadRegisterLIntoC', 0x4D, hardware => loadRegisterIntoRegister('l', 'c', hardware), 'LD c, l'),
	new Operator('LoadRegisterAIntoC', 0x4F, hardware => loadRegisterIntoRegister('a', 'c', hardware), 'LD c, a'),
	new Operator(
		'LoadPCAddressIntoC',
		0x0E,
		hardware => loadAddressIntoRegister(hardware.registers.programCount++, 'c', hardware),
		'LD c, (pc)',
		2,
	),
	new Operator('LoadHLAddressIntoC', 0x4E, hardware => {
		const registers = hardware.registers;

		loadAddressIntoRegister((registers.h << 8) + registers.l, 'c', hardware);
	}, 'LD c, (hl)'),

	new Operator('LoadRegisterBIntoD', 0x50, hardware => loadRegisterIntoRegister('b', 'd', hardware), 'LD d, b'),
	new Operator('LoadRegisterCIntoD', 0x51, hardware => loadRegisterIntoRegister('c', 'd', hardware), 'LD d, c'),
	new Operator('LoadRegisterDIntoD', 0x52, hardware => loadRegisterIntoRegister('d', 'd', hardware), 'LD d, d'),
	new Operator('LoadRegisterEIntoD', 0x53, hardware => loadRegisterIntoRegister('e', 'd', hardware), 'LD d, e'),
	new Operator('LoadRegisterHIntoD', 0x54, hardware => loadRegisterIntoRegister('h', 'd', hardware), 'LD d, h'),
	new Operator('LoadRegisterLIntoD', 0x55, hardware => loadRegisterIntoRegister('l', 'd', hardware), 'LD d, l'),
	new Operator('LoadRegisterAIntoD', 0x57, hardware => loadRegisterIntoRegister('a', 'd', hardware), 'LD d, a'),
	new Operator(
		'LoadPCAddressIntoD',
		0x16,
		hardware => loadAddressIntoRegister(hardware.registers.programCount++, 'd', hardware),
		'LD d, (pc)',
		2,
	),
	new Operator('LoadHLAddressIntoD', 0x56, hardware => {
		const registers = hardware.registers;

		loadAddressIntoRegister((registers.h << 8) + registers.l, 'd', hardware);
	}, 'LD d, (hl)'),

	new Operator('LoadRegisterBIntoE', 0x58, hardware => loadRegisterIntoRegister('b', 'e', hardware), 'LD e, b'),
	new Operator('LoadRegisterCIntoE', 0x59, hardware => loadRegisterIntoRegister('c', 'e', hardware), 'LD e, c'),
	new Operator('LoadRegisterDIntoE', 0x5A, hardware => loadRegisterIntoRegister('d', 'e', hardware), 'LD e, d'),
	new Operator('LoadRegisterEIntoE', 0x5B, hardware => loadRegisterIntoRegister('e', 'e', hardware), 'LD e, e'),
	new Operator('LoadRegisterHIntoE', 0x5C, hardware => loadRegisterIntoRegister('h', 'e', hardware), 'LD e, h'),
	new Operator('LoadRegisterLIntoE', 0x5D, hardware => loadRegisterIntoRegister('l', 'e', hardware), 'LD e, l'),
	new Operator('LoadRegisterAIntoE', 0x5F, hardware => loadRegisterIntoRegister('a', 'e', hardware), 'LD e, a'),
	new Operator(
		'LoadPCAddressIntoE',
		0x1E,
		hardware => loadAddressIntoRegister(hardware.registers.programCount++, 'e', hardware),
		'LD e, (pc)',
		2,
	),
	new Operator('LoadHLAddressIntoE', 0x5E, hardware => {
		const registers = hardware.registers;

		loadAddressIntoRegister((registers.h << 8) + registers.l, 'e', hardware);
	}, 'LD e, (hl)'),

	new Operator('LoadRegisterBIntoH', 0x60, hardware => loadRegisterIntoRegister('b', 'h', hardware), 'LD h, b'),
	new Operator('LoadRegisterCIntoH', 0x61, hardware => loadRegisterIntoRegister('c', 'h', hardware), 'LD h, c'),
	new Operator('LoadRegisterDIntoH', 0x62, hardware => loadRegisterIntoRegister('d', 'h', hardware), 'LD h, d'),
	new Operator('LoadRegisterEIntoH', 0x63, hardware => loadRegisterIntoRegister('e', 'h', hardware), 'LD h, e'),
	new Operator('LoadRegisterHIntoH', 0x64, hardware => loadRegisterIntoRegister('h', 'h', hardware), 'LD h, h'),
	new Operator('LoadRegisterLIntoH', 0x65, hardware => loadRegisterIntoRegister('l', 'h', hardware), 'LD h, l'),
	new Operator('LoadRegisterAIntoH', 0x67, hardware => loadRegisterIntoRegister('a', 'h', hardware), 'LD h, a'),
	new Operator(
		'LoadPCAddressIntoH',
		0x26,
		hardware => loadAddressIntoRegister(hardware.registers.programCount++, 'h', hardware),
		'LD h, (pc)',
		2,
	),
	new Operator('LoadHLAddressIntoH', 0x66, hardware => {
		const registers = hardware.registers;

		loadAddressIntoRegister((registers.h << 8) + registers.l, 'h', hardware);
	}, 'LD h, (hl)'),

	new Operator('LoadRegisterBIntoL', 0x68, hardware => loadRegisterIntoRegister('b', 'l', hardware), 'LD l, b'),
	new Operator('LoadRegisterCIntoL', 0x69, hardware => loadRegisterIntoRegister('c', 'l', hardware), 'LD l, c'),
	new Operator('LoadRegisterDIntoL', 0x6A, hardware => loadRegisterIntoRegister('d', 'l', hardware), 'LD l, d'),
	new Operator('LoadRegisterEIntoL', 0x6B, hardware => loadRegisterIntoRegister('e', 'l', hardware), 'LD l, e'),
	new Operator('LoadRegisterHIntoL', 0x6C, hardware => loadRegisterIntoRegister('h', 'l', hardware), 'LD l, h'),
	new Operator('LoadRegisterLIntoL', 0x6D, hardware => loadRegisterIntoRegister('l', 'l', hardware), 'LD l, l'),
	new Operator('LoadRegisterAIntoL', 0x6F, hardware => loadRegisterIntoRegister('a', 'l', hardware), 'LD l, a'),
	new Operator(
		'LoadPCAddressIntoL',
		0x2E,
		hardware => loadAddressIntoRegister(hardware.registers.programCount++, 'l', hardware),
		'LD l, (pc)',
		2,
	),
	new Operator('LoadHLAddressIntoL', 0x6E, hardware => {
		const registers = hardware.registers;

		loadAddressIntoRegister((registers.h << 8) + registers.l, 'l', hardware);
	}, 'LD l, (hl)'),

	new Operator(
		'LoadBCAddressIntoA',
		0x0A,
		hardware => loadPairAddressIntoRegister('b', 'c', 'a', hardware),
		'LD a, (bc)',
	),
	new Operator(
		'LoadDEAddressIntoA',
		0x1A,
		hardware => loadPairAddressIntoRegister('d', 'e', 'a', hardware),
		'LD a, (de)',
	),

	new Operator(
		'LoadPCAddressWordIntoBCPair',
		0x01,
		hardware => loadPCAddressWordIntoPair('b', 'c', hardware),
		'LD bc, (pc)',
		3,
	),
	new Operator(
		'LoadPCAddressWordIntoDEPair',
		0x11,
		hardware => loadPCAddressWordIntoPair('d', 'e', hardware),
		'LD de, (pc)',
		3,
	),
	new Operator(
		'LoadPCAddressWordIntoHLPair',
		0x21,
		hardware => loadPCAddressWordIntoPair('h', 'l', hardware),
		'LD hl, (pc)',
		3,
	),
	// endregion

	// region Load registers into memory
	new Operator(
		'LoadAIntoHLAddress',
		0x77,
		hardware => loadRegisterIntoPairAddress('a', 'h', 'l', hardware),
		'LD (hl), a',
	),
	new Operator(
		'LoadBIntoHLAddress',
		0x70,
		hardware => loadRegisterIntoPairAddress('b', 'h', 'l', hardware),
		'LD (hl), b',
	),
	new Operator(
		'LoadCIntoHLAddress',
		0x71,
		hardware => loadRegisterIntoPairAddress('c', 'h', 'l', hardware),
		'LD (hl), c',
	),
	new Operator(
		'LoadDIntoHLAddress',
		0x72,
		hardware => loadRegisterIntoPairAddress('d', 'h', 'l', hardware),
		'LD (hl), d',
	),
	new Operator(
		'LoadEIntoHLAddress',
		0x73,
		hardware => loadRegisterIntoPairAddress('e', 'h', 'l', hardware),
		'LD (hl), e',
	),
	new Operator(
		'LoadHIntoHLAddress',
		0x74,
		hardware => loadRegisterIntoPairAddress('h', 'h', 'l', hardware),
		'LD (hl), h',
	),
	new Operator(
		'LoadLIntoHLAddress',
		0x75,
		hardware => loadRegisterIntoPairAddress('l', 'h', 'l', hardware),
		'LD (hl), l',
	),

	new Operator(
		'LoadAIntoBCAddress',
		0x02,
		hardware => loadRegisterIntoPairAddress('a', 'b', 'c', hardware),
		'LD (bc), a',
	),
	new Operator(
		'LoadAIntoDEAddress',
		0x12,
		hardware => loadRegisterIntoPairAddress('a', 'd', 'e', hardware),
		'LD (de), a',
	),
	// endregion

	// region Load and increment
	new Operator('LoadAIntoHLAddressAndIncrement', 0x22, hardware => {
		const registers = hardware.registers;

		hardware.memory.writeByte((registers.h << 8) + registers.l, registers.a);

		registers.l = (registers.l + 1) & 255;

		if (!registers.l)
			registers.h = (registers.h + 1) & 255;

		registers.m = 2;
	}, 'LD (hl)+, a'),
	new Operator('LoadHLAddressIntoAAndIncrement', 0x2A, hardware => {
		const registers = hardware.registers;

		registers.a = hardware.memory.readByte((registers.h << 8) + registers.l);

		registers.l = (registers.l + 1) & 255;

		if (!registers.l)
			registers.h = (registers.h + 1) & 255;

		registers.m = 2;
	}, 'LD a, (hl)+'),
	// endregion

	// region Load and decrement
	new Operator('LoadAIntoHLAddressAndDecrement', 0x32, hardware => {
		const registers = hardware.registers;

		hardware.memory.writeByte((registers.h << 8) + registers.l, registers.a);

		registers.l = (registers.l - 1) & 255;

		if (registers.l === 255)
			registers.h = (registers.h - 1) & 255;

		registers.m = 2;
	}, 'LD (hl)-, a'),
	new Operator('LoadHLAddressIntoAAndDecrement', 0x3A, hardware => {
		const registers = hardware.registers;

		registers.a = hardware.memory.readByte((registers.h << 8) + registers.l);

		registers.l = (registers.l - 1) & 255;

		if (registers.l === 255)
			registers.h = (registers.h - 1) & 255;

		registers.m = 2;
	}, 'LD a, (hl)-'),
	// endregion

	// region Load using uint8
	new Operator('LoadPCAddress8IntoA', 0xF0, hardware => {
		const {memory, registers} = hardware;

		registers.a = memory.readByte(0xFF00 + memory.readByte(registers.programCount++));

		registers.m = 3;
	}, 'LDH a, $FF00+(pc)', 2),
	new Operator('LoadAIntoPCAddress8', 0xE0, hardware => {
		const {memory, registers} = hardware;

		memory.writeByte(0xFF00 + memory.readByte(registers.programCount++), registers.a);

		registers.m = 3;
	}, 'LDH $FF00+(pc), a', 2),
	new Operator('LoadCAddress8IntoA', 0xF2, hardware => {
		const registers = hardware.registers;

		registers.a = hardware.memory.readByte(0xFF00 + registers.c);

		registers.m = 2;
	}, 'LDH a, $FF00+c'),
	new Operator('LoadAIntoCAddress8', 0xE2, hardware => {
		const registers = hardware.registers;

		hardware.memory.writeByte(0xFF00 + registers.c, registers.a);

		registers.m = 2;
	}, 'LDH $FF00+c, a'),
	new Operator('WeirdLoadThingWithSPAndHL', 0xF8, hardware => {
		const registers = hardware.registers;

		let value = hardware.memory.readByte(registers.programCount++);

		if (value > 127)
			value = -((~value + 1) & 255);

		value += registers.stackPointer;

		registers.h = (value >> 8) & 255;
		registers.l = value & 255;

		registers.m = 3;
	}, 'LDH sp, hl', 2),
	// endregion

	new Operator('LoadPCAddressIntoHLAddress', 0x36, hardware => {
		const {memory, registers} = hardware;

		memory.writeByte((registers.h << 8) + registers.l, memory.readByte(registers.programCount++));

		registers.m = 3;
	}, 'LD (hl), (pc)', 2),

	new Operator('LoadAIntoPCAddress16', 0xEA, hardware => {
		const {memory, registers} = hardware;

		memory.writeByte(memory.readWord(registers.programCount), registers.a);

		registers.programCount += 2;
		registers.m = 4;
	}, null, 3),
	new Operator('LoadPCAddress16IntoA', 0xFA, hardware => {
		const {memory, registers} = hardware;

		registers.a = memory.readByte(memory.readWord(registers.programCount));

		registers.programCount += 2;
		registers.m = 4;
	}, null, 3),

	new Operator('LoadPCAddressWordIntoSP', 0x31, hardware => {
		const registers = hardware.registers;

		registers.stackPointer = hardware.memory.readWord(registers.programCount);

		registers.programCount += 2;
		registers.m = 3;
	}, null, 3),
];
