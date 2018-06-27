import {BitAndOperators, BitAndOperatorSet} from './Bitwise/And';
import {BitOrOperators, BitOrOperatorSet} from './Bitwise/Or';
import {BitXorOperators, BitXorOperatorSet} from './Bitwise/Xor';
import {OperatorSet} from './index';

export interface BitwiseOperatorSet extends OperatorSet,
	BitAndOperatorSet,
	BitOrOperatorSet,
	BitXorOperatorSet {
}

export const BitwiseOperators: BitwiseOperatorSet = {
	...BitAndOperators,
	...BitOrOperators,
	...BitXorOperators,
};