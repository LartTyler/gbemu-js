import {HardwareBusInterface} from '../../../Hardware';
import {pairTo16Bit} from '../../../util';
import {RegisterFlag, RegisterKey} from '../../Registers';
import {Operator, OperatorInterface} from '../InstructionManager';

const decrementRegister = (key: RegisterKey, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	registers[key] = (registers[key] - 1) & 255;
	registers.flags = registers[key] ? 0 : RegisterFlag.ZERO;

	registers.m = 1;
};

const decrementRegisterPair = (high: RegisterKey, low: RegisterKey, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	registers[low] = (registers[low] - 1) & 255;

	if (registers[low] === 255)
		registers[high] = (registers[high] - 1) & 255;

	registers.m = 1;
};

export const DecrementOperators: OperatorInterface[] = [
	// region Registers
	new Operator('DecrementA', 0x3D, hardware => decrementRegister('a', hardware)),
	new Operator('DecrementB', 0x05, hardware => decrementRegister('b', hardware)),
	new Operator('DecrementC', 0x0D, hardware => decrementRegister('c', hardware)),
	new Operator('DecrementD', 0x15, hardware => decrementRegister('d', hardware)),
	new Operator('DecrementE', 0x1D, hardware => decrementRegister('e', hardware)),
	new Operator('DecrementH', 0x25, hardware => decrementRegister('h', hardware)),
	new Operator('DecrementL', 0x2D, hardware => decrementRegister('l', hardware)),
	// endregion

	// region Addresses
	new Operator('DecrementHLAddress', 0x35, hardware => {
		const {memory, registers} = hardware;
		const address= pairTo16Bit(registers.h, registers.l);

		const value = (memory.readByte(address) - 1) & 255;

		memory.writeByte(address, value);
		registers.flags = value ? 0 : RegisterFlag.ZERO;

		registers.m = 3;
	}),
	// endregion

	// region Register Pairs (16 bit)
	new Operator('DecrementBCPair', 0x0B, hardware => decrementRegisterPair('b', 'c', hardware)),
	new Operator('DecrementDEPair', 0x1B, hardware => decrementRegisterPair('d', 'e', hardware)),
	new Operator('DecrementHLPair', 0x2B, hardware => decrementRegisterPair('h', 'l', hardware)),
	// endregion

	new Operator('DecrementSP', 0x3B, hardware => {
		const registers = hardware.registers;

		registers.stackPointer = (registers.stackPointer - 1) & 65535;
		registers.m = 1;
	}),
];