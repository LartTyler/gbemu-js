import {HardwareBusInterface} from '../../../../Hardware';
import {pairTo16Bit} from '../../../../util';
import {RegisterFlag, RegisterKey} from '../../../Registers';
import {Operator, OperatorInterface} from '../../InstructionManager';

const shift = (value: number, hardware: HardwareBusInterface): number => {
	const registers = hardware.registers;

	registers.flags = value & 0x80 ? RegisterFlag.CARRY : 0;

	value = (value << 1) & 255;

	if (!value)
		registers.flags |= RegisterFlag.ZERO;

	return value;
};

const shiftRegister = (key: RegisterKey, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	registers[key] = shift(registers[key], hardware);

	registers.m = 2;
};

export const ShiftLeftArithmeticOperators: OperatorInterface[] = [
	// region Registers
	new Operator('ShiftALeftArithmetic', 0x27, hardware => shiftRegister('a', hardware), 'SLA a'),
	new Operator('ShiftBLeftArithmetic', 0x20, hardware => shiftRegister('b', hardware), 'SLA b'),
	new Operator('ShiftCLeftArithmetic', 0x21, hardware => shiftRegister('c', hardware), 'SLA c'),
	new Operator('ShiftDLeftArithmetic', 0x22, hardware => shiftRegister('d', hardware), 'SLA d'),
	new Operator('ShiftELeftArithmetic', 0x23, hardware => shiftRegister('e', hardware), 'SLA e'),
	new Operator('ShiftHLeftArithmetic', 0x24, hardware => shiftRegister('h', hardware), 'SLA h'),
	new Operator('ShiftLLeftArithmetic', 0x25, hardware => shiftRegister('l', hardware), 'SLA l'),
	// endregion

	new Operator('ShiftHLAddressLeftArithmetic', 0x26, hardware => {
		const {memory, registers} = hardware;
		const address = pairTo16Bit(registers.h, registers.l);

		memory.writeByte(address, shift(memory.readByte(address), hardware));

		registers.m = 4;
	}, 'SLA (hl)'),
];