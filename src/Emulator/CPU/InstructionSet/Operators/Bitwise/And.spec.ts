import {Gpu} from '../../../../GPU';
import {HardwareBus} from '../../../../Hardware';
import {Memory} from '../../../../Memory';
import {Cpu} from '../../../index';
import {RegisterFlag, RegisterKey} from '../../../Registers';
import {PrimaryInstructions} from '../../index';

jest.mock('../../../../GPU');

describe('Bitwise AND operators', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory(), new Gpu(null));
	const {memory, registers} = hardware;

	// region Registers
	const runRegisterTests = (key: RegisterKey, opcode: number): void => {
		const operator = PrimaryInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`And${key.toUpperCase()}`);

		registers[key] = 1;
		registers.a = 1;

		operator.invoke(hardware);

		expect(registers.a).toBe(1);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(0);

		registers[key] = 0b1011;
		registers.a = 0b1001;

		operator.invoke(hardware);

		expect(registers.a).toBe(0b1001);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(0);

		registers[key] = 0xFF;
		registers.a = 0;

		operator.invoke(hardware);

		expect(registers.a).toBe(0);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
	};

	test('AndA', () => runRegisterTests('a', 0xA7));
	test('AndB', () => runRegisterTests('b', 0xA0));
	test('AndC', () => runRegisterTests('c', 0xA1));
	test('AndD', () => runRegisterTests('d', 0xA2));
	test('AndE', () => runRegisterTests('e', 0xA3));
	test('AndH', () => runRegisterTests('h', 0xA4));
	test('AndL', () => runRegisterTests('l', 0xA5));
	// endregion

	// region Addresses
	test('AndHLAddress', () => {
		const operator = PrimaryInstructions.getByCode(0xA6);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('AndHLAddress');

		registers.h = 0xC0;
		registers.l = 0x00;

		registers.a = 1;
		memory.writeByte(0xC000, 1);

		operator.invoke(hardware);

		expect(registers.a).toBe(1);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(0);

		registers.a = 0b1001;
		memory.writeByte(0xC000, 0b1011);

		operator.invoke(hardware);

		expect(registers.a).toBe(0b1001);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(0);

		registers.a = 0;
		memory.writeByte(0xC000, 0xFF);

		operator.invoke(hardware);

		expect(registers.a).toBe(0);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
	});

	test('AndPCAddress', () => {
		const operator = PrimaryInstructions.getByCode(0xE6);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('AndPCAddress');

		registers.programCount = 0xC000;

		registers.a = 1;
		memory.writeByte(registers.programCount, 1);

		operator.invoke(hardware);

		expect(registers.a).toBe(1);
		expect(registers.programCount).toBe(0xC001);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(0);

		registers.a = 0b1001;
		memory.writeByte(registers.programCount, 0b1011);

		operator.invoke(hardware);

		expect(registers.a).toBe(0b1001);
		expect(registers.programCount).toBe(0xC002);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(0);

		registers.a = 0;
		memory.writeByte(registers.programCount, 0xFF);

		operator.invoke(hardware);

		expect(registers.a).toBe(0);
		expect(registers.programCount).toBe(0xC003);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
	});
	// endregion
});