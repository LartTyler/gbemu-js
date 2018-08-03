import {HardwareBusInterface} from '../../../../Hardware';
import {pairTo16Bit} from '../../../../util';
import {RegisterFlag, RegisterKey} from '../../../Registers';
import {Operator, OperatorInterface} from '../../InstructionManager';

const rotate = (value: number, hardware: HardwareBusInterface): number => {
	const registers = hardware.registers;
	const lowBit = value & 1;

	value = ((value >> 1) + (lowBit ? 0x80 : 0)) & 255;
	registers.flags = lowBit ? RegisterFlag.CARRY : 0;

	if (!value)
		registers.flags |= RegisterFlag.ZERO;

	return value;
};

const rotateRegister = (key: RegisterKey, fast: boolean, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	registers[key] = rotate(registers[key], hardware);
	registers.m = fast ? 1 : 2;

	// Per spect, fast calls (such as RRCA / RotateARightCircularFast) should reset all flags except CARRY
	if (fast)
		registers.flags &= RegisterFlag.CARRY;
};

export const RotateRightCircularPrimaryOperators: OperatorInterface[] = [
	new Operator('RotateARightCircularFast', 0x0F, hardware => rotateRegister('a', true, hardware), 'RRCA'),
];

export const RotateRightCircularBitOperators: OperatorInterface[] = [
	// region Registers
	new Operator('RotateARightCircular', 0x0F, hardware => rotateRegister('a', false, hardware), 'RRC a'),
	new Operator('RotateBRightCircular', 0x08, hardware => rotateRegister('b', false, hardware), 'RRC b'),
	new Operator('RotateCRightCircular', 0x09, hardware => rotateRegister('c', false, hardware), 'RRC c'),
	new Operator('RotateDRightCircular', 0x0A, hardware => rotateRegister('d', false, hardware), 'RRC d'),
	new Operator('RotateERightCircular', 0x0B, hardware => rotateRegister('e', false, hardware), 'RRC e'),
	new Operator('RotateHRightCircular', 0x0C, hardware => rotateRegister('h', false, hardware), 'RRC h'),
	new Operator('RotateLRightCircular', 0x0D, hardware => rotateRegister('l', false, hardware), 'RRC l'),
	// endregion

	new Operator('RotateHLAddressRightCircular', 0x0E, hardware => {
		const {memory, registers} = hardware;
		const address = pairTo16Bit(registers.h, registers.l);

		memory.writeByte(address, rotate(memory.readByte(address), hardware));

		registers.m = 4;
	}),
];