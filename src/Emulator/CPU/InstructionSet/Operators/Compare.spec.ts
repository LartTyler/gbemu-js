import {Gpu} from '../../../_GPU';
import {HardwareBus} from '../../../Hardware';
import {Memory} from '../../../Memory/Memory';
import {Cpu} from '../../index';
import {RegisterFlag, RegisterKey} from '../../Registers';
import {PrimaryInstructions} from '../index';

jest.mock('../../../_GPU');

describe('Compare operators', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory(), new Gpu(null));
	const {registers, memory} = hardware;

	beforeEach(() => {
		hardware.cpu.reset();
		hardware.memory.reset();
	});

	// region Compare registers
	const runRegisterTests = (key: RegisterKey, opcode: number): void => {
		const operator = PrimaryInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`Compare${key.toUpperCase()}`);

		registers.a = 3;
		registers[key] = 1;
		registers.flags = 0;

		operator.invoke(hardware);

		expect(registers.a).toBe(3);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.OPERATION);

		registers.a = 1;
		registers[key] = 3;
		registers.flags = 0;

		operator.invoke(hardware);

		expect(registers.a).toBe(1);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.CARRY | RegisterFlag.HALF_CARRY);

		registers.a = 1;
		registers[key] = 1;
		registers.flags = 0;

		operator.invoke(hardware);

		expect(registers.a).toBe(1);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.ZERO);
	};

	test('CompareA', () => {
		const operator = PrimaryInstructions.getByCode(0xBF);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('CompareA');

		registers.a = 5;

		operator.invoke(hardware);

		expect(registers.a).toBe(5);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.ZERO);
	});

	test('CompareB', () => runRegisterTests('b', 0xB8));
	test('CompareC', () => runRegisterTests('c', 0xB9));
	test('CompareD', () => runRegisterTests('d', 0xBA));
	test('CompareE', () => runRegisterTests('e', 0xBB));
	test('CompareH', () => runRegisterTests('h', 0xBC));
	test('CompareL', () => runRegisterTests('l', 0xBD));
	// endregion

	// region Compare addresses
	test('CompareHLAddress', () => {
		const operator = PrimaryInstructions.getByCode(0xBE);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('CompareHLAddress');

		registers.h = 0xC0;
		registers.l = 0x00;

		registers.a = 3;
		memory.writeByte(0xC000, 1);

		operator.invoke(hardware);

		expect(registers.a).toBe(3);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.OPERATION);

		registers.a = 1;
		memory.writeByte(0xC000, 5);

		operator.invoke(hardware);

		expect(registers.a).toBe(1);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.CARRY | RegisterFlag.HALF_CARRY);

		registers.a = 1;
		memory.writeByte(0xC000, 1);

		operator.invoke(hardware);

		expect(registers.a).toBe(1);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.ZERO);

		registers.a = 16;
		memory.writeByte(0xC000, 3);

		operator.invoke(hardware);

		expect(registers.a).toBe(16);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.HALF_CARRY);
	});

	test('ComparePCAddress', () => {
		const operator = PrimaryInstructions.getByCode(0xFE);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('ComparePCAddress');

		registers.programCount = 0xC000;

		registers.a = 3;
		memory.writeByte(registers.programCount, 1);

		operator.invoke(hardware);

		expect(registers.a).toBe(3);
		expect(registers.m).toBe(2);
		expect(registers.programCount).toBe(0xC001);
		expect(registers.flags).toBe(RegisterFlag.OPERATION);

		registers.a = 1;
		memory.writeByte(registers.programCount, 5);

		operator.invoke(hardware);

		expect(registers.a).toBe(1);
		expect(registers.m).toBe(2);
		expect(registers.programCount).toBe(0xC002);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.CARRY | RegisterFlag.HALF_CARRY);

		registers.a = 1;
		memory.writeByte(registers.programCount, 1);

		operator.invoke(hardware);

		expect(registers.a).toBe(1);
		expect(registers.m).toBe(2);
		expect(registers.programCount).toBe(0xC003);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.ZERO);

		registers.a = 16;
		memory.writeByte(registers.programCount, 3);

		operator.invoke(hardware);

		expect(registers.a).toBe(16);
		expect(registers.m).toBe(2);
		expect(registers.programCount).toBe(0xC004);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.HALF_CARRY);
	});
	// endregion
});