import {HardwareBusInterface} from '../../../../Hardware';
import {pairTo16Bit} from '../../../../util';
import {RegisterKey} from '../../../Registers';
import {Operator, OperatorInterface} from '../../InstructionManager';

const resetRegister = (key: RegisterKey, position: number, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	registers[key] &= ~(1 << position);
	registers.m = 2;
};

const resetHLAddress = (position: number, hardware: HardwareBusInterface): void => {
	const {memory, registers} = hardware;
	const address = pairTo16Bit(registers.h, registers.l);

	const value = memory.readByte(address) & ~(1 << position);

	memory.writeByte(address, value);

	registers.m = 4;
};

export const ResetOperators: OperatorInterface[] = [
	// region Registers
	new Operator('ResetBit0InA', 0x87, hardware => resetRegister('a', 0, hardware), 'RES 0, a'),
	new Operator('ResetBit0InB', 0x80, hardware => resetRegister('b', 0, hardware), 'RES 0, b'),
	new Operator('ResetBit0InC', 0x81, hardware => resetRegister('c', 0, hardware), 'RES 0, c'),
	new Operator('ResetBit0InD', 0x82, hardware => resetRegister('d', 0, hardware), 'RES 0, d'),
	new Operator('ResetBit0InE', 0x83, hardware => resetRegister('e', 0, hardware), 'RES 0, e'),
	new Operator('ResetBit0InH', 0x84, hardware => resetRegister('h', 0, hardware), 'RES 0, h'),
	new Operator('ResetBit0InL', 0x85, hardware => resetRegister('l', 0, hardware), 'RES 0, l'),

	new Operator('ResetBit1InA', 0x8F, hardware => resetRegister('a', 1, hardware), 'RES 1, a'),
	new Operator('ResetBit1InB', 0x88, hardware => resetRegister('b', 1, hardware), 'RES 1, b'),
	new Operator('ResetBit1InC', 0x89, hardware => resetRegister('c', 1, hardware), 'RES 1, c'),
	new Operator('ResetBit1InD', 0x8A, hardware => resetRegister('d', 1, hardware), 'RES 1, d'),
	new Operator('ResetBit1InE', 0x8B, hardware => resetRegister('e', 1, hardware), 'RES 1, e'),
	new Operator('ResetBit1InH', 0x8C, hardware => resetRegister('h', 1, hardware), 'RES 1, h'),
	new Operator('ResetBit1InL', 0x8D, hardware => resetRegister('l', 1, hardware), 'RES 1, l'),

	new Operator('ResetBit2InA', 0x97, hardware => resetRegister('a', 2, hardware), 'RES 2, a'),
	new Operator('ResetBit2InB', 0x90, hardware => resetRegister('b', 2, hardware), 'RES 2, b'),
	new Operator('ResetBit2InC', 0x91, hardware => resetRegister('c', 2, hardware), 'RES 2, c'),
	new Operator('ResetBit2InD', 0x92, hardware => resetRegister('d', 2, hardware), 'RES 2, d'),
	new Operator('ResetBit2InE', 0x93, hardware => resetRegister('e', 2, hardware), 'RES 2, e'),
	new Operator('ResetBit2InH', 0x94, hardware => resetRegister('h', 2, hardware), 'RES 2, h'),
	new Operator('ResetBit2InL', 0x95, hardware => resetRegister('l', 2, hardware), 'RES 2, l'),

	new Operator('ResetBit3InA', 0x9F, hardware => resetRegister('a', 3, hardware), 'RES 3, a'),
	new Operator('ResetBit3InB', 0x98, hardware => resetRegister('b', 3, hardware), 'RES 3, b'),
	new Operator('ResetBit3InC', 0x99, hardware => resetRegister('c', 3, hardware), 'RES 3, c'),
	new Operator('ResetBit3InD', 0x9A, hardware => resetRegister('d', 3, hardware), 'RES 3, d'),
	new Operator('ResetBit3InE', 0x9B, hardware => resetRegister('e', 3, hardware), 'RES 3, e'),
	new Operator('ResetBit3InH', 0x9C, hardware => resetRegister('h', 3, hardware), 'RES 3, h'),
	new Operator('ResetBit3InL', 0x9D, hardware => resetRegister('l', 3, hardware), 'RES 3, l'),

	new Operator('ResetBit4InA', 0xA7, hardware => resetRegister('a', 4, hardware), 'RES 4, a'),
	new Operator('ResetBit4InB', 0xA0, hardware => resetRegister('b', 4, hardware), 'RES 4, b'),
	new Operator('ResetBit4InC', 0xA1, hardware => resetRegister('c', 4, hardware), 'RES 4, c'),
	new Operator('ResetBit4InD', 0xA2, hardware => resetRegister('d', 4, hardware), 'RES 4, d'),
	new Operator('ResetBit4InE', 0xA3, hardware => resetRegister('e', 4, hardware), 'RES 4, e'),
	new Operator('ResetBit4InH', 0xA4, hardware => resetRegister('h', 4, hardware), 'RES 4, h'),
	new Operator('ResetBit4InL', 0xA5, hardware => resetRegister('l', 4, hardware), 'RES 4, l'),

	new Operator('ResetBit5InA', 0xAF, hardware => resetRegister('a', 5, hardware), 'RES 5, a'),
	new Operator('ResetBit5InB', 0xA8, hardware => resetRegister('b', 5, hardware), 'RES 5, b'),
	new Operator('ResetBit5InC', 0xA9, hardware => resetRegister('c', 5, hardware), 'RES 5, c'),
	new Operator('ResetBit5InD', 0xAA, hardware => resetRegister('d', 5, hardware), 'RES 5, d'),
	new Operator('ResetBit5InE', 0xAB, hardware => resetRegister('e', 5, hardware), 'RES 5, e'),
	new Operator('ResetBit5InH', 0xAC, hardware => resetRegister('h', 5, hardware), 'RES 5, h'),
	new Operator('ResetBit5InL', 0xAD, hardware => resetRegister('l', 5, hardware), 'RES 5, l'),

	new Operator('ResetBit6InA', 0xB7, hardware => resetRegister('a', 6, hardware), 'RES 6, a'),
	new Operator('ResetBit6InB', 0xB0, hardware => resetRegister('b', 6, hardware), 'RES 6, b'),
	new Operator('ResetBit6InC', 0xB1, hardware => resetRegister('c', 6, hardware), 'RES 6, c'),
	new Operator('ResetBit6InD', 0xB2, hardware => resetRegister('d', 6, hardware), 'RES 6, d'),
	new Operator('ResetBit6InE', 0xB3, hardware => resetRegister('e', 6, hardware), 'RES 6, e'),
	new Operator('ResetBit6InH', 0xB4, hardware => resetRegister('h', 6, hardware), 'RES 6, h'),
	new Operator('ResetBit6InL', 0xB5, hardware => resetRegister('l', 6, hardware), 'RES 6, l'),

	new Operator('ResetBit7InA', 0xBF, hardware => resetRegister('a', 7, hardware), 'RES 7, a'),
	new Operator('ResetBit7InB', 0xB8, hardware => resetRegister('b', 7, hardware), 'RES 7, b'),
	new Operator('ResetBit7InC', 0xB9, hardware => resetRegister('c', 7, hardware), 'RES 7, c'),
	new Operator('ResetBit7InD', 0xBA, hardware => resetRegister('d', 7, hardware), 'RES 7, d'),
	new Operator('ResetBit7InE', 0xBB, hardware => resetRegister('e', 7, hardware), 'RES 7, e'),
	new Operator('ResetBit7InH', 0xBC, hardware => resetRegister('h', 7, hardware), 'RES 7, h'),
	new Operator('ResetBit7InL', 0xBD, hardware => resetRegister('l', 7, hardware), 'RES 7, l'),
	// endregion

	// region Addresses
	new Operator('ResetBit0InHLAddress', 0x86, hardware => resetHLAddress(0, hardware), 'RES 0, (hl)'),
	new Operator('ResetBit1InHLAddress', 0x8E, hardware => resetHLAddress(1, hardware), 'RES 1, (hl)'),
	new Operator('ResetBit2InHLAddress', 0x96, hardware => resetHLAddress(2, hardware), 'RES 2, (hl)'),
	new Operator('ResetBit3InHLAddress', 0x9E, hardware => resetHLAddress(3, hardware), 'RES 3, (hl)'),
	new Operator('ResetBit4InHLAddress', 0xA6, hardware => resetHLAddress(4, hardware), 'RES 4, (hl)'),
	new Operator('ResetBit5InHLAddress', 0xAE, hardware => resetHLAddress(5, hardware), 'RES 5, (hl)'),
	new Operator('ResetBit6InHLAddress', 0xB6, hardware => resetHLAddress(6, hardware), 'RES 6, (hl)'),
	new Operator('ResetBit7InHLAddress', 0xBE, hardware => resetHLAddress(7, hardware), 'RES 7, (hl)'),
	// endregion
];