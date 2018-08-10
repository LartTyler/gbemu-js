import {Gpu} from '../../../../_GPU';
import {HardwareBus} from '../../../../Hardware';
import {Memory} from '../../../../Memory/Memory';
import {Cpu} from '../../../index';
import {RegisterKey} from '../../../Registers';
import {BitInstructions} from '../../index';

jest.mock('../../../../_GPU');

describe('Bit SET operators', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory(), new Gpu(null));
	const {memory, registers} = hardware;

	beforeEach(() => {
		hardware.cpu.reset();
		memory.reset();
	});

	// region Registers
	const runRegisterTests = (key: RegisterKey, position: number, opcode: number): void => {
		const operator = BitInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`SetBit${position}In${key.toUpperCase()}`);

		registers[key] = 0b0000;
		operator.invoke(hardware);

		expect(registers[key]).toBe(1 << position);
		expect(registers.m).toBe(2);

		registers[key] = 0b1000;
		operator.invoke(hardware);

		expect(registers[key]).toBe(0b1000 | (1 << position));
		expect(registers.m).toBe(2);

		registers[key] = 0b1101;
		operator.invoke(hardware);

		expect(registers[key]).toBe(0b1101 | (1 << position));
		expect(registers.m).toBe(2);
	};

	test('SetBit0InA', () => runRegisterTests('a', 0, 0xC7));
	test('SetBit0InB', () => runRegisterTests('b', 0, 0xC0));
	test('SetBit0InC', () => runRegisterTests('c', 0, 0xC1));
	test('SetBit0InD', () => runRegisterTests('d', 0, 0xC2));
	test('SetBit0InE', () => runRegisterTests('e', 0, 0xC3));
	test('SetBit0InH', () => runRegisterTests('h', 0, 0xC4));
	test('SetBit0InL', () => runRegisterTests('l', 0, 0xC5));

	test('SetBit1InA', () => runRegisterTests('a', 1, 0xCF));
	test('SetBit1InB', () => runRegisterTests('b', 1, 0xC8));
	test('SetBit1InC', () => runRegisterTests('c', 1, 0xC9));
	test('SetBit1InD', () => runRegisterTests('d', 1, 0xCA));
	test('SetBit1InE', () => runRegisterTests('e', 1, 0xCB));
	test('SetBit1InH', () => runRegisterTests('h', 1, 0xCC));
	test('SetBit1InL', () => runRegisterTests('l', 1, 0xCD));

	test('SetBit2InA', () => runRegisterTests('a', 2, 0xD7));
	test('SetBit2InB', () => runRegisterTests('b', 2, 0xD0));
	test('SetBit2InC', () => runRegisterTests('c', 2, 0xD1));
	test('SetBit2InD', () => runRegisterTests('d', 2, 0xD2));
	test('SetBit2InE', () => runRegisterTests('e', 2, 0xD3));
	test('SetBit2InH', () => runRegisterTests('h', 2, 0xD4));
	test('SetBit2InL', () => runRegisterTests('l', 2, 0xD5));

	test('SetBit3InA', () => runRegisterTests('a', 3, 0xDF));
	test('SetBit3InB', () => runRegisterTests('b', 3, 0xD8));
	test('SetBit3InC', () => runRegisterTests('c', 3, 0xD9));
	test('SetBit3InD', () => runRegisterTests('d', 3, 0xDA));
	test('SetBit3InE', () => runRegisterTests('e', 3, 0xDB));
	test('SetBit3InH', () => runRegisterTests('h', 3, 0xDC));
	test('SetBit3InL', () => runRegisterTests('l', 3, 0xDD));

	test('SetBit4InA', () => runRegisterTests('a', 4, 0xE7));
	test('SetBit4InB', () => runRegisterTests('b', 4, 0xE0));
	test('SetBit4InC', () => runRegisterTests('c', 4, 0xE1));
	test('SetBit4InD', () => runRegisterTests('d', 4, 0xE2));
	test('SetBit4InE', () => runRegisterTests('e', 4, 0xE3));
	test('SetBit4InH', () => runRegisterTests('h', 4, 0xE4));
	test('SetBit4InL', () => runRegisterTests('l', 4, 0xE5));

	test('SetBit5InA', () => runRegisterTests('a', 5, 0xEF));
	test('SetBit5InB', () => runRegisterTests('b', 5, 0xE8));
	test('SetBit5InC', () => runRegisterTests('c', 5, 0xE9));
	test('SetBit5InD', () => runRegisterTests('d', 5, 0xEA));
	test('SetBit5InE', () => runRegisterTests('e', 5, 0xEB));
	test('SetBit5InH', () => runRegisterTests('h', 5, 0xEC));
	test('SetBit5InL', () => runRegisterTests('l', 5, 0xED));

	test('SetBit6InA', () => runRegisterTests('a', 6, 0xF7));
	test('SetBit6InB', () => runRegisterTests('b', 6, 0xF0));
	test('SetBit6InC', () => runRegisterTests('c', 6, 0xF1));
	test('SetBit6InD', () => runRegisterTests('d', 6, 0xF2));
	test('SetBit6InE', () => runRegisterTests('e', 6, 0xF3));
	test('SetBit6InH', () => runRegisterTests('h', 6, 0xF4));
	test('SetBit6InL', () => runRegisterTests('l', 6, 0xF5));

	test('SetBit7InA', () => runRegisterTests('a', 7, 0xFF));
	test('SetBit7InB', () => runRegisterTests('b', 7, 0xF8));
	test('SetBit7InC', () => runRegisterTests('c', 7, 0xF9));
	test('SetBit7InD', () => runRegisterTests('d', 7, 0xFA));
	test('SetBit7InE', () => runRegisterTests('e', 7, 0xFB));
	test('SetBit7InH', () => runRegisterTests('h', 7, 0xFC));
	test('SetBit7InL', () => runRegisterTests('l', 7, 0xFD));
	// endregion

	// region Addresses
	const runAddressTests = (position: number, opcode: number): void => {
		const operator = BitInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`SetBit${position}InHLAddress`);

		registers.h = 0xC0;
		registers.l = 0x00;

		memory.writeByte(0xC000, 0);
		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(1 << position);
		expect(registers.m).toBe(4);

		memory.writeByte(0xC000, 8);
		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(8 | (1 << position));
		expect(registers.m).toBe(4);

		memory.writeByte(0xC000, 13);
		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(13 | (1 << position));
		expect(registers.m).toBe(4);
	};

	test('SetBit0InHLAddress', () => runAddressTests(0, 0xC6));
	test('SetBit1InHLAddress', () => runAddressTests(1, 0xCE));
	test('SetBit2InHLAddress', () => runAddressTests(2, 0xD6));
	test('SetBit3InHLAddress', () => runAddressTests(3, 0xDE));
	test('SetBit4InHLAddress', () => runAddressTests(4, 0xE6));
	test('SetBit5InHLAddress', () => runAddressTests(5, 0xEE));
	test('SetBit6InHLAddress', () => runAddressTests(6, 0xF6));
	test('SetBit7InHLAddress', () => runAddressTests(7, 0xFE));
	// endregion
});