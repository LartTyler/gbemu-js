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

		// TODO Finish SubtractHLAddress
	});
	// endregion
});