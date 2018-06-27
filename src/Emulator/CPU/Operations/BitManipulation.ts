import {ExtraBitManipOperatorSet, ExtraBitManipOperatos} from './BitManipulation/Extra';
import {ResetOperators, ResetOperatorSet} from './BitManipulation/Reset';
import {RotateLeftOperators, RotateLeftOperatorSet} from './BitManipulation/RotateLeft';
import {RotateRightOperators, RotateRightOperatorSet} from './BitManipulation/RotateRight';
import {SetOperators, SetOperatorSet} from './BitManipulation/Set';
import {ShiftLeftOperators, ShiftLeftOperatorSet} from './BitManipulation/ShiftLeft';
import {ShiftRightOperators, ShiftRightOperatorSet} from './BitManipulation/ShiftRight';
import {TestOperators, TestOperatorSet} from './BitManipulation/Test';
import {OperatorSet} from './index';

export interface BitManipulationOperatorSet extends OperatorSet,
	ExtraBitManipOperatorSet,
	ResetOperatorSet,
	RotateLeftOperatorSet,
	RotateRightOperatorSet,
	SetOperatorSet,
	ShiftLeftOperatorSet,
	ShiftRightOperatorSet,
	TestOperatorSet {
}

export const BitManipulationOperators: BitManipulationOperatorSet = {
	...ExtraBitManipOperatos,
	...ResetOperators,
	...RotateLeftOperators,
	...RotateRightOperators,
	...TestOperators,
	...SetOperators,
	...ShiftLeftOperators,
	...ShiftRightOperators,
};