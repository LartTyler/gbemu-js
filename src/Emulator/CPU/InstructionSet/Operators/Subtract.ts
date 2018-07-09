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
		registers.flags = RegisterFlag.CARRY;

	registers.a &= 255;

	if (!registers.a)
		registers.flags |= RegisterFlag.ZERO;

	if ((registers.a ^ originalA ^ originalOther) & 0x10)
		registers.flags |= RegisterFlag.HALF_CARRY;

	registers.m = 1;
};

export const SubtractOperators: OperatorInterface[] = [
	new Operator('SubtractA', 0x97, hardware => subtract('a', hardware)),
];