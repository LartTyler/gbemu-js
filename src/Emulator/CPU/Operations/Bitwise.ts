import {BitAndOperators, BitAndOperatorSet} from './Bitwise/And';
import {BitOrOperators, BitOrOperatorSet} from './Bitwise/Or';
import {OperatorSet} from './index';

export interface BitwiseOperatorSet extends OperatorSet,
	BitAndOperatorSet,
	BitOrOperatorSet {
}

export const BitwiseOperators: BitwiseOperatorSet = {
	...BitAndOperators,
	...BitOrOperators,
};