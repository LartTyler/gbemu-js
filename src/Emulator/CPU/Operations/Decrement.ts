import {HardwareBusInterface} from '../../Hardware';
import {RegisterFlag, RegisterKey, RegisterSetInterface} from '../Registers';
import {OperatorCallback, OperatorSet} from './index';

const decrement = (name: RegisterKey, registers: RegisterSetInterface) => {
	registers[name] = (registers[name] - 1) & 255;
	registers.flags = registers[name] ? 0 : RegisterFlag.ZERO;

	registers.m = 1;
};

const decrementAddress = (address: number, hardware: HardwareBusInterface) => {
	const memory = hardware.memory;

	const value = (memory.readByte(address) - 1) & 255;

	memory.writeByte(address, value);

	hardware.cpu.registers.flags = value ? 0 : RegisterFlag.ZERO;
	hardware.cpu.registers.m = 3;
};

const decrement16 = (highReg: RegisterKey, lowReg: RegisterKey, registers: RegisterSetInterface) => {
	registers[lowReg] = (registers[lowReg] - 1) & 255;

	if (!registers[lowReg])
		registers[highReg] = (registers[highReg] - 1) & 255;

	registers.m = 1;
};

export interface DecrementOperatorSet extends OperatorSet {
	DecrementA: OperatorCallback;
	DecrementB: OperatorCallback;
	DecrementC: OperatorCallback;
	DecrementD: OperatorCallback;
	DecrementE: OperatorCallback;
	DecrementH: OperatorCallback;
	DecrementL: OperatorCallback;

	DecrementHLAddress: OperatorCallback;

	DecrementBC: OperatorCallback;
	DecrementDE: OperatorCallback;
	DecrementHL: OperatorCallback;

	DecrementSP: OperatorCallback;
}

export const DecrementOperators: DecrementOperatorSet = {
	DecrementA: hardware => decrement('a', hardware.cpu.registers),
	DecrementB: hardware => decrement('b', hardware.cpu.registers),
	DecrementC: hardware => decrement('c', hardware.cpu.registers),
	DecrementD: hardware => decrement('d', hardware.cpu.registers),
	DecrementE: hardware => decrement('e', hardware.cpu.registers),
	DecrementH: hardware => decrement('h', hardware.cpu.registers),
	DecrementL: hardware => decrement('l', hardware.cpu.registers),

	DecrementHLAddress: hardware => {
		const registers = hardware.cpu.registers;

		decrementAddress((registers.h << 8) + registers.l, hardware);
	},

	DecrementBC: hardware => decrement16('b', 'c', hardware.cpu.registers),
	DecrementDE: hardware => decrement16('d', 'e', hardware.cpu.registers),
	DecrementHL: hardware => decrement16('h', 'l', hardware.cpu.registers),

	DecrementSP: hardware => {
		const registers = hardware.cpu.registers;

		registers.stackPointer = (registers.stackPointer - 1) & 65535;
		registers.m = 1;
	},
};