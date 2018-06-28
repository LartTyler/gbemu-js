import {RegisterFlag} from '../Registers';
import {OperatorCallback, OperatorSet} from './index';

export interface ExtraOperatorSet extends OperatorSet {
	BCDCorrect: OperatorCallback;
	ExtraOperators: OperatorCallback;
	Halt: OperatorCallback;
	NoImpl: OperatorCallback;
	NoImplExtra: OperatorCallback;
	Noop: OperatorCallback;
}

export const ExtraOperators: ExtraOperatorSet = {
	BCDCorrect: hardware => {
		const registers = hardware.cpu.registers;

		const original = registers.a;

		if ((registers.flags & RegisterFlag.HALF_CARRY) || (registers.a & 15) > 9)
			registers.a += 6;

		registers.flags &= 0xEF;

		if ((registers.flags & RegisterFlag.HALF_CARRY) || original > 0x99) {
			registers.a += 0x60;
			registers.flags |= RegisterFlag.CARRY;
		}

		registers.m = 1;
	},
	ExtraOperators: hardware => {
		const registers = hardware.registers;

		const i = hardware.memory.readByte(registers.programCount++);
		registers.programCount &= 65535;

		if (hardware.cpu.cbcodes[i])
			hardware.cpu.cbcodes[i](hardware);
		else
			hardware.cpu.operators.NoImplExtra(hardware);
	},
	Halt: hardware => {
		hardware.cpu.halt = true;
		hardware.registers.m = 1;
	},
	NoImpl: hardware => {
		const offset = hardware.cpu.registers.programCount - 1;
		const opcode = hardware.memory.readByte(offset);

		console.error(`Unimplemented instruction 0x${opcode.toString(16).toUpperCase()} at offset 0x${offset.toString(16).toUpperCase()}, stopping`);

		hardware.cpu.stop = true;
	},
	NoImplExtra: hardware => {
		const offset = hardware.cpu.registers.programCount - 1;
		const opcode = hardware.memory.readByte(offset);

		console.error(`Unimplemented extra instruction 0x${opcode.toString(16).toUpperCase()} at offset 0x${offset.toString(16).toUpperCase()}, stopping`);

		hardware.cpu.stop = true;
	},
	Noop: hardware => {
		hardware.cpu.registers.m = 1;
	},

};