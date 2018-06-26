import {RegisterKey, RegisterSetInterface} from '../../Registers';
import {OperatorCallback, OperatorSet} from '../index';

const swap = (register: RegisterKey, registers: RegisterSetInterface) => {
	const value = registers[register];

	registers[register] = ((value & 0xF) << 4) | ((value & 0xF0) >> 4);
};

export interface SwapOperatorSet extends OperatorSet {
	SwapNibblesA: OperatorCallback;
	SwapNibblesB: OperatorCallback;
	SwapNibblesC: OperatorCallback;
	SwapNibblesD: OperatorCallback;
	SwapNibblesE: OperatorCallback;
	SwapNibblesH: OperatorCallback;
	SwapNibblesL: OperatorCallback;
}

export const SwapOperators: SwapOperatorSet = {
	SwapNibblesA: hardware => swap('a', hardware.cpu.registers),
	SwapNibblesB: hardware => swap('b', hardware.cpu.registers),
	SwapNibblesC: hardware => swap('c', hardware.cpu.registers),
	SwapNibblesD: hardware => swap('d', hardware.cpu.registers),
	SwapNibblesE: hardware => swap('e', hardware.cpu.registers),
	SwapNibblesH: hardware => swap('h', hardware.cpu.registers),
	SwapNibblesL: hardware => swap('l', hardware.cpu.registers),
};