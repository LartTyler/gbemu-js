import {InstructionManager} from './InstructionManager';
import {AddOperators} from './Operators/Add';
import {ResetOperators} from './Operators/BitManipulation/Reset';
import {
	RotateLeftCarryBitOperators,
	RotateLeftCarryPrimaryOperators,
} from './Operators/BitManipulation/RotateLeftCarry';
import {SetOperators} from './Operators/BitManipulation/Set';
import {SwapOperators} from './Operators/BitManipulation/Swap';
import {TestOperators} from './Operators/BitManipulation/Test';
import {BitwiseOperators} from './Operators/Bitwise';
import {CompareOperators} from './Operators/Compare';
import {DecrementOperators} from './Operators/Decrement';
import {IncrementOperators} from './Operators/Increment';
import {LoadOperators} from './Operators/Load';
import {MiscOperators} from './Operators/Misc';
import {SubtractOperators} from './Operators/Subtract';

// @see http://z80-heaven.wikidot.com/opcode-reference-chart
// @see https://rednex.github.io/rgbds/gbz80.7.html
// @see http://pastraiser.com/cpu/gameboy/gameboy_opcodes.html

export const PrimaryInstructions = new InstructionManager([
	...AddOperators,
	...BitwiseOperators,
	...CompareOperators,
	...DecrementOperators,
	...IncrementOperators,
	...LoadOperators,
	...MiscOperators,
	...RotateLeftCarryPrimaryOperators,
	...SubtractOperators,
]);

export const BitInstructions = new InstructionManager([
	...ResetOperators,
	...RotateLeftCarryBitOperators,
	...SetOperators,
	...SwapOperators,
	...TestOperators,
]);