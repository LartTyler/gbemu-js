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
	new Operator('Return', 0xC9, hardware => ret(hardware), 'RET', 3),

	new Operator('ReturnIfZeroReset', 0xC0, hardware => retIf(!testZero(hardware), hardware), 'RET NZ', 3),
	new Operator('ReturnIfZeroSet', 0xC8, hardware => retIf(testZero(hardware), hardware), 'RET Z', 3),

	new Operator('ReturnIfCarryReset', 0xD0, hardware => retIf(!testCarry(hardware), hardware), 'RET NC', 3),
	new Operator('ReturnIfCarrySet', 0xD8, hardware => retIf(testCarry(hardware), hardware), 'RET C', 3),

	new Operator('ReturnInterrupt', 0xD9, hardware => {
		hardware.cpu.allowInterrupts = true;
		hardware.registers.restore();

		ret(hardware);
	}, 'RETI', 3),
];
