import {HardwareBusInterface} from '../../../Hardware';
import {Operator, OperatorInterface} from '../InstructionManager';
import {testCarry, testZero} from './util/tests';

const jump = (hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	let offset = hardware.memory.readByte(registers.programCount++);

	if (offset > 127)
		offset = -((~offset + 1) & 255);

	registers.programCount += offset;
};

const jumpIf = (condition: boolean, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	registers.m = 2;

	if (condition) {
		jump(hardware);

		++registers.m;
	} else
		++registers.programCount;
};

export const JumpRelativeOperators: OperatorInterface[] = [
	new Operator('JumpRelative', 0x18, hardware => jumpIf(true, hardware)),

	new Operator('JumpRelativeIfZeroReset', 0x20, hardware => jumpIf(!testZero(hardware), hardware)),
	new Operator('JumpRelativeIfZeroSet', 0x28, hardware => jumpIf(testZero(hardware), hardware)),

	new Operator('JumpRelativeIfCarryReset', 0x30, hardware => jumpIf(!testCarry(hardware), hardware)),
	new Operator('JumpRelativeIfCarrySet', 0x38, hardware => jumpIf(testCarry(hardware), hardware)),
];