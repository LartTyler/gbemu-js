import {CompoundOperatorSet} from '../index';
import {OperatorCallback} from './index';

export const toOpcodeMap = (operators: CompoundOperatorSet): OperatorCallback[] => [
	// 0x00
	operators.Noop, operators.LoadPCAndNextIntoBC, operators.LoadAIntoBCAddress, operators.IncrementBC,
	operators.IncrementB, operators.DecrementB, operators.LoadPCToB_Advance, operators.RotateLeftAWithCarry,
	operators.LoadPCAndNextIntoSP, operators.AddBCToHL, operators.LoadBCAddressIntoA, operators.DecrementBC,
	operators.IncrementC, operators.DecrementC, operators.LoadPCToC_Advance, operators.RotateRightAWithCarry,

	// 0x10
	operators.RelativeJumpToPCAddressDecrementB, operators.LoadPCAndNextIntoDE, operators.LoadDEAddressIntoA, operators.IncrementDE,
	operators.IncrementD, operators.DecrementH, operators.LoadPCToD_Advance, operators.RotateLeftA,
	operators.RelativeJumpToPCAddress, operators.AddDEToHL, operators.LoadDEAddressIntoA, operators.DecrementDE,
	operators.IncrementE, operators.DecrementE, operators.LoadPCToE_Advance, operators.RotateRightA,

	// 0x20
	operators.RelativeJumpToPCAddressIfNotZero, operators.LoadPCAndNextIntoHL, operators.LoadAIntoHLAddressAndIncrement, operators.IncrementHL,
	operators.IncrementH, operators.DecrementH, operators.LoadPCToH_Advance, operators.BCDCorrect,
	operators.RelativeJumpToPCAddressIfZero, operators.AddHLToHL, operators.LoadHLAddressIntoAAndIncrement, operators.DecrementHL,
	operators.IncrementL, operators.DecrementL, operators.LoadPCToL_Advance, operators.InvertA,

	// 0x30
	operators.RelativeJumpToPCAddressIfNotCarry, operators.LoadPCAndNextIntoSP, operators.LoadAIntoHLAddressAndDecrement, operators.IncrementSP,
	operators.IncrementHLAddress, operators.DecrementHLAddress, operators.LoadPCIntoHLAddress, operators.SetCarryFlag,
	operators.RelativeJumpToPCAddressIfCarry, operators.AddSPToHL, operators.LoadHLAddressIntoAAndDecrement, operators.DecrementSP,
	operators.IncrementA, operators.DecrementA, operators.LoadPCToA_Advance, operators.InvertCarryFlag,

	// 0x40
	operators.LoadRegBB, operators.LoadRegBC, operators.LoadRegBD, operators.LoadRegBE,
	operators.LoadRegBH, operators.LoadRegBL, operators.LoadHLAddressIntoB, operators.LoadRegBA,
	operators.LoadRegCB, operators.LoadRegCC, operators.LoadRegCD, operators.LoadRegCE,
	operators.LoadRegCH, operators.LoadRegCL, operators.LoadHLAddressIntoC, operators.LoadRegCA,

	// 0x50
	operators.LoadRegDB, operators.LoadRegDC, operators.LoadRegDD, operators.LoadRegDE,
	operators.LoadRegDH, operators.LoadRegDL, operators.LoadHLAddressIntoD, operators.LoadRegDA,
	operators.LoadRegEB, operators.LoadRegEC, operators.LoadRegED, operators.LoadRegEE,
	operators.LoadRegEH, operators.LoadRegEL, operators.LoadHLAddressIntoE, operators.LoadRegEA,

	// 0x60
	operators.LoadRegHB, operators.LoadRegHC, operators.LoadRegHD, operators.LoadRegHE,
	operators.LoadRegHH, operators.LoadRegHL, operators.LoadHLAddressIntoH, operators.LoadRegHA,
	operators.LoadRegLB, operators.LoadRegLC, operators.LoadRegLD, operators.LoadRegLE,
	operators.LoadRegLH, operators.LoadRegLL, operators.LoadHLAddressIntoL, operators.LoadRegLA,

	// 0x70
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,

	// 0x80
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,

	// 0x90
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,

	// 0xA0
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.BitXorA,

	// 0xB0
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,

	// 0xC0
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,

	// 0xD0
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,

	// 0xE0
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,

	// 0xF0
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.SetSubtractPCAddressFlags, operators.NoImpl,
];

export const toCbcodeMap = (operators: CompoundOperatorSet): OperatorCallback[] => [
	// CB 0x00
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,

	// CB 0x10
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,

	// CB 0x30
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,

	// CB 0x40
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,

	// CB 0x50
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,

	// CB 0x60
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,

	// CB 0x70
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,

	// CB 0x80
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,

	// CB 0x90
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,

	// CB 0xA0
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,

	// CB 0xB0
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,

	// CB 0xC0
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,

	// CB 0xD0
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,

	// CB 0xE0
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,

	// CB 0xF0
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
];