import {HardwareBusInterface} from '../../../../Hardware';
import {pairTo16Bit} from '../../../../util';
import {RegisterFlag, RegisterKey} from '../../../Registers';
import {Operator, OperatorInterface} from '../../InstructionManager';

const test = (value: number, position: number, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	registers.flags &= RegisterFlag.CARRY;
	registers.flags |= RegisterFlag.HALF_CARRY;

	if (!(value & (1 << position)))
		registers.flags |= RegisterFlag.ZERO;
};

const testRegister = (key: RegisterKey, position: number, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	test(registers[key], position, hardware);

	registers.m = 2;
};

const testHLAddress = (position:  number, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;
	const address = pairTo16Bit(registers.h, registers.l);

	test(hardware.memory.readByte(address), position, hardware);

	registers.m = 3;
};

export const TestOperators: OperatorInterface[] = [
	// region Registers
	new Operator('TestBit0InA', 0x47, hardware => testRegister('a', 0, hardware), 'BIT 0, a'),
	new Operator('TestBit0InB', 0x40, hardware => testRegister('b', 0, hardware), 'BIT 0, b'),
	new Operator('TestBit0InC', 0x41, hardware => testRegister('c', 0, hardware), 'BIT 0, c'),
	new Operator('TestBit0InD', 0x42, hardware => testRegister('d', 0, hardware), 'BIT 0, d'),
	new Operator('TestBit0InE', 0x43, hardware => testRegister('e', 0, hardware), 'BIT 0, e'),
	new Operator('TestBit0InH', 0x44, hardware => testRegister('h', 0, hardware), 'BIT 0, h'),
	new Operator('TestBit0InL', 0x45, hardware => testRegister('l', 0, hardware), 'BIT 0, l'),

	new Operator('TestBit1InA', 0x4F, hardware => testRegister('a', 1, hardware), 'BIT 1, a'),
	new Operator('TestBit1InB', 0x48, hardware => testRegister('b', 1, hardware), 'BIT 1, b'),
	new Operator('TestBit1InC', 0x49, hardware => testRegister('c', 1, hardware), 'BIT 1, c'),
	new Operator('TestBit1InD', 0x4A, hardware => testRegister('d', 1, hardware), 'BIT 1, d'),
	new Operator('TestBit1InE', 0x4B, hardware => testRegister('e', 1, hardware), 'BIT 1, e'),
	new Operator('TestBit1InH', 0x4C, hardware => testRegister('h', 1, hardware), 'BIT 1, h'),
	new Operator('TestBit1InL', 0x4D, hardware => testRegister('l', 1, hardware), 'BIT 1, l'),

	new Operator('TestBit2InA', 0x57, hardware => testRegister('a', 2, hardware), 'BIT 2, a'),
	new Operator('TestBit2InB', 0x50, hardware => testRegister('b', 2, hardware), 'BIT 2, b'),
	new Operator('TestBit2InC', 0x51, hardware => testRegister('c', 2, hardware), 'BIT 2, c'),
	new Operator('TestBit2InD', 0x52, hardware => testRegister('d', 2, hardware), 'BIT 2, d'),
	new Operator('TestBit2InE', 0x53, hardware => testRegister('e', 2, hardware), 'BIT 2, e'),
	new Operator('TestBit2InH', 0x54, hardware => testRegister('h', 2, hardware), 'BIT 2, h'),
	new Operator('TestBit2InL', 0x55, hardware => testRegister('l', 2, hardware), 'BIT 2, l'),

	new Operator('TestBit3InA', 0x5F, hardware => testRegister('a', 3, hardware), 'BIT 3, a'),
	new Operator('TestBit3InB', 0x58, hardware => testRegister('b', 3, hardware), 'BIT 3, b'),
	new Operator('TestBit3InC', 0x59, hardware => testRegister('c', 3, hardware), 'BIT 3, c'),
	new Operator('TestBit3InD', 0x5A, hardware => testRegister('d', 3, hardware), 'BIT 3, d'),
	new Operator('TestBit3InE', 0x5B, hardware => testRegister('e', 3, hardware), 'BIT 3, e'),
	new Operator('TestBit3InH', 0x5C, hardware => testRegister('h', 3, hardware), 'BIT 3, h'),
	new Operator('TestBit3InL', 0x5D, hardware => testRegister('l', 3, hardware), 'BIT 3, l'),

	new Operator('TestBit4InA', 0x67, hardware => testRegister('a', 4, hardware), 'BIT 4, a'),
	new Operator('TestBit4InB', 0x60, hardware => testRegister('b', 4, hardware), 'BIT 4, b'),
	new Operator('TestBit4InC', 0x61, hardware => testRegister('c', 4, hardware), 'BIT 4, c'),
	new Operator('TestBit4InD', 0x62, hardware => testRegister('d', 4, hardware), 'BIT 4, d'),
	new Operator('TestBit4InE', 0x63, hardware => testRegister('e', 4, hardware), 'BIT 4, e'),
	new Operator('TestBit4InH', 0x64, hardware => testRegister('h', 4, hardware), 'BIT 4, h'),
	new Operator('TestBit4InL', 0x65, hardware => testRegister('l', 4, hardware), 'BIT 4, l'),

	new Operator('TestBit5InA', 0x6F, hardware => testRegister('a', 5, hardware), 'BIT 5, a'),
	new Operator('TestBit5InB', 0x68, hardware => testRegister('b', 5, hardware), 'BIT 5, b'),
	new Operator('TestBit5InC', 0x69, hardware => testRegister('c', 5, hardware), 'BIT 5, c'),
	new Operator('TestBit5InD', 0x6A, hardware => testRegister('d', 5, hardware), 'BIT 5, d'),
	new Operator('TestBit5InE', 0x6B, hardware => testRegister('e', 5, hardware), 'BIT 5, e'),
	new Operator('TestBit5InH', 0x6C, hardware => testRegister('h', 5, hardware), 'BIT 5, h'),
	new Operator('TestBit5InL', 0x6D, hardware => testRegister('l', 5, hardware), 'BIT 5, l'),

	new Operator('TestBit6InA', 0x77, hardware => testRegister('a', 6, hardware), 'BIT 6, a'),
	new Operator('TestBit6InB', 0x70, hardware => testRegister('b', 6, hardware), 'BIT 6, b'),
	new Operator('TestBit6InC', 0x71, hardware => testRegister('c', 6, hardware), 'BIT 6, c'),
	new Operator('TestBit6InD', 0x72, hardware => testRegister('d', 6, hardware), 'BIT 6, d'),
	new Operator('TestBit6InE', 0x73, hardware => testRegister('e', 6, hardware), 'BIT 6, e'),
	new Operator('TestBit6InH', 0x74, hardware => testRegister('h', 6, hardware), 'BIT 6, h'),
	new Operator('TestBit6InL', 0x75, hardware => testRegister('l', 6, hardware), 'BIT 6, l'),

	new Operator('TestBit7InA', 0x7F, hardware => testRegister('a', 7, hardware), 'BIT 7, a'),
	new Operator('TestBit7InB', 0x78, hardware => testRegister('b', 7, hardware), 'BIT 7, b'),
	new Operator('TestBit7InC', 0x79, hardware => testRegister('c', 7, hardware), 'BIT 7, c'),
	new Operator('TestBit7InD', 0x7A, hardware => testRegister('d', 7, hardware), 'BIT 7, d'),
	new Operator('TestBit7InE', 0x7B, hardware => testRegister('e', 7, hardware), 'BIT 7, e'),
	new Operator('TestBit7InH', 0x7C, hardware => testRegister('h', 7, hardware), 'BIT 7, h'),
	new Operator('TestBit7InL', 0x7D, hardware => testRegister('l', 7, hardware), 'BIT 7, l'),
	// endregion

	// region Addresses
	new Operator('TestBit0InHLAddress', 0x46, hardware => testHLAddress(0, hardware), 'BIT 0, (hl)'),
	new Operator('TestBit1InHLAddress', 0x4E, hardware => testHLAddress(1, hardware), 'BIT 1, (hl)'),
	new Operator('TestBit2InHLAddress', 0x56, hardware => testHLAddress(2, hardware), 'BIT 2, (hl)'),
	new Operator('TestBit3InHLAddress', 0x5E, hardware => testHLAddress(3, hardware), 'BIT 3, (hl)'),
	new Operator('TestBit4InHLAddress', 0x66, hardware => testHLAddress(4, hardware), 'BIT 4, (hl)'),
	new Operator('TestBit5InHLAddress', 0x6E, hardware => testHLAddress(5, hardware), 'BIT 5, (hl)'),
	new Operator('TestBit6InHLAddress', 0x76, hardware => testHLAddress(6, hardware), 'BIT 6, (hl)'),
	new Operator('TestBit7InHLAddress', 0x7E, hardware => testHLAddress(7, hardware), 'BIT 7, (hl)'),
	// endregion
];