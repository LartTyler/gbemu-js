import {HardwareBusInterface} from '../../../../Hardware';
import {pairTo16Bit} from '../../../../util';
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

	// Per spec, any "fast" calls (such as RLA / RotateALeftCarryFast) should reset all flags except for CARRY
	if (fast)
		registers.flags &= RegisterFlag.CARRY;
};

export const RotateLeftCarryPrimaryOperators: OperatorInterface[] = [
	new Operator('RotateALeftCarryFast', 0x17, hardware => rotateRegister('a', true, hardware), 'RLA'),
];

export const RotateLeftCarryBitOperators: OperatorInterface[] = [
	// region Registers
	new Operator('RotateALeftCarry', 0x17, hardware => rotateRegister('a', false, hardware), 'RL a'),
	new Operator('RotateBLeftCarry', 0x10, hardware => rotateRegister('b', false, hardware), 'RL b'),
	new Operator('RotateCLeftCarry', 0x11, hardware => rotateRegister('c', false, hardware), 'RL c'),
	new Operator('RotateDLeftCarry', 0x12, hardware => rotateRegister('d', false, hardware), 'RL d'),
	new Operator('RotateELeftCarry', 0x13, hardware => rotateRegister('e', false, hardware), 'RL e'),
	new Operator('RotateHLeftCarry', 0x14, hardware => rotateRegister('h', false, hardware), 'RL h'),
	new Operator('RotateLLeftCarry', 0x15, hardware => rotateRegister('l', false, hardware), 'RL l'),
	// endregion

	new Operator('RotateHLAddressLeftCarry', 0x16, hardware => {
		const {memory, registers} = hardware;
		const address = pairTo16Bit(registers.h, registers.l);

		memory.writeByte(address, rotate(memory.readByte(address), hardware));

		registers.m = 4;
	}, 'RL (hl)'),
];