import {Gpu} from '../../../../GPU';
import {HardwareBus} from '../../../../Hardware';
import {Memory} from '../../../../Memory';
import {Cpu} from '../../../index';
import {RegisterFlag, RegisterKey} from '../../../Registers';
import {PrimaryInstructions} from '../../index';

jest.mock('../../../../GPU');

describe('Bitwise XOR operators', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory(), new Gpu(null));
	const {memory, registers} = hardware;

	// region Registers
	const runRegisterTests = (key: RegisterKey, opcode: number): void => {
		const operator = PrimaryInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`Xor${key.toUpperCase()}`);

		registers[key] = 1;
		registers.a = 1;

		operator.invoke(hardware);

		expect(registers.a).toBe(0);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.ZERO);

		registers.a = 0b1001;
		registers[key] = 0b1011;

		const x = registers.a;
		const y = registers[key];

		operator.invoke(hardware);

		expect(registers.a).toBe(x ^ y);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe((x ^ y) ? 0 : RegisterFlag.ZERO);
	};

	test('XorA', () => runRegisterTests('a', 0xAF));
	test('XorB', () => runRegisterTests('b', 0xA8));
	test('XorC', () => runRegisterTests('c', 0xA9));
	test('XorD', () => runRegisterTests('d', 0xAA));
	test('XorE', () => runRegisterTests('e', 0xAB));
	test('XorH', () => runRegisterTests('h', 0xAC));
	test('XorL', () => runRegisterTests('l', 0xAD));
	// endregion

	// region Addresses
	test('XorHLAddress', () => {
		const operator = PrimaryInstructions.getByCode(0xAE);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('XorHLAddress');

		registers.h = 0xC0;
		registers.l = 0x00;

		registers.a = 1;
		memory.writeByte(0xC000, 1);

		operator.invoke(hardware);

		expect(registers.a).toBe(0);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.ZERO);

		registers.a = 0b1001;
		memory.writeByte(0xC000, 0b1011);

		operator.invoke(hardware);

		expect(registers.a).toBe(0b0010);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(0);
	});

	test('XorPCAddress', () => {
		const operator = PrimaryInstructions.getByCode(0xEE);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('XorPCAddress');

		registers.programCount = 0xC000;

		registers.a = 1;
		memory.writeByte(registers.programCount, 1);

		operator.invoke(hardware);

		expect(registers.a).toBe(0);
		expect(registers.programCount).toBe(0xC001);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.ZERO);

		registers.a = 0b1001;
		memory.writeByte(registers.programCount, 0b1011);

		operator.invoke(hardware);

		expect(registers.a).toBe(0b0010);
		expect(registers.programCount).toBe(0xC002);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(0);
	});
	// endregion
});