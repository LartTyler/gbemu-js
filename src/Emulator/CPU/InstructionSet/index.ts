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
import {JumpOperators} from './Operators/Jump';
import {JumpRelativeOperators} from './Operators/JumpRelative';
import {LoadOperators} from './Operators/Load';
import {MiscOperators} from './Operators/Misc';
import {PopOperators} from './Operators/Stack/Pop';
import {PushOperators} from './Operators/Stack/Push';
import {CallOperators} from './Operators/Subroutine/Call';
import {InterruptOperators} from './Operators/Subroutine/Interrupt';
import {ReturnOperators} from './Operators/Subroutine/Return';
import {SubtractOperators} from './Operators/Subtract';

// @see http://z80-heaven.wikidot.com/opcode-reference-chart
// @see https://rednex.github.io/rgbds/gbz80.7.html
// @see http://www.devrs.com/gb/files/GBCPU_Instr.html
// @see http://pastraiser.com/cpu/gameboy/gameboy_opcodes.html

export const PrimaryInstructions = new InstructionManager([
	...AddOperators,
	...BitwiseOperators,
	...CallOperators,
	...CompareOperators,
	...DecrementOperators,
	...IncrementOperators,
	...InterruptOperators,
	...JumpOperators,
	...JumpRelativeOperators,
	...LoadOperators,
	...MiscOperators,
	...PopOperators,
	...PushOperators,
	...ReturnOperators,
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