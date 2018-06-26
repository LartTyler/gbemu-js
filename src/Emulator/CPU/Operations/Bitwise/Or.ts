import {HardwareBusInterface} from '../../../Hardware';
import {RegisterFlag, RegisterSetInterface} from '../../Registers';
import {OperatorCallback, OperatorSet} from '../index';

const or = (value: number, registers: RegisterSetInterface) => {
	registers.a |= value;
	registers.a &= 255;

	registers.flags = registers.a ? 0 : RegisterFlag.ZERO;

	registers.m = 1;
};

const orAddress = (address: number, hardware: HardwareBusInterface) => {
	const registers = hardware.cpu.registers;

	or(hardware.memory.readByte(address), registers);

	registers.m = 2;
};

export interface BitOrOperatorSet extends OperatorSet {
	BitOrA: OperatorCallback;
	BitOrB: OperatorCallback;
	BitOrC: OperatorCallback;
	BitOrD: OperatorCallback;
	BitOrE: OperatorCallback;
	BitOrH: OperatorCallback;
	BitOrL: OperatorCallback;

	BitOrHLAddress: OperatorCallback;
	BitOrPCAddress: OperatorCallback;
}

export const BitOrOperators: BitOrOperatorSet = {
	BitOrA: hardware => or(hardware.cpu.registers.a, hardware.cpu.registers),
	BitOrB: hardware => or(hardware.cpu.registers.b, hardware.cpu.registers),
	BitOrC: hardware => or(hardware.cpu.registers.c, hardware.cpu.registers),
	BitOrD: hardware => or(hardware.cpu.registers.d, hardware.cpu.registers),
	BitOrE: hardware => or(hardware.cpu.registers.e, hardware.cpu.registers),
	BitOrH: hardware => or(hardware.cpu.registers.h, hardware.cpu.registers),
	BitOrL: hardware => or(hardware.cpu.registers.l, hardware.cpu.registers),

	BitOrHLAddress: hardware => {
		const registers = hardware.cpu.registers;

		orAddress((registers.h << 8) + registers.l, hardware);
	},
	BitOrPCAddress: hardware => {
		const registers = hardware.cpu.registers;

		orAddress(registers.programCount++, hardware);
	},
};