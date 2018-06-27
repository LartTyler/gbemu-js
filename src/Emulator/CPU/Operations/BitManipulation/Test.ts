import {HardwareBusInterface} from '../../../Hardware';
import {RegisterFlag, RegisterKey, RegisterSetInterface} from '../../Registers';
import {OperatorCallback, OperatorSet} from '../index';

const test = (name: RegisterKey, mask: number, registers: RegisterSetInterface) => {
	registers.flags = registers[name] & mask ? 0 : RegisterFlag.ZERO;

	registers.m = 2;
};

const testAddress = (mask: number, hardware: HardwareBusInterface) => {
	const registers = hardware.cpu.registers;

	registers.flags = hardware.memory.readByte((registers.h << 8) + registers.l) & mask ? 0 : RegisterFlag.ZERO;

	registers.m = 3;
};

export interface TestOperatorSet extends OperatorSet {
	TestABit0: OperatorCallback;
	TestABit1: OperatorCallback;
	TestABit2: OperatorCallback;
	TestABit3: OperatorCallback;
	TestABit4: OperatorCallback;
	TestABit5: OperatorCallback;
	TestABit6: OperatorCallback;
	TestABit7: OperatorCallback;
	TestBBit0: OperatorCallback;
	TestBBit1: OperatorCallback;
	TestBBit2: OperatorCallback;
	TestBBit3: OperatorCallback;
	TestBBit4: OperatorCallback;
	TestBBit5: OperatorCallback;
	TestBBit6: OperatorCallback;
	TestBBit7: OperatorCallback;
	TestCBit0: OperatorCallback;
	TestCBit1: OperatorCallback;
	TestCBit2: OperatorCallback;
	TestCBit3: OperatorCallback;
	TestCBit4: OperatorCallback;
	TestCBit5: OperatorCallback;
	TestCBit6: OperatorCallback;
	TestCBit7: OperatorCallback;
	TestDBit0: OperatorCallback;
	TestDBit1: OperatorCallback;
	TestDBit2: OperatorCallback;
	TestDBit3: OperatorCallback;
	TestDBit4: OperatorCallback;
	TestDBit5: OperatorCallback;
	TestDBit6: OperatorCallback;
	TestDBit7: OperatorCallback;
	TestEBit0: OperatorCallback;
	TestEBit1: OperatorCallback;
	TestEBit2: OperatorCallback;
	TestEBit3: OperatorCallback;
	TestEBit4: OperatorCallback;
	TestEBit5: OperatorCallback;
	TestEBit6: OperatorCallback;
	TestEBit7: OperatorCallback;
	TestHBit0: OperatorCallback;
	TestHBit1: OperatorCallback;
	TestHBit2: OperatorCallback;
	TestHBit3: OperatorCallback;
	TestHBit4: OperatorCallback;
	TestHBit5: OperatorCallback;
	TestHBit6: OperatorCallback;
	TestHBit7: OperatorCallback;
	TestLBit0: OperatorCallback;
	TestLBit1: OperatorCallback;
	TestLBit2: OperatorCallback;
	TestLBit3: OperatorCallback;
	TestLBit4: OperatorCallback;
	TestLBit5: OperatorCallback;
	TestLBit6: OperatorCallback;
	TestLBit7: OperatorCallback;
	TestHLAddressBit0: OperatorCallback;
	TestHLAddressBit1: OperatorCallback;
	TestHLAddressBit2: OperatorCallback;
	TestHLAddressBit3: OperatorCallback;
	TestHLAddressBit4: OperatorCallback;
	TestHLAddressBit5: OperatorCallback;
	TestHLAddressBit6: OperatorCallback;
	TestHLAddressBit7: OperatorCallback;
}

const operators: Partial<TestOperatorSet> = {};

['a', 'b', 'c', 'd', 'e', 'h', 'l', 'm'].forEach((name: string) => {
	let mask = 0x01;

	for (let i = 0; i <= 7; i++) {
		let key;
		let callable;

		if (name === 'm') {
			key = `TestHLAddressBit${i}`;
			callable = (hardware: HardwareBusInterface) => testAddress(mask, hardware);
		} else {
			key = `Test${name.toUpperCase()}Bit${i}`;
			callable = (hardware: HardwareBusInterface) => test(<RegisterKey>name, mask, hardware.cpu.registers);
		}

		operators[key] = callable;

		mask *= 2;
	}
});

export const TestOperators: TestOperatorSet = <TestOperatorSet>operators;