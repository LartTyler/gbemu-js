import {Gpu} from '../../../GPU';
import {HardwareBus} from '../../../Hardware';
import {Memory} from '../../../Memory';
import {Cpu} from '../../index';
import {RegisterFlag, RegisterKey} from '../../Registers';
import {PrimaryInstructions} from '../index';

jest.mock('../../../GPU');

describe('Add operators', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory(), new Gpu(null));
	const {memory, registers} = hardware;

	// region Add register to A
	const runRegisterToATests = (key: RegisterKey, opcode: number): void => {
		const operator = PrimaryInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`Add${key.toUpperCase()}`);

		registers.a = 3;
		registers[key] = 3;

		operator.invoke(hardware);

		expect(registers.a).toBe(6);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(0);

		registers.a = 0;
		registers[key] = 0;

		operator.invoke(hardware);

		expect(registers.a).toBe(0);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.ZERO);

		registers.a = 200;
		registers[key] = 200;

		operator.invoke(hardware);

		expect(registers.a).toBe(144);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.CARRY | RegisterFlag.HALF_CARRY);

		registers.a = 128;
		registers[key] = 128;

		operator.invoke(hardware);

		expect(registers.a).toBe(0);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.CARRY | RegisterFlag.ZERO);

		registers.a = 8;
		registers[key] = 8;

		operator.invoke(hardware);

		expect(registers.a).toBe(16);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.HALF_CARRY);
	};

	test('AddA', () => runRegisterToATests('a', 0x87));
	test('AddB', () => runRegisterToATests('b', 0x80));
	test('AddC', () => runRegisterToATests('c', 0x81));
	test('AddD', () => runRegisterToATests('d', 0x82));
	test('AddE', () => runRegisterToATests('e', 0x83));
	test('AddH', () => runRegisterToATests('h', 0x84));
	test('AddL', () => runRegisterToATests('l', 0x85));
	// endregion

	// region Add address to A
	test('AddHLAddress', () => {
		const operator = PrimaryInstructions.getByCode(0x86);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('AddHLAddress');

		registers.h = 0xC0;
		registers.l = 0x00;

		registers.a = 1;
		memory.writeByte(0xC000, 3);

		operator.invoke(hardware);

		expect(registers.a).toBe(4);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(0);

		registers.a = 0;
		memory.writeByte(0xC000, 0);

		operator.invoke(hardware);

		expect(registers.a).toBe(0);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.ZERO);

		registers.a = 200;
		memory.writeByte(0xC000, 200);

		operator.invoke(hardware);

		expect(registers.a).toBe(144);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.HALF_CARRY | RegisterFlag.CARRY);

		registers.a = 128;
		memory.writeByte(0xC000, 128);

		operator.invoke(hardware);

		expect(registers.a).toBe(0);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.CARRY | RegisterFlag.ZERO);

		registers.a = 8;
		memory.writeByte(0xC000, 8);

		operator.invoke(hardware);

		expect(registers.a).toBe(16);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.HALF_CARRY);
	});

	test('AddPCAddress', () => {
		const operator = PrimaryInstructions.getByCode(0xC6);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('AddPCAddress');

		registers.a = 1;
		registers.programCount = 0xC000;
		memory.writeByte(0xC000, 3);

		operator.invoke(hardware);

		expect(registers.a).toBe(4);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(0);
		expect(registers.programCount).toBe(0xC001);

		registers.a = 0;
		registers.programCount = 0xC000;
		memory.writeByte(0xC000, 0);

		operator.invoke(hardware);

		expect(registers.a).toBe(0);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
		expect(registers.programCount).toBe(0xC001);

		registers.a = 200;
		registers.programCount = 0xC000;
		memory.writeByte(0xC000, 200);

		operator.invoke(hardware);

		expect(registers.a).toBe(144);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.HALF_CARRY | RegisterFlag.CARRY);
		expect(registers.programCount).toBe(0xC001);

		registers.a = 128;
		registers.programCount = 0xC000;
		memory.writeByte(0xC000, 128);

		operator.invoke(hardware);

		expect(registers.a).toBe(0);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.CARRY | RegisterFlag.ZERO);
		expect(registers.programCount).toBe(0xC001);

		registers.a = 8;
		registers.programCount = 0xC000;
		memory.writeByte(0xC000, 8);

		operator.invoke(hardware);

		expect(registers.a).toBe(16);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.HALF_CARRY);
		expect(registers.programCount).toBe(0xC001);
	});
	// endregion

	// region Add register pair to pair
	const runPairToHLPairTests = (high: RegisterKey, low: RegisterKey, opcode: number): void => {
		const operator = PrimaryInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`Add${(high + low).toUpperCase()}PairToHLPair`);

		registers.h = 0;
		registers.l = 3;
		registers[high] = 0;
		registers[low] = 3;
		registers.flags = 0;

		operator.invoke(hardware);

		expect(registers.h).toBe(0);
		expect(registers.l).toBe(6);
		expect(registers.m).toBe(3);
		expect(registers.flags).toBe(0);

		registers.h = 3;
		registers.l = 3;
		registers[high] = 3;
		registers[low] = 3;
		registers.flags = 0;

		operator.invoke(hardware);

		expect((registers.h << 8) + registers.l).toBe(1542);
		expect(registers.m).toBe(3);
		expect(registers.flags).toBe(0);

		registers.h = 0x80;
		registers.l = 0x00;
		registers[high] = 0x80;
		registers[low] = 0x00;
		registers.flags = 0;

		operator.invoke(hardware);

		expect(registers.h).toBe(0);
		expect(registers.l).toBe(0);
		expect(registers.m).toBe(3);
		expect(registers.flags).toBe(RegisterFlag.CARRY);
	};

	test('AddBCPairToHLPair', () => runPairToHLPairTests('b', 'c', 0x09));
	test('AddDEPairToHLPair', () => runPairToHLPairTests('d', 'e', 0x19));
	test('AddHLPairToHLPair', () => runPairToHLPairTests('h', 'l', 0x29));
	// endregion
});