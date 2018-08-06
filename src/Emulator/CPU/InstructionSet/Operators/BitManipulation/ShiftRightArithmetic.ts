import {HardwareBusInterface} from '../../../../Hardware';
import {pairTo16Bit} from '../../../../util';
import {RegisterFlag, RegisterKey} from '../../../Registers';
import {Operator, OperatorInterface} from '../../InstructionManager';

const shift = (value: number, hardware: HardwareBusInterface): number => {
	const registers = hardware.registers;

	const highBit = value & 0x80;

	registers.flags = value & 1 ? RegisterFlag.CARRY : 0;

	value = ((value >> 1) + (highBit ? 0x80 : 0)) & 255;

	if (!value)
		registers.flags |= RegisterFlag.ZERO;

	return value;
};

const shiftRegister = (key: RegisterKey, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	registers[key] = shift(registers[key], hardware);
	registers.m = 2;
};

export const ShiftRightArithmeticOperators: OperatorInterface[] = [
	// region Registers
	new Operator('ShiftARightArithmetic', 0x2F, hardware => shiftRegister('a', hardware), 'SRA a'),
	new Operator('ShiftBRightArithmetic', 0x28, hardware => shiftRegister('b', hardware), 'SRA b'),
	new Operator('ShiftCRightArithmetic', 0x29, hardware => shiftRegister('c', hardware), 'SRA c'),
	new Operator('ShiftDRightArithmetic', 0x2A, hardware => shiftRegister('d', hardware), 'SRA d'),
	new Operator('ShiftERightArithmetic', 0x2B, hardware => shiftRegister('e', hardware), 'SRA e'),
	new Operator('ShiftHRightArithmetic', 0x2C, hardware => shiftRegister('h', hardware), 'SRA h'),
	new Operator('ShiftLRightArithmetic', 0x2D, hardware => shiftRegister('l', hardware), 'SRA l'),
	// endregion

	new Operator('ShiftHLAddressRightArithmetic', 0x2E, hardware => {
		const {memory, registers} = hardware;
		const address = pairTo16Bit(registers.h, registers.l);

		memory.writeByte(address, shift(memory.readByte(address), hardware));

		registers.m = 4;
	}, 'SRA (hl)'),
];