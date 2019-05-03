import {HardwareBusInterface} from '../../../../Hardware';
import {RegisterKey} from '../../../Registers';
import {Operator, OperatorInterface} from '../../InstructionManager';

const pop = (high: RegisterKey, low: RegisterKey, hardware: HardwareBusInterface): void => {
	const {memory, registers} = hardware;

	registers[low] = memory.readByte(registers.stackPointer++);
	registers[high] = memory.readByte(registers.stackPointer++);
	registers.m = 3;
};

export const PopOperators: OperatorInterface[] = [
	new Operator('PopBC', 0xC1, hardware => pop('b', 'c', hardware), 'POP bc'),
	new Operator('PopDE', 0xD1, hardware => pop('d', 'e', hardware), 'POP de'),
	new Operator('PopHL', 0xE1, hardware => pop('h', 'l', hardware), 'POP hl'),
	new Operator('PopAF', 0xF1, hardware => pop('a', 'flags', hardware), 'POP af'),
];
