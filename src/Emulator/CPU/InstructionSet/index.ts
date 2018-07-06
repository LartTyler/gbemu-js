import {InstructionManager} from './InstructionManager';
import {AddOperators} from './Operators/Add';
import {BitManipulationOperators} from './Operators/BitManipulation';
import {LoadOperators} from './Operators/Load';
import {MiscOperators} from './Operators/Misc';

// @see http://z80-heaven.wikidot.com/opcode-reference-chart
// @see https://rednex.github.io/rgbds/gbz80.7.html

export const PrimaryInstructions = new InstructionManager([
	...AddOperators,
	...LoadOperators,
	...MiscOperators,
]);

export const BitInstructions = new InstructionManager([
	...BitManipulationOperators,
]);