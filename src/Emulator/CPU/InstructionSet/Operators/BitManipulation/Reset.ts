import {HardwareBusInterface} from '../../../../Hardware';
import {RegisterKey} from '../../../Registers';
import {Operator, OperatorInterface} from '../../InstructionManager';

const resetRegister = (key: RegisterKey, position: number, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	registers[key] &= ~(1 << position);
	registers.m = 2;
};

export const ResetOperators: OperatorInterface[] = [
	// region Registers
	new Operator('ResetBit0InA', 0x87, hardware => resetRegister('a', 0, hardware)),
	new Operator('ResetBit0InB', 0x80, hardware => resetRegister('b', 0, hardware)),
	new Operator('ResetBit0InC', 0x81, hardware => resetRegister('c', 0, hardware)),
	new Operator('ResetBit0InD', 0x82, hardware => resetRegister('d', 0, hardware)),
	new Operator('ResetBit0InE', 0x83, hardware => resetRegister('e', 0, hardware)),
	new Operator('ResetBit0InH', 0x84, hardware => resetRegister('h', 0, hardware)),
	new Operator('ResetBit0InL', 0x85, hardware => resetRegister('l', 0, hardware)),

	new Operator('ResetBit1InA', 0x8F, hardware => resetRegister('a', 1, hardware)),
	new Operator('ResetBit1InB', 0x88, hardware => resetRegister('b', 1, hardware)),
	new Operator('ResetBit1InC', 0x89, hardware => resetRegister('c', 1, hardware)),
	new Operator('ResetBit1InD', 0x8A, hardware => resetRegister('d', 1, hardware)),
	new Operator('ResetBit1InE', 0x8B, hardware => resetRegister('e', 1, hardware)),
	new Operator('ResetBit1InH', 0x8C, hardware => resetRegister('h', 1, hardware)),
	new Operator('ResetBit1InL', 0x8D, hardware => resetRegister('l', 1, hardware)),

	new Operator('ResetBit2InA', 0x97, hardware => resetRegister('a', 2, hardware)),
	new Operator('ResetBit2InB', 0x90, hardware => resetRegister('b', 2, hardware)),
	new Operator('ResetBit2InC', 0x91, hardware => resetRegister('c', 2, hardware)),
	new Operator('ResetBit2InD', 0x92, hardware => resetRegister('d', 2, hardware)),
	new Operator('ResetBit2InE', 0x93, hardware => resetRegister('e', 2, hardware)),
	new Operator('ResetBit2InH', 0x94, hardware => resetRegister('h', 2, hardware)),
	new Operator('ResetBit2InL', 0x95, hardware => resetRegister('l', 2, hardware)),

	new Operator('ResetBit3InA', 0x9F, hardware => resetRegister('a', 3, hardware)),
	new Operator('ResetBit3InB', 0x98, hardware => resetRegister('b', 3, hardware)),
	new Operator('ResetBit3InC', 0x99, hardware => resetRegister('c', 3, hardware)),
	new Operator('ResetBit3InD', 0x9A, hardware => resetRegister('d', 3, hardware)),
	new Operator('ResetBit3InE', 0x9B, hardware => resetRegister('e', 3, hardware)),
	new Operator('ResetBit3InH', 0x9C, hardware => resetRegister('h', 3, hardware)),
	new Operator('ResetBit3InL', 0x9D, hardware => resetRegister('l', 3, hardware)),

	new Operator('ResetBit4InA', 0xA7, hardware => resetRegister('a', 4, hardware)),
	new Operator('ResetBit4InB', 0xA0, hardware => resetRegister('b', 4, hardware)),
	new Operator('ResetBit4InC', 0xA1, hardware => resetRegister('c', 4, hardware)),
	new Operator('ResetBit4InD', 0xA2, hardware => resetRegister('d', 4, hardware)),
	new Operator('ResetBit4InE', 0xA3, hardware => resetRegister('e', 4, hardware)),
	new Operator('ResetBit4InH', 0xA4, hardware => resetRegister('h', 4, hardware)),
	new Operator('ResetBit4InL', 0xA5, hardware => resetRegister('l', 4, hardware)),

	new Operator('ResetBit5InA', 0xAF, hardware => resetRegister('a', 5, hardware)),
	new Operator('ResetBit5InB', 0xA8, hardware => resetRegister('b', 5, hardware)),
	new Operator('ResetBit5InC', 0xA9, hardware => resetRegister('c', 5, hardware)),
	new Operator('ResetBit5InD', 0xAA, hardware => resetRegister('d', 5, hardware)),
	new Operator('ResetBit5InE', 0xAB, hardware => resetRegister('e', 5, hardware)),
	new Operator('ResetBit5InH', 0xAC, hardware => resetRegister('h', 5, hardware)),
	new Operator('ResetBit5InL', 0xAD, hardware => resetRegister('l', 5, hardware)),

	new Operator('ResetBit6InA', 0xB7, hardware => resetRegister('a', 6, hardware)),
	new Operator('ResetBit6InB', 0xB0, hardware => resetRegister('b', 6, hardware)),
	new Operator('ResetBit6InC', 0xB1, hardware => resetRegister('c', 6, hardware)),
	new Operator('ResetBit6InD', 0xB2, hardware => resetRegister('d', 6, hardware)),
	new Operator('ResetBit6InE', 0xB3, hardware => resetRegister('e', 6, hardware)),
	new Operator('ResetBit6InH', 0xB4, hardware => resetRegister('h', 6, hardware)),
	new Operator('ResetBit6InL', 0xB5, hardware => resetRegister('l', 6, hardware)),

	new Operator('ResetBit7InA', 0xBF, hardware => resetRegister('a', 7, hardware)),
	new Operator('ResetBit7InB', 0xB8, hardware => resetRegister('b', 7, hardware)),
	new Operator('ResetBit7InC', 0xB9, hardware => resetRegister('c', 7, hardware)),
	new Operator('ResetBit7InD', 0xBA, hardware => resetRegister('d', 7, hardware)),
	new Operator('ResetBit7InE', 0xBB, hardware => resetRegister('e', 7, hardware)),
	new Operator('ResetBit7InH', 0xBC, hardware => resetRegister('h', 7, hardware)),
	new Operator('ResetBit7InL', 0xBD, hardware => resetRegister('l', 7, hardware)),
	// endregion
];