import {HardwareBusInterface} from '../../../Hardware';
import {RegisterFlag, RegisterSetInterface} from '../../Registers';
import {OperatorCallback, OperatorSet} from '../index';

const xor = (value: number, registers: RegisterSetInterface) => {
	registers.a ^= value;
	registers.a &= 255;

	registers.flags = registers.a ? 0 : RegisterFlag.ZERO;

	registers.m = 1;
};

const xorAddress = (address: number, hardware: HardwareBusInterface) => {
	xor(hardware.memory.readByte(address), hardware.cpu.registers);

	hardware.cpu.registers.m = 2;
};

export interface BitXorOperatorSet extends OperatorSet {
	BitXorA: OperatorCallback;
	BitXorB: OperatorCallback;
	BitXorC: OperatorCallback;
	BitXorD: OperatorCallback;
	BitXorE: OperatorCallback;
	BitXorH: OperatorCallback;
	BitXorL: OperatorCallback;

	BitXorHLAddress: OperatorCallback;
	BitXorPCAddress: OperatorCallback;
}

export const BitXorOperators: BitXorOperatorSet = {
	BitXorA: hardware => xor(hardware.cpu.registers.a, hardware.cpu.registers),
	BitXorB: hardware => xor(hardware.cpu.registers.b, hardware.cpu.registers),
	BitXorC: hardware => xor(hardware.cpu.registers.c, hardware.cpu.registers),
	BitXorD: hardware => xor(hardware.cpu.registers.d, hardware.cpu.registers),
	BitXorE: hardware => xor(hardware.cpu.registers.e, hardware.cpu.registers),
	BitXorH: hardware => xor(hardware.cpu.registers.h, hardware.cpu.registers),
	BitXorL: hardware => xor(hardware.cpu.registers.l, hardware.cpu.registers),

	BitXorHLAddress: hardware => {
		const registers = hardware.cpu.registers;

		xorAddress((registers.h << 8) + registers.l, hardware);
	},
	BitXorPCAddress: hardware => xorAddress(hardware.cpu.registers.programCount++, hardware),
};