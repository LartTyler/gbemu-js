import {HardwareBusInterface} from '../../../Hardware';
import {pairTo16Bit} from '../../../util';
import {RegisterFlag, RegisterKey} from '../../Registers';
import {Operator, OperatorInterface} from '../InstructionManager';

const incrementRegister = (key: RegisterKey, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	registers[key] = (registers[key] + 1) & 255;
	registers.flags = registers[key] ? 0 : RegisterFlag.ZERO;

	registers.m = 1;
};

const incrementPair = (high: RegisterKey, low: RegisterKey, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	registers[low] = (registers[low] + 1) & 255;

	if (!registers[low])
		registers[high] = (registers[high] + 1) & 255;

	registers.m = 1;
};

export const IncrementOperators: OperatorInterface[] = [
	// region Registers
	new Operator('IncrementA', 0x3C, hardware => incrementRegister('a', hardware)),
	new Operator('IncrementB', 0x04, hardware => incrementRegister('b', hardware)),
	new Operator('IncrementC', 0x0C, hardware => incrementRegister('c', hardware)),
	new Operator('IncrementD', 0x14, hardware => incrementRegister('d', hardware)),
	new Operator('IncrementE', 0x1C, hardware => incrementRegister('e', hardware)),
	new Operator('IncrementH', 0x24, hardware => incrementRegister('h', hardware)),
	new Operator('IncrementL', 0x2C, hardware => incrementRegister('l', hardware)),
	// endregion

	// region Addresses
	new Operator('IncrementHLAddress', 0x34, hardware => {
		const {memory, registers} = hardware;
		const address = pairTo16Bit(registers.h, registers.l);

		const value = (memory.readByte(address) + 1) & 255;

		memory.writeByte(address, value);
		registers.flags = value ? 0 : RegisterFlag.ZERO;

		registers.m = 3;
	}),
	// endregion

	// region Register Pairs (16-bit)
	new Operator('IncrementBCPair', 0x03, hardware => incrementPair('b', 'c', hardware)),
	new Operator('IncrementDEPair', 0x13, hardware => incrementPair('d', 'e', hardware)),
	new Operator('IncrementHLPair', 0x23, hardware => incrementPair('h', 'l', hardware)),
	// endregion

	new Operator('IncrementSP', 0x33, hardware => {
		const registers = hardware.registers;

		registers.stackPointer = (registers.stackPointer + 1) & 65535;
		registers.m = 1;
	}),
];