import {HardwareBusInterface} from '../../Hardware';
import {RegisterFlag} from '../Registers';
import {OperatorCallback, OperatorSet} from './index';

const testMask = (value: number, mask: number) => (value & mask) !== 0;
const testZero = (hardware: HardwareBusInterface) => testMask(hardware.registers.flags, RegisterFlag.ZERO);
const testCarry = (hardware: HardwareBusInterface) => testMask(hardware.registers.flags, RegisterFlag.CARRY);

const absJumpIf = (test: boolean, hardware: HardwareBusInterface) => {
	const {memory, registers} = hardware;

	registers.m = 3;

	if (test) {
		registers.programCount = memory.readWord(registers.programCount);

		++registers.m;
	} else
		registers.programCount += 2;
};

const relJumpIf = (test: boolean, hardware: HardwareBusInterface) => {
	const {memory, registers} = hardware;

	let offset = memory.readByte(registers.programCount++);

	if (offset > 127)
		offset = -((~offset + 1) & 255);

	registers.m = 2;

	if (test) {
		registers.programCount += offset;

		++registers.m;
	}
};

export interface JumpOperatorSet extends OperatorSet {
	AbsoluteJumpToPCAddress: OperatorCallback;
	AbsoluteJumpToHLAddress: OperatorCallback;

	AbsoluteJumpToPCAddressIfCarry: OperatorCallback;
	AbsoluteJumpToPCAddressIfNotCarry: OperatorCallback;
	AbsoluteJumpToPCAddressIfZero: OperatorCallback;
	AbsoluteJumpToPCAddressIfNotZero: OperatorCallback;

	RelativeJumpToPCAddress: OperatorCallback;

	RelativeJumpToPCAddressIfCarry: OperatorCallback;
	RelativeJumpToPCAddressIfNotCarry: OperatorCallback;
	RelativeJumpToPCAddressIfZero: OperatorCallback;
	RelativeJumpToPCAddressIfNotZero: OperatorCallback;

	RelativeJumpToPCAddressDecrementB: OperatorCallback;
}

export const JumpOperators: JumpOperatorSet = {
	AbsoluteJumpToPCAddress: hardware => {
		const registers = hardware.registers;

		registers.programCount = hardware.memory.readWord(registers.programCount);
		registers.m = 3;
	},
	AbsoluteJumpToHLAddress: hardware => {
		const registers = hardware.registers;

		registers.programCount = (registers.h << 8) + registers.l;
		registers.m = 1;
	},

	AbsoluteJumpToPCAddressIfZero: hardware => absJumpIf(testZero(hardware), hardware),
	AbsoluteJumpToPCAddressIfNotZero: hardware => absJumpIf(!testZero(hardware), hardware),
	AbsoluteJumpToPCAddressIfCarry: hardware => absJumpIf(testCarry(hardware), hardware),
	AbsoluteJumpToPCAddressIfNotCarry: hardware => absJumpIf(!testCarry(hardware), hardware),

	RelativeJumpToPCAddress: hardware => relJumpIf(true, hardware),
	RelativeJumpToPCAddressIfCarry: hardware => relJumpIf(testCarry(hardware), hardware),
	RelativeJumpToPCAddressIfNotCarry: hardware => relJumpIf(!testCarry(hardware), hardware),
	RelativeJumpToPCAddressIfZero: hardware => relJumpIf(testZero(hardware), hardware),
	RelativeJumpToPCAddressIfNotZero: hardware => relJumpIf(!testZero(hardware), hardware),

	RelativeJumpToPCAddressDecrementB: hardware => relJumpIf(--hardware.registers.b !== 0, hardware),
};