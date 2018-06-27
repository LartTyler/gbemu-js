import {HardwareBusInterface} from '../../../Hardware';
import {RegisterKey, RegisterSetInterface} from '../../Registers';
import {OperatorCallback, OperatorSet} from '../index';

const reset = (name: RegisterKey, mask: number, registers: RegisterSetInterface) => {
	registers[name] &= mask;

	registers.m = 2;
};

const resetAddress = (mask: number, hardware: HardwareBusInterface) => {
	const memory = hardware.memory;
	const registers = hardware.cpu.registers;

	const address = (registers.h << 8) + registers.l;

	memory.writeByte(address, memory.readByte(address) & mask);

	registers.m = 4;
};

export interface ResetOperatorSet extends OperatorSet {
	ResetABit0: OperatorCallback;
	ResetABit1: OperatorCallback;
	ResetABit2: OperatorCallback;
	ResetABit3: OperatorCallback;
	ResetABit4: OperatorCallback;
	ResetABit5: OperatorCallback;
	ResetABit6: OperatorCallback;
	ResetABit7: OperatorCallback;
	ResetBBit0: OperatorCallback;
	ResetBBit1: OperatorCallback;
	ResetBBit2: OperatorCallback;
	ResetBBit3: OperatorCallback;
	ResetBBit4: OperatorCallback;
	ResetBBit5: OperatorCallback;
	ResetBBit6: OperatorCallback;
	ResetBBit7: OperatorCallback;
	ResetCBit0: OperatorCallback;
	ResetCBit1: OperatorCallback;
	ResetCBit2: OperatorCallback;
	ResetCBit3: OperatorCallback;
	ResetCBit4: OperatorCallback;
	ResetCBit5: OperatorCallback;
	ResetCBit6: OperatorCallback;
	ResetCBit7: OperatorCallback;
	ResetDBit0: OperatorCallback;
	ResetDBit1: OperatorCallback;
	ResetDBit2: OperatorCallback;
	ResetDBit3: OperatorCallback;
	ResetDBit4: OperatorCallback;
	ResetDBit5: OperatorCallback;
	ResetDBit6: OperatorCallback;
	ResetDBit7: OperatorCallback;
	ResetEBit0: OperatorCallback;
	ResetEBit1: OperatorCallback;
	ResetEBit2: OperatorCallback;
	ResetEBit3: OperatorCallback;
	ResetEBit4: OperatorCallback;
	ResetEBit5: OperatorCallback;
	ResetEBit6: OperatorCallback;
	ResetEBit7: OperatorCallback;
	ResetHBit0: OperatorCallback;
	ResetHBit1: OperatorCallback;
	ResetHBit2: OperatorCallback;
	ResetHBit3: OperatorCallback;
	ResetHBit4: OperatorCallback;
	ResetHBit5: OperatorCallback;
	ResetHBit6: OperatorCallback;
	ResetHBit7: OperatorCallback;
	ResetLBit0: OperatorCallback;
	ResetLBit1: OperatorCallback;
	ResetLBit2: OperatorCallback;
	ResetLBit3: OperatorCallback;
	ResetLBit4: OperatorCallback;
	ResetLBit5: OperatorCallback;
	ResetLBit6: OperatorCallback;
	ResetLBit7: OperatorCallback;
	ResetHLAddressBit0: OperatorCallback;
	ResetHLAddressBit1: OperatorCallback;
	ResetHLAddressBit2: OperatorCallback;
	ResetHLAddressBit3: OperatorCallback;
	ResetHLAddressBit4: OperatorCallback;
	ResetHLAddressBit5: OperatorCallback;
	ResetHLAddressBit6: OperatorCallback;
	ResetHLAddressBit7: OperatorCallback;
}

const operators: Partial<ResetOperatorSet> = {};

['a', 'b', 'c', 'd', 'e', 'h', 'l', 'm'].forEach((name: string) => {
	let mask = 0xFE;

	for (let i = 0; i <= 7; i++) {
		let key;
		let callable;

		if (name === 'm') {
			key = `ResetHLAddressBit${i}`;
			callable = (hardware: HardwareBusInterface) => resetAddress(mask, hardware);
		} else {
			key = `Reset${name.toUpperCase()}Bit${i}`;
			callable = (hardware: HardwareBusInterface) => reset(<RegisterKey>name, mask, hardware.cpu.registers);
		}

		operators[key] = callable;

		if (i === 0)
			mask -= 1;
		else
			mask -= Math.pow(2, i);
	}
});

export const ResetOperators: ResetOperatorSet = <ResetOperatorSet>operators;