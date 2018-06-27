import {RegisterKey, RegisterSetInterface} from '../../Registers';
import {OperatorCallback, OperatorSet} from '../index';

const shiftRight = (name: RegisterKey, registers: RegisterSetInterface) => {
	const ci = registers[name] & 0x80;
	const co = registers[name] & 1 ? 0x10 : 0;

	registers[name] = ((registers[name] >> 1) + ci) & 255;

	registers.flags = registers[name] ? 0 : 0x80;
	registers.flags = (registers.flags & 0xEF) + co;

	registers.m = 2;
};

const shiftRightLogical = (name: RegisterKey, registers: RegisterSetInterface) => {
	const co = registers[name] & 1 ? 0x10 : 0;

	registers[name] = (registers[name] >> 1) & 255;

	registers.flags = registers[name] ? 0 : 0x80;
	registers.flags = (registers.flags & 0xEF) + co;

	registers.m = 2;
};

export interface ShiftRightOperatorSet extends OperatorSet {
	ShiftRightAArithmetic: OperatorCallback;
	ShiftRightBArithmetic: OperatorCallback;
	ShiftRightCArithmetic: OperatorCallback;
	ShiftRightDArithmetic: OperatorCallback;
	ShiftRightEArithmetic: OperatorCallback;
	ShiftRightHArithmetic: OperatorCallback;
	ShiftRightLArithmetic: OperatorCallback;

	ShiftRightALogical: OperatorCallback;
	ShiftRightBLogical: OperatorCallback;
	ShiftRightCLogical: OperatorCallback;
	ShiftRightDLogical: OperatorCallback;
	ShiftRightELogical: OperatorCallback;
	ShiftRightHLogical: OperatorCallback;
	ShiftRightLLogical: OperatorCallback;
}

export const ShiftRightOperators: ShiftRightOperatorSet = {
	ShiftRightAArithmetic: hardware => shiftRight('a', hardware.cpu.registers),
	ShiftRightBArithmetic: hardware => shiftRight('b', hardware.cpu.registers),
	ShiftRightCArithmetic: hardware => shiftRight('c', hardware.cpu.registers),
	ShiftRightDArithmetic: hardware => shiftRight('d', hardware.cpu.registers),
	ShiftRightEArithmetic: hardware => shiftRight('e', hardware.cpu.registers),
	ShiftRightHArithmetic: hardware => shiftRight('h', hardware.cpu.registers),
	ShiftRightLArithmetic: hardware => shiftRight('l', hardware.cpu.registers),

	ShiftRightALogical: hardware => shiftRightLogical('a', hardware.cpu.registers),
	ShiftRightBLogical: hardware => shiftRightLogical('b', hardware.cpu.registers),
	ShiftRightCLogical: hardware => shiftRightLogical('c', hardware.cpu.registers),
	ShiftRightDLogical: hardware => shiftRightLogical('d', hardware.cpu.registers),
	ShiftRightELogical: hardware => shiftRightLogical('e', hardware.cpu.registers),
	ShiftRightHLogical: hardware => shiftRightLogical('h', hardware.cpu.registers),
	ShiftRightLLogical: hardware => shiftRightLogical('l', hardware.cpu.registers),
};