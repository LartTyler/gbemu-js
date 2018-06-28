import {HardwareBusInterface} from '../../Hardware';
import {OperatorCallback, OperatorSet, testCarry, testZero} from './index';

const returnIf = (test: boolean, hardware: HardwareBusInterface) => {
	const {memory, registers} = hardware;

	registers.m = 1;

	if (test) {
		registers.programCount = memory.readWord(registers.stackPointer);
		registers.stackPointer += 2;

		registers.m += 2;
	}
};

export interface ReturnOperatorSet extends OperatorSet {
	Return: OperatorCallback;
	ReturnIfCarry: OperatorCallback;
	ReturnIfNotCarry: OperatorCallback;
	ReturnIfZero: OperatorCallback;
	ReturnIfNotZero: OperatorCallback;
}

export const ReturnOperators: ReturnOperatorSet = {
	Return: hardware => returnIf(true, hardware),
	ReturnIfCarry: hardware => returnIf(testCarry(hardware), hardware),
	ReturnIfNotCarry: hardware => returnIf(!testCarry(hardware), hardware),
	ReturnIfZero: hardware => returnIf(testZero(hardware), hardware),
	ReturnIfNotZero: hardware => returnIf(!testZero(hardware), hardware),
};