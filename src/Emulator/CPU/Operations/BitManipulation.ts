import {ResetOperators, ResetOperatorSet} from './BitManipulation/Reset';
import {RotateLeftOperators, RotateLeftOperatorSet} from './BitManipulation/RotateLeft';
import {RotateRightOperators, RotateRightOperatorSet} from './BitManipulation/RotateRight';
import {SetOperators, SetOperatorSet} from './BitManipulation/Set';
import {ShiftLeftOperators, ShiftLeftOperatorSet} from './BitManipulation/ShiftLeft';
import {TestOperators, TestOperatorSet} from './BitManipulation/Test';
import {OperatorSet} from './index';

export interface BitManipulationOperatorSet extends OperatorSet,
	TestOperatorSet,
	ResetOperatorSet,
	RotateLeftOperatorSet,
	RotateRightOperatorSet,
	SetOperatorSet,
	ShiftLeftOperatorSet {
}

export const BitManipulationOperators: BitManipulationOperatorSet = {
	...ResetOperators,
	...RotateLeftOperators,
	...RotateRightOperators,
	...TestOperators,
	...SetOperators,
	...ShiftLeftOperators,
};