import {Gpu} from '../../../../_GPU';
import {HardwareBus} from '../../../../Hardware';
import {Memory} from '../../../../Memory/Memory';
import {Cpu} from '../../../index';
import {RegisterFlag, RegisterKey} from '../../../Registers';
import {BitInstructions} from '../../index';

jest.mock('../../../../_GPU');

describe('Bit test operators', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory(), new Gpu(null));
	const {memory, registers} = hardware;

	beforeEach(() => {
		hardware.cpu.reset();
		hardware.memory.reset();
	});

	// region Registers
	const runRegisterTests = (key: RegisterKey, position: number, opcode: number): void => {
		const operator = BitInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`TestBit${position}In${key.toUpperCase()}`);

		registers[key] = 0;

		operator.invoke(hardware);

		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.ZERO | RegisterFlag.HALF_CARRY);

		registers[key] = 1 << position;

		operator.invoke(hardware);

		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.HALF_CARRY);

		registers[key] = 1 << position;
		registers.flags = RegisterFlag.CARRY | RegisterFlag.OPERATION;

		operator.invoke(hardware);

		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.HALF_CARRY | RegisterFlag.CARRY);
	};

	test('TestBit0InA', () => runRegisterTests('a', 0, 0x47));
	test('TestBit0InB', () => runRegisterTests('b', 0, 0x40));
	test('TestBit0InC', () => runRegisterTests('c', 0, 0x41));
	test('TestBit0InD', () => runRegisterTests('d', 0, 0x42));
	test('TestBit0InE', () => runRegisterTests('e', 0, 0x43));
	test('TestBit0InH', () => runRegisterTests('h', 0, 0x44));
	test('TestBit0InL', () => runRegisterTests('l', 0, 0x45));

	test('TestBit1InA', () => runRegisterTests('a', 1, 0x4F));
	test('TestBit1InB', () => runRegisterTests('b', 1, 0x48));
	test('TestBit1InC', () => runRegisterTests('c', 1, 0x49));
	test('TestBit1InD', () => runRegisterTests('d', 1, 0x4A));
	test('TestBit1InE', () => runRegisterTests('e', 1, 0x4B));
	test('TestBit1InH', () => runRegisterTests('h', 1, 0x4C));
	test('TestBit1InL', () => runRegisterTests('l', 1, 0x4D));

	test('TestBit2InA', () => runRegisterTests('a', 2, 0x57));
	test('TestBit2InB', () => runRegisterTests('b', 2, 0x50));
	test('TestBit2InC', () => runRegisterTests('c', 2, 0x51));
	test('TestBit2InD', () => runRegisterTests('d', 2, 0x52));
	test('TestBit2InE', () => runRegisterTests('e', 2, 0x53));
	test('TestBit2InH', () => runRegisterTests('h', 2, 0x54));
	test('TestBit2InL', () => runRegisterTests('l', 2, 0x55));

	test('TestBit3InA', () => runRegisterTests('a', 3, 0x5F));
	test('TestBit3InB', () => runRegisterTests('b', 3, 0x58));
	test('TestBit3InC', () => runRegisterTests('c', 3, 0x59));
	test('TestBit3InD', () => runRegisterTests('d', 3, 0x5A));
	test('TestBit3InE', () => runRegisterTests('e', 3, 0x5B));
	test('TestBit3InH', () => runRegisterTests('h', 3, 0x5C));
	test('TestBit3InL', () => runRegisterTests('l', 3, 0x5D));

	test('TestBit4InA', () => runRegisterTests('a', 4, 0x67));
	test('TestBit4InB', () => runRegisterTests('b', 4, 0x60));
	test('TestBit4InC', () => runRegisterTests('c', 4, 0x61));
	test('TestBit4InD', () => runRegisterTests('d', 4, 0x62));
	test('TestBit4InE', () => runRegisterTests('e', 4, 0x63));
	test('TestBit4InH', () => runRegisterTests('h', 4, 0x64));
	test('TestBit4InL', () => runRegisterTests('l', 4, 0x65));

	test('TestBit5InA', () => runRegisterTests('a', 5, 0x6F));
	test('TestBit5InB', () => runRegisterTests('b', 5, 0x68));
	test('TestBit5InC', () => runRegisterTests('c', 5, 0x69));
	test('TestBit5InD', () => runRegisterTests('d', 5, 0x6A));
	test('TestBit5InE', () => runRegisterTests('e', 5, 0x6B));
	test('TestBit5InH', () => runRegisterTests('h', 5, 0x6C));
	test('TestBit5InL', () => runRegisterTests('l', 5, 0x6D));

	test('TestBit6InA', () => runRegisterTests('a', 6, 0x77));
	test('TestBit6InB', () => runRegisterTests('b', 6, 0x70));
	test('TestBit6InC', () => runRegisterTests('c', 6, 0x71));
	test('TestBit6InD', () => runRegisterTests('d', 6, 0x72));
	test('TestBit6InE', () => runRegisterTests('e', 6, 0x73));
	test('TestBit6InH', () => runRegisterTests('h', 6, 0x74));
	test('TestBit6InL', () => runRegisterTests('l', 6, 0x75));

	test('TestBit7InA', () => runRegisterTests('a', 7, 0x7F));
	test('TestBit7InB', () => runRegisterTests('b', 7, 0x78));
	test('TestBit7InC', () => runRegisterTests('c', 7, 0x79));
	test('TestBit7InD', () => runRegisterTests('d', 7, 0x7A));
	test('TestBit7InE', () => runRegisterTests('e', 7, 0x7B));
	test('TestBit7InH', () => runRegisterTests('h', 7, 0x7C));
	test('TestBit7InL', () => runRegisterTests('l', 7, 0x7D));
	// endregion

	// region Addresses
	const runHLAddressTests = (position: number, opcode: number): void => {
		const operator = BitInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`TestBit${position}InHLAddress`);

		registers.h = 0xC0;
		registers.l = 0x00;

		memory.writeByte(0xC000, 0);

		operator.invoke(hardware);

		expect(registers.m).toBe(3);
		expect(registers.flags).toBe(RegisterFlag.ZERO | RegisterFlag.HALF_CARRY);

		memory.writeByte(0xC000, 1 << position);

		operator.invoke(hardware);

		expect(registers.m).toBe(3);
		expect(registers.flags).toBe(RegisterFlag.HALF_CARRY);

		memory.writeByte(0xC000, 1 << position);
		registers.flags = RegisterFlag.CARRY | RegisterFlag.OPERATION;

		operator.invoke(hardware);

		expect(registers.m).toBe(3);
		expect(registers.flags).toBe(RegisterFlag.HALF_CARRY | RegisterFlag.CARRY);
	};

	test('TestBit0InHLAddress', () => runHLAddressTests(0, 0x46));
	test('TestBit1InHLAddress', () => runHLAddressTests(1, 0x4E));
	test('TestBit2InHLAddress', () => runHLAddressTests(2, 0x56));
	test('TestBit3InHLAddress', () => runHLAddressTests(3, 0x5E));
	test('TestBit4InHLAddress', () => runHLAddressTests(4, 0x66));
	test('TestBit5InHLAddress', () => runHLAddressTests(5, 0x6E));
	test('TestBit6InHLAddress', () => runHLAddressTests(6, 0x76));
	test('TestBit7InHLAddress', () => runHLAddressTests(7, 0x7E));
	// endregion
});