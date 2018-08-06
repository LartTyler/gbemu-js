import {HardwareBusInterface} from '../../../../Hardware';
import {RegisterFlag, RegisterKey} from '../../../Registers';
import {Operator, OperatorInterface} from '../../InstructionManager';

const swap = (target: RegisterKey, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	registers[target] = ((registers[target] & 0xF) << 4) | ((registers[target] & 0xF0) >> 4);

	registers.flags = registers[target] ? 0 : RegisterFlag.ZERO;
	registers.m = 1;
};

export const SwapOperators: OperatorInterface[] = [
	new Operator('SwapRegisterANibbles', 0x37, hardware => swap('a', hardware), 'SWAP a'),
	new Operator('SwapRegisterBNibbles', 0x30, hardware => swap('b', hardware), 'SWAP b'),
	new Operator('SwapRegisterCNibbles', 0x31, hardware => swap('c', hardware), 'SWAP c'),
	new Operator('SwapRegisterDNibbles', 0x32, hardware => swap('d', hardware), 'SWAP d'),
	new Operator('SwapRegisterENibbles', 0x33, hardware => swap('e', hardware), 'SWAP e'),
	new Operator('SwapRegisterHNibbles', 0x34, hardware => swap('h', hardware), 'SWAP h'),
	new Operator('SwapRegisterLNibbles', 0x35, hardware => swap('l', hardware), 'SWAP l'),
];