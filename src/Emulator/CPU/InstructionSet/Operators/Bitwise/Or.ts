import {HardwareBusInterface} from '../../../../Hardware';
import {RegisterFlag, RegisterKey} from '../../../Registers';
import {Operator, OperatorInterface} from '../../InstructionManager';

const or = (value: number, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	registers.a = (registers.a | value) & 255;
	registers.flags = registers.a ? 0 : RegisterFlag.ZERO;
};

const orRegister = (key: RegisterKey, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	or(registers[key], hardware);

	registers.m = 1;
};

const orAddress = (address: number, hardware: HardwareBusInterface): void => {
	or(hardware.memory.readByte(address), hardware);

	hardware.registers.m = 2;
};

export const OrOperators: OperatorInterface[] = [
	// region Registers
	new Operator('OrA', 0xB7, hardware => orRegister('a', hardware)),
	new Operator('OrB', 0xB0, hardware => orRegister('b', hardware)),
	new Operator('OrC', 0xB1, hardware => orRegister('c', hardware)),
	new Operator('OrD', 0xB2, hardware => orRegister('d', hardware)),
	new Operator('OrE', 0xB3, hardware => orRegister('e', hardware)),
	new Operator('OrH', 0xB4, hardware => orRegister('h', hardware)),
	new Operator('OrL', 0xB5, hardware => orRegister('l', hardware)),
	// endregion

	// region Addresses
	new Operator('OrHLAddress', 0xB6, hardware => {
		const registers = hardware.registers;

		orAddress((registers.h << 8) + registers.l, hardware);
	}),
	new Operator('OrPCAddress', 0xF6, hardware => orAddress(hardware.registers.programCount++, hardware), null, 2),
	// endregion
];
