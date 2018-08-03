import {InstructionManager} from './InstructionManager';
import {AddOperators} from './Operators/Add';
import {ResetOperators} from './Operators/BitManipulation/Reset';
import {
	RotateLeftCarryBitOperators,
	RotateLeftCarryPrimaryOperators,
} from './Operators/BitManipulation/RotateLeftCarry';
import {
	RotateLeftCircularBitOperators,
	RotateLeftCircularPrimaryOperators,
} from './Operators/BitManipulation/RotateLeftCircular';
import {
	RotateRightCarryBitOperators,
	RotateRightCarryPrimaryOperators,
} from './Operators/BitManipulation/RotateRightCarry';
import {
	RotateRightCircularBitOperators,
	RotateRightCircularPrimaryOperators,
} from './Operators/BitManipulation/RotateRightCircular';
import {SetOperators} from './Operators/BitManipulation/Set';
import {ShiftLeftArithmeticOperators} from './Operators/BitManipulation/ShiftLeftArithemetic';
import {ShiftRightArithmeticOperators} from './Operators/BitManipulation/ShiftRightArithmetic';
import {ShiftRightLogicalOperators} from './Operators/BitManipulation/ShiftRightLogical';
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
	...RotateLeftCircularPrimaryOperators,
	...RotateRightCarryPrimaryOperators,
	...RotateRightCircularPrimaryOperators,
	...SubtractOperators,
]);

export const BitInstructions = new InstructionManager([
	...ResetOperators,
	...RotateLeftCarryBitOperators,
	...RotateLeftCircularBitOperators,
	...RotateRightCarryBitOperators,
	...RotateRightCircularBitOperators,
	...SetOperators,
	...ShiftLeftArithmeticOperators,
	...ShiftRightArithmeticOperators,
	...ShiftRightLogicalOperators,
	...SwapOperators,
	...TestOperators,
]);