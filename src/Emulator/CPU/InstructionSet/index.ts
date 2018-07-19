import {InstructionManager} from './InstructionManager';
import {AddOperators} from './Operators/Add';
import {BitManipulationOperators} from './Operators/BitManipulation';
import {BitwiseOperators} from './Operators/Bitwise';
import {CompareOperators} from './Operators/Compare';
import {LoadOperators} from './Operators/Load';
import {MiscOperators} from './Operators/Misc';
import {SubtractOperators} from './Operators/Subtract';

// @see http://z80-heaven.wikidot.com/opcode-reference-chart
// @see https://rednex.github.io/rgbds/gbz80.7.html

export const PrimaryInstructions = new InstructionManager([
	...AddOperators,
	...BitwiseOperators,
	...CompareOperators,
	...LoadOperators,
	...MiscOperators,
	...SubtractOperators,
]);

export const BitInstructions = new InstructionManager([
	...BitManipulationOperators,
]);