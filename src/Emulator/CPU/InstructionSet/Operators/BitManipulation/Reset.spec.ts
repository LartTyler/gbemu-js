import {Gpu} from '../../../../GPU';
import {HardwareBus} from '../../../../Hardware';
import {Memory} from '../../../../Memory';
import {Cpu} from '../../../index';
import {RegisterKey} from '../../../Registers';
import {BitInstructions} from '../../index';

jest.mock('../../../../GPU');

describe('Bit reset operators', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory(), new Gpu(null));
	const {memory, registers} = hardware;

	beforeEach(() => {
		hardware.cpu.reset();
		memory.reset();
	});

	const getValue = (position: number): number => {
		const value = 1 << position;

		if (position > 0)
			return value + (1 << (position - 1));

		return value + 2;
	};

	// region Registers
	const runRegisterTests = (key: RegisterKey, position: number, opcode: number): void => {
		const operator = BitInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`ResetBit${position}In${key.toUpperCase()}`);

		registers[key] = 0;

		operator.invoke(hardware);

		expect(registers[key]).toBe(0);
		expect(registers.m).toBe(2);

		const value = getValue(position);

		registers[key] = value;

		operator.invoke(hardware);

		expect(registers[key]).toBe(value & ~(1 << position));
		expect(registers.m).toBe(2);
	};

	test('ResetBit0InA', () => runRegisterTests('a', 0, 0x87));
	test('ResetBit0InB', () => runRegisterTests('b', 0, 0x80));
	test('ResetBit0InC', () => runRegisterTests('c', 0, 0x81));
	test('ResetBit0InD', () => runRegisterTests('d', 0, 0x82));
	test('ResetBit0InE', () => runRegisterTests('e', 0, 0x83));
	test('ResetBit0InH', () => runRegisterTests('h', 0, 0x84));
	test('ResetBit0InL', () => runRegisterTests('l', 0, 0x85));

	test('ResetBit1InA', () => runRegisterTests('a', 1, 0x8F));
	test('ResetBit1InB', () => runRegisterTests('b', 1, 0x88));
	test('ResetBit1InC', () => runRegisterTests('c', 1, 0x89));
	test('ResetBit1InD', () => runRegisterTests('d', 1, 0x8A));
	test('ResetBit1InE', () => runRegisterTests('e', 1, 0x8B));
	test('ResetBit1InH', () => runRegisterTests('h', 1, 0x8C));
	test('ResetBit1InL', () => runRegisterTests('l', 1, 0x8D));

	test('ResetBit2InA', () => runRegisterTests('a', 2, 0x97));
	test('ResetBit2InB', () => runRegisterTests('b', 2, 0x90));
	test('ResetBit2InC', () => runRegisterTests('c', 2, 0x91));
	test('ResetBit2InD', () => runRegisterTests('d', 2, 0x92));
	test('ResetBit2InE', () => runRegisterTests('e', 2, 0x93));
	test('ResetBit2InH', () => runRegisterTests('h', 2, 0x94));
	test('ResetBit2InL', () => runRegisterTests('l', 2, 0x95));

	test('ResetBit3InA', () => runRegisterTests('a', 3, 0x9F));
	test('ResetBit3InB', () => runRegisterTests('b', 3, 0x98));
	test('ResetBit3InC', () => runRegisterTests('c', 3, 0x99));
	test('ResetBit3InD', () => runRegisterTests('d', 3, 0x9A));
	test('ResetBit3InE', () => runRegisterTests('e', 3, 0x9B));
	test('ResetBit3InH', () => runRegisterTests('h', 3, 0x9C));
	test('ResetBit3InL', () => runRegisterTests('l', 3, 0x9D));

	test('ResetBit4InA', () => runRegisterTests('a', 4, 0xA7));
	test('ResetBit4InB', () => runRegisterTests('b', 4, 0xA0));
	test('ResetBit4InC', () => runRegisterTests('c', 4, 0xA1));
	test('ResetBit4InD', () => runRegisterTests('d', 4, 0xA2));
	test('ResetBit4InE', () => runRegisterTests('e', 4, 0xA3));
	test('ResetBit4InH', () => runRegisterTests('h', 4, 0xA4));
	test('ResetBit4InL', () => runRegisterTests('l', 4, 0xA5));

	test('ResetBit5InA', () => runRegisterTests('a', 5, 0xAF));
	test('ResetBit5InB', () => runRegisterTests('b', 5, 0xA8));
	test('ResetBit5InC', () => runRegisterTests('c', 5, 0xA9));
	test('ResetBit5InD', () => runRegisterTests('d', 5, 0xAA));
	test('ResetBit5InE', () => runRegisterTests('e', 5, 0xAB));
	test('ResetBit5InH', () => runRegisterTests('h', 5, 0xAC));
	test('ResetBit5InL', () => runRegisterTests('l', 5, 0xAD));

	test('ResetBit6InA', () => runRegisterTests('a', 6, 0xB7));
	test('ResetBit6InB', () => runRegisterTests('b', 6, 0xB0));
	test('ResetBit6InC', () => runRegisterTests('c', 6, 0xB1));
	test('ResetBit6InD', () => runRegisterTests('d', 6, 0xB2));
	test('ResetBit6InE', () => runRegisterTests('e', 6, 0xB3));
	test('ResetBit6InH', () => runRegisterTests('h', 6, 0xB4));
	test('ResetBit6InL', () => runRegisterTests('l', 6, 0xB5));

	test('ResetBit7InA', () => runRegisterTests('a', 7, 0xBF));
	test('ResetBit7InB', () => runRegisterTests('b', 7, 0xB8));
	test('ResetBit7InC', () => runRegisterTests('c', 7, 0xB9));
	test('ResetBit7InD', () => runRegisterTests('d', 7, 0xBA));
	test('ResetBit7InE', () => runRegisterTests('e', 7, 0xBB));
	test('ResetBit7InH', () => runRegisterTests('h', 7, 0xBC));
	test('ResetBit7InL', () => runRegisterTests('l', 7, 0xBD));
	// endregion

	// region Addresses
	const runAddressTests = (position: number, opcode: number): void => {
		const operator = BitInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`ResetBit${position}InHLAddress`);

		registers.h = 0xC0;
		registers.l = 0x00;

		memory.writeByte(0xC000, 0);
		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(0);
		expect(registers.m).toBe(4);

		const value = getValue(position);

		memory.writeByte(0xC000, value);
		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(value & ~(1 << position));
		expect(registers.m).toBe(4);
	};

	test('ResetBit0InHLAddress', () => runAddressTests(0, 0x86));
	test('ResetBit1InHLAddress', () => runAddressTests(1, 0x8E));
	test('ResetBit2InHLAddress', () => runAddressTests(2, 0x96));
	test('ResetBit3InHLAddress', () => runAddressTests(3, 0x9E));
	test('ResetBit4InHLAddress', () => runAddressTests(4, 0xA6));
	test('ResetBit5InHLAddress', () => runAddressTests(5, 0xAE));
	test('ResetBit6InHLAddress', () => runAddressTests(6, 0xB6));
	test('ResetBit7InHLAddress', () => runAddressTests(7, 0xBE));
	// endregion
});