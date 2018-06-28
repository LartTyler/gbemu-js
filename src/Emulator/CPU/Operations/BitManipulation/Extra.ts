import {RegisterFlag} from '../../Registers';
import {OperatorCallback, OperatorSet} from '../index';

export interface ExtraBitManipOperatorSet extends OperatorSet {
	InvertA: OperatorCallback;
	NegateA: OperatorCallback;

	InvertCarryFlag: OperatorCallback;
	SetCarryFlag: OperatorCallback;
}

export const ExtraBitManipOperatos: ExtraBitManipOperatorSet = {
	InvertA: hardware => {
		const registers = hardware.cpu.registers;

		registers.a ^= 255;
		registers.flags = registers.a ? 0 : RegisterFlag.ZERO;

		registers.m = 1;
	},
	NegateA: hardware => {
		const registers = hardware.cpu.registers;

		registers.a = -registers.a;

		registers.flags = registers.a < 0 ? RegisterFlag.CARRY : 0;

		registers.a &= 255;

		if (!registers.a)
			registers.flags |= RegisterFlag.ZERO;

		registers.m = 2;
	},
	InvertCarryFlag: hardware => {
		const registers = hardware.cpu.registers;

		const ci = registers.flags & RegisterFlag.CARRY ? 0 : 0x10;

		registers.flags = (registers.flags & 0xEF) + ci;

		registers.m = 1;
	},
	SetCarryFlag: hardware => {
		hardware.cpu.registers.flags |= RegisterFlag.CARRY;
		hardware.cpu.registers.m = 1;
	},
};