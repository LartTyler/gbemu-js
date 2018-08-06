import {HardwareBusInterface} from '../../../../Hardware';
import {Operator, OperatorInterface} from '../../InstructionManager';
import {testCarry, testZero} from '../util/tests';

// Because JS (rightly so) won't let us use `return`
const ret = (hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	registers.programCount = hardware.memory.readWord(registers.stackPointer);
	registers.stackPointer += 2;

	registers.m = 3;
};

const retIf = (condition: boolean, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	if (condition)
		ret(hardware);
	else {
		registers.programCount += 2;

		registers.m -= 2;
	}
};

export const ReturnOperators: OperatorInterface[] = [
	new Operator('Return', 0xC9, hardware => ret(hardware)),

	new Operator('ReturnIfZeroReset', 0xC0, hardware => retIf(!testZero(hardware), hardware)),
	new Operator('ReturnIfZeroSet', 0xC8, hardware => retIf(testZero(hardware), hardware)),

	new Operator('ReturnIfCarryReset', 0xD0, hardware => retIf(!testCarry(hardware), hardware)),
	new Operator('ReturnIfCarrySet', 0xD8, hardware => retIf(testCarry(hardware), hardware)),

	new Operator('ReturnInterrupt', 0xD9, hardware => {
		hardware.cpu.allowInterrupts = true;

		ret(hardware);
	}),
];