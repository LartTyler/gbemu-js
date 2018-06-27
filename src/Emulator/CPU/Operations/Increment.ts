import {HardwareBusInterface} from '../../Hardware';
import {RegisterFlag, RegisterKey, RegisterSetInterface} from '../Registers';
import {OperatorCallback, OperatorSet} from './index';

const increment = (name: RegisterKey, registers: RegisterSetInterface) => {
	registers[name] = (registers[name] + 1) & 255;
	registers.flags = registers[name] ? 0 : RegisterFlag.ZERO;

	registers.m = 1;
};

const incrementAddress = (address: number, hardware: HardwareBusInterface) => {
	const memory = hardware.memory;

	const value = (memory.readByte(address) + 1) & 255;

	memory.writeByte(address, value);

	hardware.cpu.registers.flags = value ? 0 : RegisterFlag.ZERO;
	hardware.cpu.registers.m = 3;
};

const increment16 = (highReg: RegisterKey, lowReg: RegisterKey, registers: RegisterSetInterface) => {
	registers[lowReg] = (registers[lowReg] + 1) & 255;

	if (!registers[lowReg])
		registers[highReg] = (registers[highReg] + 1) & 255;

	registers.m = 1;
};

export interface IncrementOperatorSet extends OperatorSet {
	IncrementA: OperatorCallback;
	IncrementB: OperatorCallback;
	IncrementC: OperatorCallback;
	IncrementD: OperatorCallback;
	IncrementE: OperatorCallback;
	IncrementH: OperatorCallback;
	IncrementL: OperatorCallback;

	IncrementHLAddress: OperatorCallback;

	IncrementBC: OperatorCallback;
	IncrementDE: OperatorCallback;
	IncrementHL: OperatorCallback;

	IncrementSP: OperatorCallback;
}

export const IncrementOperators: IncrementOperatorSet = {
	IncrementA: hardware => increment('a', hardware.cpu.registers),
	IncrementB: hardware => increment('b', hardware.cpu.registers),
	IncrementC: hardware => increment('c', hardware.cpu.registers),
	IncrementD: hardware => increment('d', hardware.cpu.registers),
	IncrementE: hardware => increment('e', hardware.cpu.registers),
	IncrementH: hardware => increment('h', hardware.cpu.registers),
	IncrementL: hardware => increment('l', hardware.cpu.registers),

	IncrementHLAddress: hardware => {
		const registers = hardware.cpu.registers;

		incrementAddress((registers.h << 8) + registers.l, hardware);
	},

	IncrementBC: hardware => increment16('b', 'c', hardware.cpu.registers),
	IncrementDE: hardware => increment16('d', 'e', hardware.cpu.registers),
	IncrementHL: hardware => increment16('h', 'l', hardware.cpu.registers),

	IncrementSP: hardware => {
		const registers = hardware.cpu.registers;

		registers.stackPointer = (registers.stackPointer + 1) & 65535;

		registers.m = 1;
	},
};