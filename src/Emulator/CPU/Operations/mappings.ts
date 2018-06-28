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
	operators.LoadBIntoHLAddress, operators.LoadCIntoHLAddress, operators.LoadDIntoHLAddress, operators.LoadEIntoHLAddress,
	operators.LoadHIntoHLAddress, operators.LoadLIntoHLAddress, operators.Halt, operators.LoadAIntoHLAddress,
	operators.LoadRegAB, operators.LoadRegAC, operators.LoadRegAD, operators.LoadRegAE,
	operators.LoadRegAH, operators.LoadRegAL, operators.LoadHLAddressIntoA, operators.LoadRegAA,

	// 0x80
	operators.AddB, operators.AddC, operators.AddD, operators.AddE,
	operators.AddH, operators.AddL, operators.AddHLAddress, operators.AddA,
	operators.AddBWithCarry, operators.AddCWithCarry, operators.AddDWithCarry, operators.AddEWithCarry,
	operators.AddHWithCarry, operators.AddLWithCarry, operators.AddHLAddressWithCarry, operators.AddAWithCarry,

	// 0x90
	operators.SubtractB, operators.SubtractC, operators.SubtractD, operators.SubtractE,
	operators.SubtractH, operators.SubtractL, operators.SubtractHLAddress, operators.SubtractA,
	operators.SubtractBWithCarry, operators.SubtractCWithCarry, operators.SubtractDWithCarry, operators.SubtractEWithCarry,
	operators.SubtractHWithCarry, operators.SubtractLWithCarry, operators.SubtractHLAddressWithCarry, operators.SubtractAWithCarry,

	// 0xA0
	operators.BitAndB, operators.BitAndC, operators.BitAndD, operators.BitAndE,
	operators.BitAndH, operators.BitAndL, operators.BitAndHLAddress, operators.BitAndA,
	operators.BitXorB, operators.BitXorC, operators.BitXorD, operators.BitXorE,
	operators.BitXorH, operators.BitXorL, operators.BitXorHLAddress, operators.BitXorA,

	// 0xB0
	operators.BitOrB, operators.BitOrC, operators.BitOrD, operators.BitOrD,
	operators.BitOrH, operators.BitOrL, operators.BitOrHLAddress, operators.BitOrA,
	operators.SetSubtractBFlags, operators.SetSubtractCFlags, operators.SetSubtractDFlags, operators.SetSubtractEFlags,
	operators.SetSubtractHFlags, operators.SetSubtractLFlags, operators.SetSubtractHLAddressFlags, operators.SetSubtractAFlags,

	// 0xC0
	operators.ReturnIfNotZero, operators.PopBC, operators.AbsoluteJumpToPCAddressIfNotZero, operators.AbsoluteJumpToPCAddress,
	operators.LabelJumpPCAddressIfNotZero, operators.PushBC, operators.AddPCAddress, operators.Interrupt00,
	operators.ReturnIfZero, operators.Return, operators.AbsoluteJumpToPCAddressIfZero, operators.ExtraOperators,
	operators.LabelJumpPCAddressIfZero, operators.LabelJumpPCAddress, operators.AddPCAddressWithCarry, operators.Interrupt08,

	// 0xD0
	operators.ReturnIfNotCarry, operators.PopDE, operators.AbsoluteJumpToPCAddressIfNotCarry, operators.NoImpl,
	operators.LabelJumpPCAddressIfNotCarry, operators.PishDE, operators.SubtractPCAddress, operators.Interrupt10,
	operators.ReturnIfCarry, operators.InterruptReturn, operators.AbsoluteJumpToPCAddressIfCarry, operators.NoImpl,
	operators.LabelJumpPCAddressIfCarry, operators.NoImpl, operators.SubtractPCAddressWithCarry, operators.Interrupt18,

	// 0xE0
	operators.LoadAIntoPCWithMagicAddress, operators.PopHL, operators.LoadAIntoCWithMagicAddress, operators.NoImpl,
	operators.NoImpl, operators.PushHL, operators.BitAndPCAddress, operators.Interrupt20,
	operators.AddPCAddressToSP, operators.AbsoluteJumpToHLAddress, operators.LoadAIntoPCAddress, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.BitXorPCAddress, operators.Interrupt28,

	// 0xF0
	operators.LoadPCWithMagicIntoA, operators.PopAF, operators.LoadCWithMagicAddressIntoA, operators.InterruptDisable,
	operators.NoImpl, operators.PushAF, operators.BitOrPCAddress, operators.Interrupt30,
	operators.SomeCrazyShitWithHLAndSP, operators.NoImpl, operators.LoadPCWordIntoA, operators.InterruptEnable,
	operators.NoImpl, operators.NoImpl, operators.SetSubtractPCAddressFlags, operators.Interrupt38,
];

export const toCbcodeMap = (operators: CompoundOperatorSet): OperatorCallback[] => [
	// CB 0x00
	operators.RotateLeftBWithCarry, operators.RotateLeftCWithCarry, operators.RotateLeftDWithCarry, operators.RotateLeftEWithCarry,
	operators.RotateLeftHWithCarry, operators.RotateLeftLWithCarry, operators.RotateLeftHLAddressWithCarry, operators.RotateLeftHLAddressWithCarry,
	operators.RotateRightBWithCarry, operators.RotateRightCWithCarry, operators.RotateRightDWithCarry, operators.RotateRightEWithCarry,
	operators.RotateRightHLAddressWithCarry, operators.RotateRightLWithCarry, operators.RotateRightHLAddressWithCarry, operators.RotateRightAWithCarry,

	// CB 0x10
	operators.RotateLeftB, operators.RotateLeftC, operators.RotateLeftD, operators.RotateLeftE,
	operators.RotateLeftH, operators.RotateLeftL, operators.RotateLeftHLAddress, operators.RotateLeftA,
	operators.RotateRightB, operators.RotateRightC, operators.RotateRightD, operators.RotateRightE,
	operators.RotateRightH, operators.RotateRightL, operators.RotateRightHLAddress, operators.RotateRightA,

	// CB 0x20
	operators.ShiftLeftBArithmetic, operators.ShiftLeftCArithmetic, operators.ShiftLeftDArithmetic, operators.ShiftLeftEArithmetic,
	operators.ShiftLeftHArithmetic, operators.ShiftLeftLArithmetic, operators.NoImplExtra, operators.ShiftLeftAArithmetic,
	operators.ShiftRightBArithmetic, operators.ShiftRightCArithmetic, operators.ShiftRightDArithmetic, operators.ShiftRightEArithmetic,
	operators.ShiftRightHArithmetic, operators.ShiftRightLArithmetic, operators.NoImplExtra, operators.ShiftRightAArithmetic,

	// CB 0x30
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,

	// CB 0x40
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,

	// CB 0x50
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,

	// CB 0x60
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,

	// CB 0x70
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,

	// CB 0x80
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,

	// CB 0x90
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,

	// CB 0xA0
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,

	// CB 0xB0
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,

	// CB 0xC0
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,

	// CB 0xD0
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,

	// CB 0xE0
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,

	// CB 0xF0
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
	operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra, operators.NoImplExtra,
];