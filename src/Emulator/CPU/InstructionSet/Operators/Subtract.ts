import {HardwareBusInterface} from '../../../Hardware';
import {RegisterFlag, RegisterKey} from '../../Registers';
import {Operator, OperatorInterface} from '../InstructionManager';

const subtract = (key: RegisterKey, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	const originalA = registers.a;
	const originalOther = registers[key];

	registers.flags = RegisterFlag.OPERATION;
	registers.a -= originalOther;

	if (registers.a < 0)
		registers.flags |= RegisterFlag.CARRY;

	registers.a &= 255;

	if (!registers.a)
		registers.flags |= RegisterFlag.ZERO;

	if ((registers.a ^ originalA ^ originalOther) & 0x10)
		registers.flags |= RegisterFlag.HALF_CARRY;

	registers.m = 1;
};

export const SubtractOperators: OperatorInterface[] = [
	// region Subtract registers
	new Operator('SubtractA', 0x97, hardware => subtract('a', hardware)),
	new Operator('SubtractB', 0x90, hardware => subtract('b', hardware)),
	new Operator('SubtractC', 0x91, hardware => subtract('c', hardware)),
	new Operator('SubtractD', 0x92, hardware => subtract('d', hardware)),
	new Operator('SubtractE', 0x93, hardware => subtract('e', hardware)),
	new Operator('SubtractH', 0x94, hardware => subtract('h', hardware)),
	new Operator('SubtractL', 0x95, hardware => subtract('l', hardware)),
	// endregion
];