import {HardwareBusInterface} from '../../../../Hardware';
import {RegisterFlag, RegisterKey} from '../../../Registers';
import {Operator, OperatorInterface} from '../../InstructionManager';

const and = (value: number, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	registers.a = registers.a & value & 255;
	registers.flags = registers.a ? 0 : RegisterFlag.ZERO;
};

const andRegister = (key: RegisterKey, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	and(registers[key], hardware);

	registers.m = 1;
};

const andAddress = (address: number, hardware: HardwareBusInterface): void => {
	and(hardware.memory.readByte(address), hardware);

	hardware.registers.m = 2;
};

export const AndOperators: OperatorInterface[] = [
	// region Registers
	new Operator('AndA', 0xA7, hardware => andRegister('a', hardware), 'AND a, a'),
	new Operator('AndB', 0xA0, hardware => andRegister('b', hardware), 'AND a, b'),
	new Operator('AndC', 0xA1, hardware => andRegister('c', hardware), 'AND a, c'),
	new Operator('AndD', 0xA2, hardware => andRegister('d', hardware), 'AND a, d'),
	new Operator('AndE', 0xA3, hardware => andRegister('e', hardware), 'AND a, e'),
	new Operator('AndH', 0xA4, hardware => andRegister('h', hardware), 'AND a, h'),
	new Operator('AndL', 0xA5, hardware => andRegister('l', hardware), 'AND a, l'),
	// endregion

	// region Addresses
	new Operator('AndHLAddress', 0xA6, hardware => {
		const registers = hardware.registers;

		andAddress((registers.h << 8) + registers.l, hardware);
	}, 'AND a, (hl)'),
	new Operator('AndPCAddress', 0xE6, hardware => andAddress(hardware.registers.programCount++, hardware), 'AND a, (pc)'),
	// endregion
];