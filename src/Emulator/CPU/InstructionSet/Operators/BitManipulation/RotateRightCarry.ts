import {HardwareBusInterface} from '../../../../Hardware';
import {pairTo16Bit} from '../../../../util';
import {RegisterFlag, RegisterKey} from '../../../Registers';
import {Operator, OperatorInterface} from '../../InstructionManager';

const rotate = (value: number, hardware: HardwareBusInterface): number => {
	const registers = hardware.registers;

	const oldCarry = registers.flags & RegisterFlag.CARRY;
	const newCarry = value & 1;

	value = ((value >> 1) + (oldCarry ? 0x80 : 0)) & 255;
	registers.flags = newCarry ? RegisterFlag.CARRY : 0;

	if (!value)
		registers.flags |= RegisterFlag.ZERO;

	return value;
};

const rotateRegister = (key: RegisterKey, fast: boolean, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	registers[key] = rotate(registers[key], hardware);
	registers.m = fast ? 1 : 2;

	// Per spec, any "fast" calls (such as RLA / RotateALeftCarryFast) should reset all flags except for CARRY
	if (fast)
		registers.flags &= RegisterFlag.CARRY;
};

export const RotateRightCarryPrimaryOperators: OperatorInterface[] = [
	new Operator('RotateARightCarryFast', 0x1F, hardware => rotateRegister('a', true, hardware), 'RRA'),
];

export const RotateRightCarryBitOperators: OperatorInterface[] = [
	new Operator('RotateARightCarry', 0x1F, hardware => rotateRegister('a', false, hardware), 'RR a'),
	new Operator('RotateBRightCarry', 0x18, hardware => rotateRegister('b', false, hardware), 'RR b'),
	new Operator('RotateCRightCarry', 0x19, hardware => rotateRegister('c', false, hardware), 'RR c'),
	new Operator('RotateDRightCarry', 0x1A, hardware => rotateRegister('d', false, hardware), 'RR d'),
	new Operator('RotateERightCarry', 0x1B, hardware => rotateRegister('e', false, hardware), 'RR e'),
	new Operator('RotateHRightCarry', 0x1C, hardware => rotateRegister('h', false, hardware), 'RR h'),
	new Operator('RotateLRightCarry', 0x1D, hardware => rotateRegister('l', false, hardware), 'RR l'),

	new Operator('RotateHLAddressRightCarry', 0x1E, hardware => {
		const {memory, registers} = hardware;
		const address = pairTo16Bit(registers.h, registers.l);

		memory.writeByte(address, rotate(memory.readByte(address), hardware));

		registers.m = 4;
	}),
];