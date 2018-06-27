import {RegisterKey, RegisterSetInterface} from '../../Registers';
import {OperatorCallback, OperatorSet} from '../index';

const shiftLeft = (name: RegisterKey, registers: RegisterSetInterface) => {
	const co = registers[name] & 0x80 ? 0x10 : 0;

	registers[name] = (registers[name] << 1) & 255;

	registers.flags = registers[name] ? 0 : 0x80;
	registers.flags = (registers.flags & 0xEF) + co;

	registers.m = 2;
};

const shiftLeftUndoc = (name: RegisterKey, registers: RegisterSetInterface) => {
	const co = registers[name] & 0x80 ? 0x10 : 0;

	registers[name] = ((registers[name] << 1) & 255) + 1;

	registers.flags = registers[name] ? 0 : 0x80;
	registers.flags = (registers.flags & 0xEF) + co;

	registers.m = 2;
};

export interface ShiftLeftOperatorSet extends OperatorSet {
	ShiftLeftA: OperatorCallback;
	ShiftLeftB: OperatorCallback;
	ShiftLeftC: OperatorCallback;
	ShiftLeftD: OperatorCallback;
	ShiftLeftE: OperatorCallback;
	ShiftLeftH: OperatorCallback;
	ShiftLeftL: OperatorCallback;

	ShiftLeftAUndoc: OperatorCallback;
	ShiftLeftBUndoc: OperatorCallback;
	ShiftLeftCUndoc: OperatorCallback;
	ShiftLeftDUndoc: OperatorCallback;
	ShiftLeftEUndoc: OperatorCallback;
	ShiftLeftHUndoc: OperatorCallback;
	ShiftLeftLUndoc: OperatorCallback;
}

export const ShiftLeftOperators: ShiftLeftOperatorSet = {
	ShiftLeftA: hardware => shiftLeft('a', hardware.cpu.registers),
	ShiftLeftB: hardware => shiftLeft('b', hardware.cpu.registers),
	ShiftLeftC: hardware => shiftLeft('c', hardware.cpu.registers),
	ShiftLeftD: hardware => shiftLeft('d', hardware.cpu.registers),
	ShiftLeftE: hardware => shiftLeft('e', hardware.cpu.registers),
	ShiftLeftH: hardware => shiftLeft('h', hardware.cpu.registers),
	ShiftLeftL: hardware => shiftLeft('l', hardware.cpu.registers),

	ShiftLeftAUndoc: hardware => shiftLeftUndoc('a', hardware.cpu.registers),
	ShiftLeftBUndoc: hardware => shiftLeftUndoc('b', hardware.cpu.registers),
	ShiftLeftCUndoc: hardware => shiftLeftUndoc('c', hardware.cpu.registers),
	ShiftLeftDUndoc: hardware => shiftLeftUndoc('d', hardware.cpu.registers),
	ShiftLeftEUndoc: hardware => shiftLeftUndoc('e', hardware.cpu.registers),
	ShiftLeftHUndoc: hardware => shiftLeftUndoc('h', hardware.cpu.registers),
	ShiftLeftLUndoc: hardware => shiftLeftUndoc('l', hardware.cpu.registers),
};