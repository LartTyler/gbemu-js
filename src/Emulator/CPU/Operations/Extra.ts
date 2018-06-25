import {OperatorCallback, OperatorSet} from './index';

export interface ExtraOperatorSet extends OperatorSet {
	Noop: OperatorCallback;
}

export const ExtraOperators: ExtraOperatorSet = {
	Noop: hardware => {
		hardware.cpu.registers.m = 1;
	},
};