import {RegisterKey, RegisterSetInterface} from '../../Registers';
import {OperatorCallback, OperatorSet} from '../index';

const shiftLeft = (name: RegisterKey, registers: RegisterSetInterface, extra: number = 0) => {
	const co = registers[name] & 0x80 ? 0x10 : 0;

	registers[name] = (registers[name] << 1) & 255 + extra;

	registers.flags = registers[name] ? 0 : 0x80;
	registers.flags = (registers.flags & 0xEF) + co;

	registers.m = 2;
};

const shiftLeftLogical = (name: RegisterKey, registers: RegisterSetInterface) => {
	shiftLeft(name, registers, 1);
};

export interface ShiftLeftOperatorSet extends OperatorSet {
	ShiftLeftAArithmetic: OperatorCallback;
	ShiftLeftBArithmetic: OperatorCallback;
	ShiftLeftCArithmetic: OperatorCallback;
	ShiftLeftDArithmetic: OperatorCallback;
	ShiftLeftEArithmetic: OperatorCallback;
	ShiftLeftHArithmetic: OperatorCallback;
	ShiftLeftLArithmetic: OperatorCallback;

	ShiftLeftALogical: OperatorCallback;
	ShiftLeftBLogical: OperatorCallback;
	ShiftLeftCLogical: OperatorCallback;
	ShiftLeftDLogical: OperatorCallback;
	ShiftLeftELogical: OperatorCallback;
	ShiftLeftHLogical: OperatorCallback;
	ShiftLeftLLogical: OperatorCallback;
}

export const ShiftLeftOperators: ShiftLeftOperatorSet = {
	ShiftLeftAArithmetic: hardware => shiftLeft('a', hardware.cpu.registers),
	ShiftLeftBArithmetic: hardware => shiftLeft('b', hardware.cpu.registers),
	ShiftLeftCArithmetic: hardware => shiftLeft('c', hardware.cpu.registers),
	ShiftLeftDArithmetic: hardware => shiftLeft('d', hardware.cpu.registers),
	ShiftLeftEArithmetic: hardware => shiftLeft('e', hardware.cpu.registers),
	ShiftLeftHArithmetic: hardware => shiftLeft('h', hardware.cpu.registers),
	ShiftLeftLArithmetic: hardware => shiftLeft('l', hardware.cpu.registers),

	ShiftLeftALogical: hardware => shiftLeftLogical('a', hardware.cpu.registers),
	ShiftLeftBLogical: hardware => shiftLeftLogical('b', hardware.cpu.registers),
	ShiftLeftCLogical: hardware => shiftLeftLogical('c', hardware.cpu.registers),
	ShiftLeftDLogical: hardware => shiftLeftLogical('d', hardware.cpu.registers),
	ShiftLeftELogical: hardware => shiftLeftLogical('e', hardware.cpu.registers),
	ShiftLeftHLogical: hardware => shiftLeftLogical('h', hardware.cpu.registers),
	ShiftLeftLLogical: hardware => shiftLeftLogical('l', hardware.cpu.registers),
};