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
	operators.SwapNibblesB, operators.SwapNibblesC, operators.SwapNibblesD, operators.SwapNibblesE,
	operators.SwapNibblesH, operators.SwapNibblesL, operators.NoImplExtra, operators.SwapNibblesA,
	operators.ShiftRightBLogical, operators.ShiftRightCLogical, operators.ShiftRightDLogical, operators.ShiftRightELogical,
	operators.ShiftRightHLogical, operators.ShiftRightLLogical, operators.NoImplExtra, operators.ShiftRightALogical,

	// CB 0x40
	operators.TestBBit0, operators.TestCBit0, operators.TestDBit0, operators.TestEBit0,
	operators.TestHBit0, operators.TestLBit0, operators.TestHLAddressBit0, operators.TestABit0,
	operators.TestBBit1, operators.TestCBit1, operators.TestDBit1, operators.TestEBit1,
	operators.TestHBit1, operators.TestLBit1, operators.TestHLAddressBit1, operators.TestABit1,

	// CB 0x50
	operators.TestBBit2, operators.TestCBit2, operators.TestDBit2, operators.TestEBit2,
	operators.TestHBit2, operators.TestLBit2, operators.TestHLAddressBit2, operators.TestABit2,
	operators.TestBBit3, operators.TestCBit3, operators.TestDBit3, operators.TestEBit3,
	operators.TestHBit3, operators.TestLBit3, operators.TestHLAddressBit3, operators.TestABit3,

	// CB 0x60
	operators.TestBBit4, operators.TestCBit4, operators.TestDBit4, operators.TestEBit4,
	operators.TestHBit4, operators.TestLBit4, operators.TestHLAddressBit4, operators.TestABit4,
	operators.TestBBit5, operators.TestCBit5, operators.TestDBit5, operators.TestEBit5,
	operators.TestHBit5, operators.TestLBit5, operators.TestHLAddressBit5, operators.TestABit5,

	// CB 0x70
	operators.TestBBit6, operators.TestCBit6, operators.TestDBit6, operators.TestEBit6,
	operators.TestHBit6, operators.TestLBit6, operators.TestHLAddressBit6, operators.TestABit6,
	operators.TestBBit7, operators.TestCBit7, operators.TestDBit7, operators.TestEBit7,
	operators.TestHBit7, operators.TestLBit7, operators.TestHLAddressBit7, operators.TestABit7,

	// CB 0x80
	operators.ResetBBit0, operators.ResetCBit0, operators.ResetDBit0, operators.ResetEBit0,
	operators.ResetHBit0, operators.ResetLBit0, operators.ResetHLAddressBit0, operators.ResetABit0,
	operators.ResetBBit1, operators.ResetCBit1, operators.ResetDBit1, operators.ResetEBit1,
	operators.ResetHBit1, operators.ResetLBit1, operators.ResetHLAddressBit1, operators.ResetABit1,

	// CB 0x90
	operators.ResetBBit2, operators.ResetCBit2, operators.ResetDBit2, operators.ResetEBit2,
	operators.ResetHBit2, operators.ResetLBit2, operators.ResetHLAddressBit2, operators.ResetABit2,
	operators.ResetBBit3, operators.ResetCBit3, operators.ResetDBit3, operators.ResetEBit3,
	operators.ResetHBit3, operators.ResetLBit3, operators.ResetHLAddressBit3, operators.ResetABit3,

	// CB 0xA0
	operators.ResetBBit4, operators.ResetCBit4, operators.ResetDBit4, operators.ResetEBit4,
	operators.ResetHBit4, operators.ResetLBit4, operators.ResetHLAddressBit4, operators.ResetABit4,
	operators.ResetBBit5, operators.ResetCBit5, operators.ResetDBit5, operators.ResetEBit5,
	operators.ResetHBit5, operators.ResetLBit5, operators.ResetHLAddressBit5, operators.ResetABit5,

	// CB 0xB0
	operators.ResetBBit6, operators.ResetCBit6, operators.ResetDBit6, operators.ResetEBit6,
	operators.ResetHBit6, operators.ResetLBit6, operators.ResetHLAddressBit6, operators.ResetABit6,
	operators.ResetBBit7, operators.ResetCBit7, operators.ResetDBit7, operators.ResetEBit7,
	operators.ResetHBit7, operators.ResetLBit7, operators.ResetHLAddressBit7, operators.ResetABit7,

	// CB 0xC0
	operators.SetBBit0, operators.SetCBit0, operators.SetDBit0, operators.SetEBit0,
	operators.SetHBit0, operators.SetLBit0, operators.SetHLAddressBit0, operators.SetABit0,
	operators.SetBBit1, operators.SetCBit1, operators.SetDBit1, operators.SetEBit1,
	operators.SetHBit1, operators.SetLBit1, operators.SetHLAddressBit1, operators.SetABit1,

	// CB 0xD0
	operators.SetBBit2, operators.SetCBit2, operators.SetDBit2, operators.SetEBit2,
	operators.SetHBit2, operators.SetLBit2, operators.SetHLAddressBit2, operators.SetABit2,
	operators.SetBBit3, operators.SetCBit3, operators.SetDBit3, operators.SetEBit3,
	operators.SetHBit3, operators.SetLBit3, operators.SetHLAddressBit3, operators.SetABit3,

	// CB 0xE0
	operators.SetBBit4, operators.SetCBit4, operators.SetDBit4, operators.SetEBit4,
	operators.SetHBit4, operators.SetLBit4, operators.SetHLAddressBit4, operators.SetABit4,
	operators.SetBBit5, operators.SetCBit5, operators.SetDBit5, operators.SetEBit5,
	operators.SetHBit5, operators.SetLBit5, operators.SetHLAddressBit5, operators.SetABit5,

	// CB 0xF0
	operators.SetBBit6, operators.SetCBit6, operators.SetDBit6, operators.SetEBit6,
	operators.SetHBit6, operators.SetLBit6, operators.SetHLAddressBit6, operators.SetABit6,
	operators.SetBBit7, operators.SetCBit7, operators.SetDBit7, operators.SetEBit7,
	operators.SetHBit7, operators.SetLBit7, operators.SetHLAddressBit7, operators.SetABit7,
];