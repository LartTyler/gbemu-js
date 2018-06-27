import {HardwareBusInterface} from '../../Hardware';
import {RegisterKey} from '../Registers';
import {OperatorCallback, OperatorSet} from './index';

const push = (highReg: RegisterKey, lowReg: RegisterKey, hardware: HardwareBusInterface) => {
	const {memory, registers} = hardware;

	memory.writeByte(--registers.stackPointer, registers[highReg]);
	memory.writeByte(--registers.stackPointer, registers[lowReg]);

	registers.m = 3;
};

const pop = (highReg: RegisterKey, lowReg: RegisterKey, hardware: HardwareBusInterface) => {
	const {memory, registers} = hardware;

	registers[lowReg] = memory.readByte(registers.stackPointer++);
	registers[highReg] = memory.readByte(registers.stackPointer++);

	registers.m = 3;
};

export interface StackOperatorSet extends OperatorSet {
	PushBC: OperatorCallback;
	PushDE: OperatorCallback;
	PushHL: OperatorCallback;

	PopBC: OperatorCallback;
	PopDE: OperatorCallback;
	PopHL: OperatorCallback;
	PopAF: OperatorCallback;
}

export const StackOperators: StackOperatorSet = {
	PushBC: hardware => push('b', 'c', hardware),
	PushDE: hardware => push('d', 'e', hardware),
	PushHL: hardware => push('h', 'l', hardware),

	PopBC: hardware => pop('b', 'c', hardware),
	PopDE: hardware => pop('d', 'e', hardware),
	PopHL: hardware => pop('h', 'l', hardware),
	PopAF: hardware => pop('a', 'flags', hardware),
};