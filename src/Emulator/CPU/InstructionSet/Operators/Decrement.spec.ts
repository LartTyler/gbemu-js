import {Gpu} from '../../../_GPU';
import {HardwareBus} from '../../../Hardware';
import {Memory} from '../../../Memory/Memory';
import {pairFrom16Bit} from '../../../util';
import {Cpu} from '../../index';
import {RegisterFlag, RegisterKey} from '../../Registers';
import {PrimaryInstructions} from '../index';

jest.mock('../../../_GPU');

describe('Decrement operators', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory(), new Gpu(null));
	const {memory, registers} = hardware;

	// region Registers
	const runRegisterTests = (key: RegisterKey, opcode: number): void => {
		const operator = PrimaryInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`Decrement${key.toUpperCase()}`);

		registers[key] = 2;

		operator.invoke(hardware);

		expect(registers[key]).toBe(1);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(0);

		operator.invoke(hardware);

		expect(registers[key]).toBe(0);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.ZERO);

		operator.invoke(hardware);

		expect(registers[key]).toBe(255);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(0);
	};

	test('DecrementA', () => runRegisterTests('a', 0x3D));
	test('DecrementB', () => runRegisterTests('b', 0x05));
	test('DecrementC', () => runRegisterTests('c', 0x0D));
	test('DecrementD', () => runRegisterTests('d', 0x15));
	test('DecrementE', () => runRegisterTests('e', 0x1D));
	test('DecrementH', () => runRegisterTests('h', 0x25));
	test('DecrementL', () => runRegisterTests('l', 0x2D));
	// endregion

	// region Addresses
	test('DecrementHLAddress', () => {
		const operator = PrimaryInstructions.getByCode(0x35);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('DecrementHLAddress');

		registers.h = 0xC0;
		registers.l = 0x00;

		memory.writeByte(0xC000, 2);

		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(1);
		expect(registers.m).toBe(3);
		expect(registers.flags).toBe(0);

		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(0);
		expect(registers.m).toBe(3);
		expect(registers.flags).toBe(RegisterFlag.ZERO);

		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(255);
		expect(registers.m).toBe(3);
		expect(registers.flags).toBe(0);
	});
	// endregion

	// region Register Pairs (16 bit)
	const runRegisterPairTests = (high: RegisterKey, low: RegisterKey, opcode: number): void => {
		const operator = PrimaryInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`Decrement${(high + low).toUpperCase()}Pair`);

		[registers[high], registers[low]] = pairFrom16Bit(1);

		operator.invoke(hardware);

		expect(registers[high]).toBe(0);
		expect(registers[low]).toBe(0);
		expect(registers.m).toBe(1);

		operator.invoke(hardware);

		expect(registers[high]).toBe(255);
		expect(registers[low]).toBe(255);
		expect(registers.m).toBe(1);
	};

	test('DecrementBCPair', () => runRegisterPairTests('b', 'c', 0x0B));
	test('DecrementDEPair', () => runRegisterPairTests('d', 'e', 0x1B));
	test('DecrementHLPair', () => runRegisterPairTests('h', 'l', 0x2B));
	// endregion

	test('DecrementSP', () => {
		const operator = PrimaryInstructions.getByCode(0x3B);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('DecrementSP');

		registers.stackPointer = 1;

		operator.invoke(hardware);

		expect(registers.stackPointer).toBe(0);
		expect(registers.m).toBe(1);

		operator.invoke(hardware);

		expect(registers.stackPointer).toBe(65535);
		expect(registers.m).toBe(1);
	});
});