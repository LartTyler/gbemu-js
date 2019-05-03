import {HardwareBusInterface} from '../../../Hardware';
import {pairTo16Bit} from '../../../util';
import {Operator, OperatorInterface} from '../InstructionManager';
import {testCarry, testZero} from './util/tests';

const jumpIf = (condition: boolean, hardware: HardwareBusInterface): void => {
	const {memory, registers} = hardware;

	registers.m = 3;

	if (condition) {
		registers.programCount = memory.readWord(registers.programCount);

		++registers.m;
	} else
		registers.programCount += 2;
};

export const JumpOperators: OperatorInterface[] = [
	new Operator('Jump', 0xC3, hardware => {
		const registers = hardware.registers;

		registers.programCount = hardware.memory.readWord(registers.programCount);
		registers.m = 3;
	}),
	new Operator('JumpHL', 0xE9, hardware => {
		const registers = hardware.registers;

		registers.programCount = pairTo16Bit(registers.h, registers.l);
		registers.m = 1;
	}),

	new Operator('JumpIfZeroReset', 0xC2, hardware => jumpIf(!testZero(hardware), hardware), null, 3),
	new Operator('JumpIfZeroSet', 0xCA, hardware => jumpIf(testZero(hardware), hardware), null, 3),

	new Operator('JumpIfCarryReset', 0xD2, hardware => jumpIf(!testCarry(hardware), hardware), null, 3),
	new Operator('JumpIfCarrySet', 0xDA, hardware => jumpIf(testCarry(hardware), hardware), null, 3),
];
