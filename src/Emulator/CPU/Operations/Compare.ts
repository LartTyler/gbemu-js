import {RegisterFlag, RegisterSetInterface} from '../Registers';
import {OperatorCallback, OperatorSet} from './index';

const registerCompare = (value: number, registers: RegisterSetInterface) => {
	const i = registers.a - value;

	registers.flags |= RegisterFlag.OPERATION;

	if (!(i & 255))
		registers.flags |= RegisterFlag.ZERO;

	if (i < 255)
		registers.flags |= RegisterFlag.CARRY;

	registers.m = 1;
};

export interface CompareOperatorSet extends OperatorSet {
	Compare_RegisterA: OperatorCallback;
	Compare_RegisterB: OperatorCallback;
	Compare_RegisterC: OperatorCallback;
	Compare_RegisterD: OperatorCallback;
	Compare_RegisterE: OperatorCallback;
	Compare_RegisterH: OperatorCallback;
	Compare_RegisterL: OperatorCallback;
}

export const CompareOperators: CompareOperatorSet = {
	Compare_RegisterA: hardware => registerCompare(hardware.cpu.registers.a, hardware.cpu.registers),
	Compare_RegisterB: hardware => registerCompare(hardware.cpu.registers.b, hardware.cpu.registers),
	Compare_RegisterC: hardware => registerCompare(hardware.cpu.registers.c, hardware.cpu.registers),
	Compare_RegisterD: hardware => registerCompare(hardware.cpu.registers.d, hardware.cpu.registers),
	Compare_RegisterE: hardware => registerCompare(hardware.cpu.registers.e, hardware.cpu.registers),
	Compare_RegisterH: hardware => registerCompare(hardware.cpu.registers.h, hardware.cpu.registers),
	Compare_RegisterL: hardware => registerCompare(hardware.cpu.registers.l, hardware.cpu.registers),
};