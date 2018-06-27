import {ResetOperators, ResetOperatorSet} from './BitManipulation/Reset';
import {SetOperators, SetOperatorSet} from './BitManipulation/Set';
import {TestOperators, TestOperatorSet} from './BitManipulation/Test';
import {OperatorSet} from './index';

export interface BitManipulationOperatorSet extends OperatorSet,
	TestOperatorSet,
	ResetOperatorSet,
	SetOperatorSet {
}

export const BitManipulationOperators: BitManipulationOperatorSet = {
	...ResetOperators,
	...TestOperators,
	...SetOperators,
};