import {OperatorCallback, OperatorSet} from './index';

export interface ExtraOperatorSet extends OperatorSet {
	Noop: OperatorCallback;
	NoImpl: OperatorCallback;
}

export const ExtraOperators: ExtraOperatorSet = {
	Noop: hardware => {
		hardware.cpu.registers.m = 1;
	},
	NoImpl: hardware => {
		const opcode = hardware.cpu.registers.programCount - 1;

		console.error(`Unimplemented instruction at ${opcode.toString(16)}, stopping`);

		hardware.cpu.stop = true;
	},
};