import {HardwareBusInterface} from '../../../../Hardware';
import {pairTo16Bit} from '../../../../util';
import {RegisterKey} from '../../../Registers';
import {Operator, OperatorInterface} from '../../InstructionManager';

const setRegister = (key: RegisterKey, position: number, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	registers[key] |= 1 << position;
	registers.m = 2;
};

const setHLAddress = (position: number, hardware: HardwareBusInterface): void => {
	const {memory, registers} = hardware;
	const address = pairTo16Bit(registers.h, registers.l);

	const value = memory.readByte(address) | (1 << position);

	memory.writeByte(address, value);

	registers.m = 4;
};

export const SetOperators: OperatorInterface[] = [
	// region Registers
	new Operator('SetBit0InA', 0xC7, hardware => setRegister('a', 0, hardware)),
	new Operator('SetBit0InB', 0xC0, hardware => setRegister('b', 0, hardware)),
	new Operator('SetBit0InC', 0xC1, hardware => setRegister('c', 0, hardware)),
	new Operator('SetBit0InD', 0xC2, hardware => setRegister('d', 0, hardware)),
	new Operator('SetBit0InE', 0xC3, hardware => setRegister('e', 0, hardware)),
	new Operator('SetBit0InH', 0xC4, hardware => setRegister('h', 0, hardware)),
	new Operator('SetBit0InL', 0xC5, hardware => setRegister('l', 0, hardware)),

	new Operator('SetBit1InA', 0xCF, hardware => setRegister('a', 1, hardware)),
	new Operator('SetBit1InB', 0xC8, hardware => setRegister('b', 1, hardware)),
	new Operator('SetBit1InC', 0xC9, hardware => setRegister('c', 1, hardware)),
	new Operator('SetBit1InD', 0xCA, hardware => setRegister('d', 1, hardware)),
	new Operator('SetBit1InE', 0xCB, hardware => setRegister('e', 1, hardware)),
	new Operator('SetBit1InH', 0xCC, hardware => setRegister('h', 1, hardware)),
	new Operator('SetBit1InL', 0xCD, hardware => setRegister('l', 1, hardware)),

	new Operator('SetBit2InA', 0xD7, hardware => setRegister('a', 2, hardware)),
	new Operator('SetBit2InB', 0xD0, hardware => setRegister('b', 2, hardware)),
	new Operator('SetBit2InC', 0xD1, hardware => setRegister('c', 2, hardware)),
	new Operator('SetBit2InD', 0xD2, hardware => setRegister('d', 2, hardware)),
	new Operator('SetBit2InE', 0xD3, hardware => setRegister('e', 2, hardware)),
	new Operator('SetBit2InH', 0xD4, hardware => setRegister('h', 2, hardware)),
	new Operator('SetBit2InL', 0xD5, hardware => setRegister('l', 2, hardware)),

	new Operator('SetBit3InA', 0xDF, hardware => setRegister('a', 3, hardware)),
	new Operator('SetBit3InB', 0xD8, hardware => setRegister('b', 3, hardware)),
	new Operator('SetBit3InC', 0xD9, hardware => setRegister('c', 3, hardware)),
	new Operator('SetBit3InD', 0xDA, hardware => setRegister('d', 3, hardware)),
	new Operator('SetBit3InE', 0xDB, hardware => setRegister('e', 3, hardware)),
	new Operator('SetBit3InH', 0xDC, hardware => setRegister('h', 3, hardware)),
	new Operator('SetBit3InL', 0xDD, hardware => setRegister('l', 3, hardware)),

	new Operator('SetBit4InA', 0xE7, hardware => setRegister('a', 4, hardware)),
	new Operator('SetBit4InB', 0xE0, hardware => setRegister('b', 4, hardware)),
	new Operator('SetBit4InC', 0xE1, hardware => setRegister('c', 4, hardware)),
	new Operator('SetBit4InD', 0xE2, hardware => setRegister('d', 4, hardware)),
	new Operator('SetBit4InE', 0xE3, hardware => setRegister('e', 4, hardware)),
	new Operator('SetBit4InH', 0xE4, hardware => setRegister('h', 4, hardware)),
	new Operator('SetBit4InL', 0xE5, hardware => setRegister('l', 4, hardware)),

	new Operator('SetBit5InA', 0xEF, hardware => setRegister('a', 5, hardware)),
	new Operator('SetBit5InB', 0xE8, hardware => setRegister('b', 5, hardware)),
	new Operator('SetBit5InC', 0xE9, hardware => setRegister('c', 5, hardware)),
	new Operator('SetBit5InD', 0xEA, hardware => setRegister('d', 5, hardware)),
	new Operator('SetBit5InE', 0xEB, hardware => setRegister('e', 5, hardware)),
	new Operator('SetBit5InH', 0xEC, hardware => setRegister('h', 5, hardware)),
	new Operator('SetBit5InL', 0xED, hardware => setRegister('l', 5, hardware)),

	new Operator('SetBit6InA', 0xF7, hardware => setRegister('a', 6, hardware)),
	new Operator('SetBit6InB', 0xF0, hardware => setRegister('b', 6, hardware)),
	new Operator('SetBit6InC', 0xF1, hardware => setRegister('c', 6, hardware)),
	new Operator('SetBit6InD', 0xF2, hardware => setRegister('d', 6, hardware)),
	new Operator('SetBit6InE', 0xF3, hardware => setRegister('e', 6, hardware)),
	new Operator('SetBit6InH', 0xF4, hardware => setRegister('h', 6, hardware)),
	new Operator('SetBit6InL', 0xF5, hardware => setRegister('l', 6, hardware)),

	new Operator('SetBit7InA', 0xFF, hardware => setRegister('a', 7, hardware)),
	new Operator('SetBit7InB', 0xF8, hardware => setRegister('b', 7, hardware)),
	new Operator('SetBit7InC', 0xF9, hardware => setRegister('c', 7, hardware)),
	new Operator('SetBit7InD', 0xFA, hardware => setRegister('d', 7, hardware)),
	new Operator('SetBit7InE', 0xFB, hardware => setRegister('e', 7, hardware)),
	new Operator('SetBit7InH', 0xFC, hardware => setRegister('h', 7, hardware)),
	new Operator('SetBit7InL', 0xFD, hardware => setRegister('l', 7, hardware)),
	// endregion

	// region Addresses
	new Operator('SetBit0InHLAddress', 0xC6, hardware => setHLAddress(0, hardware)),
	new Operator('SetBit1InHLAddress', 0xCE, hardware => setHLAddress(1, hardware)),
	new Operator('SetBit2InHLAddress', 0xD6, hardware => setHLAddress(2, hardware)),
	new Operator('SetBit3InHLAddress', 0xDE, hardware => setHLAddress(3, hardware)),
	new Operator('SetBit4InHLAddress', 0xE6, hardware => setHLAddress(4, hardware)),
	new Operator('SetBit5InHLAddress', 0xEE, hardware => setHLAddress(5, hardware)),
	new Operator('SetBit6InHLAddress', 0xF6, hardware => setHLAddress(6, hardware)),
	new Operator('SetBit7InHLAddress', 0xFE, hardware => setHLAddress(7, hardware)),
	// endregion
];