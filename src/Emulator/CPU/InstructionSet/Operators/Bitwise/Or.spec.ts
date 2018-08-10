import {Gpu} from '../../../../_GPU';
import {HardwareBus} from '../../../../Hardware';
import {Memory} from '../../../../Memory/Memory';
import {Cpu} from '../../../index';
import {RegisterFlag, RegisterKey} from '../../../Registers';
import {PrimaryInstructions} from '../../index';

jest.mock('../../../../_GPU');

describe('Bitwise OR operators', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory(), new Gpu(null));
	const {memory, registers} = hardware;

	// region Registers
	const runRegisterTests = (key: RegisterKey, opcode: number): void => {
		const operator = PrimaryInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`Or${key.toUpperCase()}`);

		registers.a = 1;
		registers[key] = 1;

		operator.invoke(hardware);

		expect(registers.a).toBe(1);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(0);

		registers.a = 0;
		registers[key] = 0;

		operator.invoke(hardware);

		expect(registers.a).toBe(0);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.ZERO);

		registers.a = 0b1001;
		registers[key] = 0b1011;

		const x = registers.a;
		const y = registers[key];

		operator.invoke(hardware);

		expect(registers.a).toBe(x | y);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(0);
	};

	test('OrA', () => runRegisterTests('a', 0xB7));
	test('OrB', () => runRegisterTests('b', 0xB0));
	test('OrC', () => runRegisterTests('c', 0xB1));
	test('OrD', () => runRegisterTests('d', 0xB2));
	test('OrE', () => runRegisterTests('e', 0xB3));
	test('OrH', () => runRegisterTests('h', 0xB4));
	test('OrL', () => runRegisterTests('l', 0xB5));
	// endregion

	// region Addresses
	test('OrHLAddress', () => {
		const operator = PrimaryInstructions.getByCode(0xB6);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('OrHLAddress');

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

		expect(registers.a).toBe(0b1011);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(0);

		registers.a = 0;
		memory.writeByte(0xC000, 0);

		operator.invoke(hardware);

		expect(registers.a).toBe(0);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
	});

	test('OrPCAddress', () => {
		const operator = PrimaryInstructions.getByCode(0xF6);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('OrPCAddress');

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

		expect(registers.a).toBe(0b1011);
		expect(registers.programCount).toBe(0xC002);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(0);

		registers.a = 0;
		memory.writeByte(registers.programCount, 0);

		operator.invoke(hardware);

		expect(registers.a).toBe(0);
		expect(registers.programCount).toBe(0xC003);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
	});
	// endregion
});