import {HardwareBusInterface} from '../../../../Hardware';
import {RegisterFlag, RegisterKey} from '../../../Registers';
import {Operator, OperatorInterface} from '../../InstructionManager';

const rotate = (value: number, hardware: HardwareBusInterface): number => {
	const registers = hardware.registers;

	const oldCarry = registers.flags & RegisterFlag.CARRY;
	const newCarry = value & 0x80;

	value = ((value << 1) + (oldCarry ? 1 : 0)) & 255;
	registers.flags = newCarry ? RegisterFlag.CARRY : 0;

	if (!value)
		registers.flags |= RegisterFlag.ZERO;

	return value;
};

const rotateRegister = (key: RegisterKey, fast: boolean, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	registers[key] = rotate(registers[key], hardware);
	registers.m = fast ? 1 : 2;
};

export const RotateLeftCarryPrimaryOperators: OperatorInterface[] = [
	new Operator('RotateALeftCarryFast', 0x17, hardware => {
		rotateRegister('a', true, hardware);

		// Per spec, RLA should zero all flags except the CARRY flag
		hardware.registers.flags &= RegisterFlag.CARRY;
	}, 'RLA'),
];

export const RotateLeftCarryBitOperators: OperatorInterface[] = [
	new Operator('RotateALeftCarry', 0x17, hardware => rotateRegister('a', false, hardware)),
	new Operator('RotateBLeftCarry', 0x10, hardware => rotateRegister('b', false, hardware)),
	new Operator('RotateCLeftCarry', 0x11, hardware => rotateRegister('c', false, hardware)),
	new Operator('RotateDLeftCarry', 0x12, hardware => rotateRegister('d', false, hardware)),
	new Operator('RotateELeftCarry', 0x13, hardware => rotateRegister('e', false, hardware)),
	new Operator('RotateHLeftCarry', 0x14, hardware => rotateRegister('h', false, hardware)),
	new Operator('RotateLLeftCarry', 0x15, hardware => rotateRegister('l', false, hardware)),
];