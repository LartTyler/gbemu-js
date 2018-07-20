import {HardwareBusInterface} from '../../../Hardware';
import {RegisterFlag, RegisterKey} from '../../Registers';
import {Operator, OperatorInterface} from '../InstructionManager';

const incrementRegister = (key: RegisterKey, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	registers[key] = (registers[key] + 1) & 255;
	registers.flags = registers[key] ? 0 : RegisterFlag.ZERO;

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
];