import {RegisterFlag, RegisterSetInterface} from '../Registers';
import {OperatorCallback, OperatorSet} from './index';

const registerAdd = (value: number, registers: RegisterSetInterface) => {
	registers.a += value;
	registers.flags = 0;

	if (!(registers.a & 255))
		registers.flags |= RegisterFlag.ZERO;

	if (registers.a > 255)
		registers.flags |= RegisterFlag.CARRY;

	registers.a &= 255;
	registers.m = 1;
};

export interface AddOperatorSet extends OperatorSet {
	Add_RegisterA: OperatorCallback;
	Add_RegisterB: OperatorCallback;
	Add_RegisterC: OperatorCallback;
	Add_RegisterD: OperatorCallback;
	Add_RegisterE: OperatorCallback;
	Add_RegisterH: OperatorCallback;
	Add_RegisterL: OperatorCallback;
}

export const AddOperators: AddOperatorSet = {
	Add_RegisterA: hardware => registerAdd(hardware.cpu.registers.a, hardware.cpu.registers),
	Add_RegisterB: hardware => registerAdd(hardware.cpu.registers.b, hardware.cpu.registers),
	Add_RegisterC: hardware => registerAdd(hardware.cpu.registers.c, hardware.cpu.registers),
	Add_RegisterD: hardware => registerAdd(hardware.cpu.registers.d, hardware.cpu.registers),
	Add_RegisterE: hardware => registerAdd(hardware.cpu.registers.e, hardware.cpu.registers),
	Add_RegisterH: hardware => registerAdd(hardware.cpu.registers.h, hardware.cpu.registers),
	Add_RegisterL: hardware => registerAdd(hardware.cpu.registers.l, hardware.cpu.registers),
};