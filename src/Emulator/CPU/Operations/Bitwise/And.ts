import {HardwareBusInterface} from '../../../Hardware';
import {RegisterFlag, RegisterSetInterface} from '../../Registers';
import {OperatorCallback, OperatorSet} from '../index';

const and = (value: number, registers: RegisterSetInterface) => {
	registers.a &= value;
	registers.a &= 255;

	registers.flags = registers.a ? 0 : RegisterFlag.ZERO;

	registers.m = 1;
};

const andAddress = (address: number, hardware: HardwareBusInterface) => {
	const registers = hardware.cpu.registers;

	and(hardware.memory.readByte(address), registers);

	registers.m = 2;
};

export interface BitAndOperatorSet extends OperatorSet {
	BitAndA: OperatorCallback;
	BitAndB: OperatorCallback;
	BitAndC: OperatorCallback;
	BitAndD: OperatorCallback;
	BitAndE: OperatorCallback;
	BitAndH: OperatorCallback;
	BitAndL: OperatorCallback;

	BitAndHLAddress: OperatorCallback;
	BitAndPCAddress: OperatorCallback;
}

export const BitAndOperators: BitAndOperatorSet = {
	BitAndA: hardware => and(hardware.cpu.registers.a, hardware.cpu.registers),
	BitAndB: hardware => and(hardware.cpu.registers.a, hardware.cpu.registers),
	BitAndC: hardware => and(hardware.cpu.registers.a, hardware.cpu.registers),
	BitAndD: hardware => and(hardware.cpu.registers.a, hardware.cpu.registers),
	BitAndE: hardware => and(hardware.cpu.registers.a, hardware.cpu.registers),
	BitAndH: hardware => and(hardware.cpu.registers.a, hardware.cpu.registers),
	BitAndL: hardware => and(hardware.cpu.registers.a, hardware.cpu.registers),

	BitAndHLAddress: hardware => {
		const registers = hardware.cpu.registers;

		andAddress((registers.h << 8) + registers.l, hardware);
	},
	BitAndPCAddress: hardware => {
		const registers = hardware.cpu.registers;

		andAddress(registers.programCount++, hardware);
	},
};