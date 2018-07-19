import {OperatorInterface} from '../InstructionManager';
import {AndOperators} from './Bitwise/And';
import {OrOperators} from './Bitwise/Or';
import {XorOperators} from './Bitwise/Xor';

export const BitwiseOperators: OperatorInterface[] = [
	...AndOperators,
	...OrOperators,
	...XorOperators,
];