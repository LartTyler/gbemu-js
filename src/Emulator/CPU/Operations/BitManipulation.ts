import {ResetOperators, ResetOperatorSet} from './BitManipulation/Reset';
import {RotateLeftOperators, RotateLeftOperatorSet} from './BitManipulation/RotateLeft';
import {SetOperators, SetOperatorSet} from './BitManipulation/Set';
import {TestOperators, TestOperatorSet} from './BitManipulation/Test';
import {OperatorSet} from './index';

export interface BitManipulationOperatorSet extends OperatorSet,
	TestOperatorSet,
	ResetOperatorSet,
	RotateLeftOperatorSet,
	SetOperatorSet {
}

export const BitManipulationOperators: BitManipulationOperatorSet = {
	...ResetOperators,
	...RotateLeftOperators,
	...TestOperators,
	...SetOperators,
};