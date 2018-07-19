import {HardwareBusInterface} from '../../../../Hardware';
import {pairTo16Bit} from '../../../../util';
import {RegisterFlag, RegisterKey} from '../../../Registers';
import {Operator, OperatorInterface} from '../../InstructionManager';

const xor = (value: number, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	registers.a = (registers.a ^ value) & 255;
	registers.flags = registers.a ? 0 : RegisterFlag.ZERO;
};

const xorRegister = (key: RegisterKey, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	xor(registers[key], hardware);

	registers.m = 1;
};

const xorAddress = (address: number, hardware: HardwareBusInterface): void => {
	xor(hardware.memory.readByte(address), hardware);

	hardware.registers.m = 2;
};

export const XorOperators: OperatorInterface[] = [
	// region Registers
	new Operator('XorA', 0xAF, hardware => xorRegister('a', hardware)),
	new Operator('XorB', 0xA8, hardware => xorRegister('b', hardware)),
	new Operator('XorC', 0xA9, hardware => xorRegister('c', hardware)),
	new Operator('XorD', 0xAA, hardware => xorRegister('d', hardware)),
	new Operator('XorE', 0xAB, hardware => xorRegister('e', hardware)),
	new Operator('XorH', 0xAC, hardware => xorRegister('h', hardware)),
	new Operator('XorL', 0xAD, hardware => xorRegister('l', hardware)),
	// endregion

	// region Addresses
	new Operator('XorHLAddress', 0xAE, hardware => {
		const registers = hardware.registers;

		xorAddress(pairTo16Bit(registers.h, registers.l), hardware);
	}),
	new Operator('XorPCAddress', 0xEE, hardware => xorAddress(hardware.registers.programCount++, hardware)),
	// endregion
];