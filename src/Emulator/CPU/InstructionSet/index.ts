import {InstructionManager} from './InstructionManager';
import {LoadOperators} from './Operators/Load';

// @see http://z80-heaven.wikidot.com/opcode-reference-chart

export const PrimaryInstructions = new InstructionManager([
	...LoadOperators,
]);

export const BitInstructions = new InstructionManager([

]);