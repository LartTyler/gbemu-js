import {Gpu} from '../../../_GPU';
import {HardwareBus} from '../../../Hardware';
import {Memory} from '../../../Memory/Memory';
import {pairFrom16Bit} from '../../../util';
import {Cpu} from '../../index';
import {RegisterFlag, RegisterKey} from '../../Registers';
import {PrimaryInstructions} from '../index';

jest.mock('../../../_GPU');

describe('Increment operators', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory(), new Gpu(null));
	const {memory, registers} = hardware;

	// region Registers
	const runRegisterTests = (key: RegisterKey, opcode: number): void => {
		const operator = PrimaryInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`Increment${key.toUpperCase()}`);

		registers[key] = 1;

		operator.invoke(hardware);

		expect(registers[key]).toBe(2);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(0);

		registers[key] = 255;

		operator.invoke(hardware);

		expect(registers[key]).toBe(0);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
	};

	test('IncrementA', () => runRegisterTests('a', 0x3C));
	test('IncrementB', () => runRegisterTests('b', 0x04));
	test('IncrementC', () => runRegisterTests('c', 0x0C));
	test('IncrementD', () => runRegisterTests('d', 0x14));
	test('IncrementE', () => runRegisterTests('e', 0x1C));
	test('IncrementH', () => runRegisterTests('h', 0x24));
	test('IncrementL', () => runRegisterTests('l', 0x2C));
	// endregion

	// region Addresses
	test('IncrementHLAddress', () => {
		const operator = PrimaryInstructions.getByCode(0x34);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('IncrementHLAddress');

		registers.h = 0xC0;
		registers.l = 0x00;

		memory.writeByte(0xC000, 1);

		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(2);
		expect(registers.m).toBe(3);
		expect(registers.flags).toBe(0);

		memory.writeByte(0xC000, 255);

		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(0);
		expect(registers.m).toBe(3);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
	});
	// endregion

	// region Register Pairs (16 bit)
	const runRegisterPairTests = (high: RegisterKey, low: RegisterKey, opcode: number): void => {
		const operator = PrimaryInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`Increment${(high + low).toUpperCase()}Pair`);

		[registers[high], registers[low]] = pairFrom16Bit(1);

		operator.invoke(hardware);

		expect(registers[high]).toBe(0);
		expect(registers[low]).toBe(2);
		expect(registers.m).toBe(1);

		[registers[high], registers[low]] = pairFrom16Bit(255);

		operator.invoke(hardware);

		expect(registers[high]).toBe(1);
		expect(registers[low]).toBe(0);
		expect(registers.m).toBe(1);

		[registers[high], registers[low]] = pairFrom16Bit(65535);

		operator.invoke(hardware);

		expect(registers[high]).toBe(0);
		expect(registers[low]).toBe(0);
		expect(registers.m).toBe(1);
	};

	test('IncrementBCPair', () => runRegisterPairTests('b', 'c', 0x03));
	test('IncrementDEPair', () => runRegisterPairTests('d', 'e', 0x13));
	test('IncrementHLPair', () => runRegisterPairTests('h', 'l', 0x23));
	// endregion

	test('IncrementSP', () => {
		const operator = PrimaryInstructions.getByCode(0x33);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('IncrementSP');

		registers.stackPointer = 1;

		operator.invoke(hardware);

		expect(registers.stackPointer).toBe(2);
		expect(registers.m).toBe(1);

		registers.stackPointer = 65535;

		operator.invoke(hardware);

		expect(registers.stackPointer).toBe(0);
		expect(registers.m).toBe(1);
	});
});