import {InstructionManager} from './InstructionManager';
import {BitManipulationOperators} from './Operators/BitManipulation';
import {LoadOperators} from './Operators/Load';
import {MiscOperators} from './Operators/Misc';

// @see http://z80-heaven.wikidot.com/opcode-reference-chart

export const PrimaryInstructions = new InstructionManager([
	...LoadOperators,
	...MiscOperators,
]);

export const BitInstructions = new InstructionManager([
	...BitManipulationOperators,
]);