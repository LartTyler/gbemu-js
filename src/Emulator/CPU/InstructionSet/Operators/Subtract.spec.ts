import {Gpu} from '../../../GPU';
import {HardwareBus} from '../../../Hardware';
import {Memory} from '../../../Memory';
import {Cpu} from '../../index';
import {RegisterFlag, RegisterKey} from '../../Registers';
import {PrimaryInstructions} from '../index';

jest.mock('../../../GPU');

describe('Subtract operators', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory(), new Gpu(null));
	const {memory, registers} = hardware;

	beforeEach(() => {
		memory.reset();
		registers.reset();
	});

	// region Subtract registers
	const runRegisterTests = (key: RegisterKey, opcode: number): void => {
		const operator = PrimaryInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`Subtract${key.toUpperCase()}`);

		registers.a = 3;
		registers[key] = 1;
		registers.flags = 0;

		operator.invoke(hardware);

		expect(registers.a).toBe(2);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.OPERATION);

		registers.a = 1;
		registers[key] = 3;
		registers.flags = 0;

		operator.invoke(hardware);

		expect(registers.a).toBe(254);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.CARRY | RegisterFlag.HALF_CARRY);

		registers.a = 1;
		registers[key] = 1;
		registers.flags = 0;

		operator.invoke(hardware);

		expect(registers.a).toBe(0);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.ZERO);
	};

	test('SubtractA', () => {
		const operator = PrimaryInstructions.getByCode(0x97);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`SubtractA`);

		registers.a = 3;
		registers.flags = 0;

		operator.invoke(hardware);

		expect(registers.a).toBe(0);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.ZERO);
	});

	test('SubtractB', () => runRegisterTests('b', 0x90));
	test('SubtractC', () => runRegisterTests('c', 0x91));
	test('SubtractD', () => runRegisterTests('d', 0x92));
	test('SubtractE', () => runRegisterTests('e', 0x93));
	test('SubtractH', () => runRegisterTests('h', 0x94));
	test('SubtractL', () => runRegisterTests('l', 0x95));
	// endregion

	// region Subtract address
	test('SubtractHLAddress', () => {
		const operator = PrimaryInstructions.getByCode(0x96);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('SubtractHLAddress');

		registers.h = 0xC0;
		registers.l = 0x00;

		registers.a = 3;
		memory.writeByte(0xC000, 1);

		operator.invoke(hardware);

		expect(registers.a).toBe(2);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.OPERATION);

		registers.a = 1;
		memory.writeByte(0xC000, 5);

		operator.invoke(hardware);

		expect(registers.a).toBe(252);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.CARRY | RegisterFlag.HALF_CARRY);

		registers.a = 1;
		memory.writeByte(0xC000, 1);

		operator.invoke(hardware);

		expect(registers.a).toBe(0);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.ZERO);

		registers.a = 16;
		memory.writeByte(0xC000, 3);

		operator.invoke(hardware);

		expect(registers.a).toBe(13);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.HALF_CARRY);
	});

	test('SubtractPCAddress', () => {
		const operator = PrimaryInstructions.getByCode(0xD6);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('SubtractPCAddress');

		registers.programCount = 0xC000;

		registers.a = 3;
		memory.writeByte(registers.programCount, 1);

		operator.invoke(hardware);

		expect(registers.a).toBe(2);
		expect(registers.m).toBe(2);
		expect(registers.programCount).toBe(0xC001);
		expect(registers.flags).toBe(RegisterFlag.OPERATION);

		registers.a = 1;
		memory.writeByte(registers.programCount, 5);

		operator.invoke(hardware);

		expect(registers.a).toBe(252);
		expect(registers.m).toBe(2);
		expect(registers.programCount).toBe(0xC002);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.CARRY | RegisterFlag.HALF_CARRY);

		registers.a = 1;
		memory.writeByte(registers.programCount, 1);

		operator.invoke(hardware);

		expect(registers.a).toBe(0);
		expect(registers.m).toBe(2);
		expect(registers.programCount).toBe(0xC003);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.ZERO);

		registers.a = 16;
		memory.writeByte(registers.programCount, 3);

		operator.invoke(hardware);

		expect(registers.a).toBe(13);
		expect(registers.m).toBe(2);
		expect(registers.programCount).toBe(0xC004);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.HALF_CARRY);
	});
	// endregion

	// region Subtract registers with carry
	const runRegisterWithCarryTests = (key: RegisterKey, opcode: number): void => {
		const operator = PrimaryInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`Subtract${key.toUpperCase()}WithCarry`);

		registers.a = 3;
		registers[key] = 1;

		operator.invoke(hardware);

		expect(registers.a).toBe(2);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.OPERATION);

		registers.a = 0;
		registers[key] = 3;
		registers.flags = 0;

		operator.invoke(hardware);

		expect(registers.a).toBe(253);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.CARRY | RegisterFlag.HALF_CARRY);

		registers.a = 1;
		registers[key] = 1;
		registers.flags = 0;

		operator.invoke(hardware);

		expect(registers.a).toBe(0);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.ZERO);

		registers.a = 18;
		registers[key] = 5;
		registers.flags = 0;

		operator.invoke(hardware);

		expect(registers.a).toBe(13);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.HALF_CARRY);
	};

	test('SubtractAWithCarry', () => {
		const operator = PrimaryInstructions.getByCode(0x9F);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`SubtractAWithCarry`);

		registers.a = 3;

		operator.invoke(hardware);

		expect(registers.a).toBe(0);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.ZERO);

		registers.a = 3;
		registers.flags = RegisterFlag.CARRY;

		operator.invoke(hardware);

		expect(registers.a).toBe(255);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.CARRY | RegisterFlag.HALF_CARRY);
	});

	test('SubtractBWithCarry', () => runRegisterWithCarryTests('b', 0x98));
	test('SubtractCWithCarry', () => runRegisterWithCarryTests('c', 0x99));
	test('SubtractDWithCarry', () => runRegisterWithCarryTests('d', 0x9A));
	test('SubtractEWithCarry', () => runRegisterWithCarryTests('e', 0x9B));
	test('SubtractHWithCarry', () => runRegisterWithCarryTests('h', 0x9C));
	test('SubtractLWithCarry', () => runRegisterWithCarryTests('l', 0x9D));
	// endregion

	// region Subtract address with carry
	test('SubtractHLAddressWithCarry', () => {
		const operator = PrimaryInstructions.getByCode(0x9E);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('SubtractHLAddressWithCarry');

		registers.h = 0xC0;
		registers.l = 0x00;

		registers.a = 3;
		memory.writeByte(0xC000, 1);

		operator.invoke(hardware);

		expect(registers.a).toBe(2);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.OPERATION);

		registers.a = 0;
		memory.writeByte(0xC000, 3);

		operator.invoke(hardware);

		expect(registers.a).toBe(253);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.CARRY | RegisterFlag.HALF_CARRY);

		registers.a = 1;
		registers.flags = 0;
		memory.writeByte(0xC000, 1);

		operator.invoke(hardware);

		expect(registers.a).toBe(0);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.ZERO);

		registers.a = 18;
		memory.writeByte(0xC000, 5);

		operator.invoke(hardware);

		expect(registers.a).toBe(13);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.HALF_CARRY);

		registers.a = 3;
		registers.flags = RegisterFlag.CARRY;
		memory.writeByte(0xC000, 1);

		operator.invoke(hardware);

		expect(registers.a).toBe(1);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.OPERATION);
	});

	test('SubtractPCAddressWithCarry', () => {
		const operator = PrimaryInstructions.getByCode(0xDE);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('SubtractPCAddressWithCarry');

		registers.programCount = 0xC000;

		registers.a = 3;
		memory.writeByte(registers.programCount, 1);

		operator.invoke(hardware);

		expect(registers.a).toBe(2);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.OPERATION);
		expect(registers.programCount).toBe(0xC001);

		registers.a = 0;
		memory.writeByte(registers.programCount, 3);

		operator.invoke(hardware);

		expect(registers.a).toBe(253);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.CARRY | RegisterFlag.HALF_CARRY);
		expect(registers.programCount).toBe(0xC002);

		registers.a = 1;
		registers.flags = 0;
		memory.writeByte(registers.programCount, 1);

		operator.invoke(hardware);

		expect(registers.a).toBe(0);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.ZERO);
		expect(registers.programCount).toBe(0xC003);

		registers.a = 18;
		memory.writeByte(registers.programCount, 5);

		operator.invoke(hardware);

		expect(registers.a).toBe(13);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.HALF_CARRY);
		expect(registers.programCount).toBe(0xC004);

		registers.a = 3;
		registers.flags = RegisterFlag.CARRY;
		memory.writeByte(registers.programCount, 1);

		operator.invoke(hardware);

		expect(registers.a).toBe(1);
		expect(registers.m).toBe(2);
		expect(registers.flags).toBe(RegisterFlag.OPERATION);
		expect(registers.programCount).toBe(0xC005);
	});
	// endregion
});