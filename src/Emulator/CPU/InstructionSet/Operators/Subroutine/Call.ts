import {HardwareBusInterface} from '../../../../Hardware';
import {Operator, OperatorInterface} from '../../InstructionManager';
import {testCarry, testZero} from '../util/tests';

const call = (hardware: HardwareBusInterface): void => {
	const {memory, registers} = hardware;

	registers.stackPointer -= 2;
	memory.writeWord(registers.stackPointer, registers.programCount + 2);

	registers.programCount = memory.readWord(registers.programCount);

	registers.m = 5;
};

const callIf = (condition: boolean, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	if (condition)
		call(hardware);
	else {
		registers.programCount += 2;

		registers.m -= 2;
	}
};

export const CallOperators: OperatorInterface[] = [
	new Operator('Call', 0xCD, hardware => call(hardware), null, 3),

	new Operator('CallIfZeroReset', 0xC4, hardware => callIf(!testZero(hardware), hardware), null, 3),
	new Operator('CallIfZeroSet', 0xCC, hardware => callIf(testZero(hardware), hardware), null, 3),

	new Operator('CallIfCarryReset', 0xD4, hardware => callIf(!testCarry(hardware), hardware), null, 3),
	new Operator('CallIfCarrySet', 0xDC, hardware => callIf(testCarry(hardware), hardware), null, 3),
];
