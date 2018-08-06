import {HardwareBusInterface} from '../../../../Hardware';
import {pairTo16Bit} from '../../../../util';
import {RegisterFlag, RegisterKey} from '../../../Registers';
import {Operator, OperatorInterface} from '../../InstructionManager';

const shift = (value: number, hardware: HardwareBusInterface): number => {
	const registers = hardware.registers;

	registers.flags = value & 1 ? RegisterFlag.CARRY : 0;

	value = (value >> 1) & 255;

	if (!value)
		registers.flags |= RegisterFlag.ZERO;

	return value;
};

const shiftRegister = (key: RegisterKey, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	registers[key] = shift(registers[key], hardware);
	registers.m = 2;
};

export const ShiftRightLogicalOperators: OperatorInterface[] = [
	// region Registers
	new Operator('ShiftARightLogical', 0x3F, hardware => shiftRegister('a', hardware), 'SRL a'),
	new Operator('ShiftBRightLogical', 0x38, hardware => shiftRegister('b', hardware), 'SRL b'),
	new Operator('ShiftCRightLogical', 0x39, hardware => shiftRegister('c', hardware), 'SRL c'),
	new Operator('ShiftDRightLogical', 0x3A, hardware => shiftRegister('d', hardware), 'SRL d'),
	new Operator('ShiftERightLogical', 0x3B, hardware => shiftRegister('e', hardware), 'SRL e'),
	new Operator('ShiftHRightLogical', 0x3C, hardware => shiftRegister('h', hardware), 'SRL h'),
	new Operator('ShiftLRightLogical', 0x3D, hardware => shiftRegister('l', hardware), 'SRL l'),
	// endregion

	new Operator('ShiftHLAddressRightLogical', 0x3E, hardware => {
		const {memory, registers} = hardware;
		const address = pairTo16Bit(registers.h, registers.l);

		memory.writeByte(address, shift(memory.readByte(address), hardware));

		registers.m = 4;
	}, 'SRL (hl)'),
];