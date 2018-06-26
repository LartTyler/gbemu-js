import {CompoundOperatorSet} from '../index';
import {OperatorCallback} from './index';

export const toOpcodeMap = (operators: CompoundOperatorSet): OperatorCallback[] => [
	// 0x00
	operators.Noop, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,

	// 0x10
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,

	// 0x30
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,

	// 0x40
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,

	// 0x50
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,

	// 0x60
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,

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
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,

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
	operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,
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