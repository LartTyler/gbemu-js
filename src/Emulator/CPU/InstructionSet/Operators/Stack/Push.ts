import {HardwareBusInterface} from '../../../../Hardware';
import {RegisterKey} from '../../../Registers';
import {Operator, OperatorInterface} from '../../InstructionManager';

const push = (high: RegisterKey, low: RegisterKey, hardware: HardwareBusInterface): void => {
	const {memory, registers} = hardware;

	memory.writeByte(--registers.stackPointer, registers[high]);
	memory.writeByte(--registers.stackPointer, registers[low]);

	registers.m =  3;
};

export const PushOperators: OperatorInterface[] = [
	new Operator('PushBC', 0xC5, hardware => push('b', 'c', hardware), 'PUSH bc'),
	new Operator('PushDE', 0xD5, hardware => push('d', 'e', hardware), 'PUSH de'),
	new Operator('PushHL', 0xE5, hardware => push('h', 'l', hardware), 'PUSH hl'),
	new Operator('PushAF', 0xF5, hardware => push('a', 'flags', hardware), 'PUSH af'),
];