import {InstructionManager} from './InstructionManager';
import {LoadOperators} from './Operators/Load';

export const PrimaryInstructions = new InstructionManager([
	...LoadOperators,
]);

export const BitInstructions = new InstructionManager([

]);