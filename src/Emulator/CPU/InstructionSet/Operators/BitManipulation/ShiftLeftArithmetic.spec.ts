import {Gpu} from '../../../../_GPU';
import {HardwareBus} from '../../../../Hardware';
import {Memory} from '../../../../Memory/Memory';
import {Cpu} from '../../../index';
import {RegisterFlag, RegisterKey} from '../../../Registers';
import {BitInstructions} from '../../index';

jest.mock('../../../../_GPU');

describe('ShiftLeftArithmetic operators', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory(), new Gpu(null));
	const {memory, registers} = hardware;

	beforeEach(() => {
		memory.reset();
		hardware.cpu.reset();
	});

	// region Registers
	const runRegisterTests = (key: RegisterKey, opcode: number): void => {
		const operator = BitInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`Shift${key.toUpperCase()}LeftArithmetic`);

		registers[key] = 0;
		operator.invoke(hardware);

		expect(registers[key]).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
		expect(registers.m).toBe(2);

		registers[key] = 1;
		operator.invoke(hardware);

		expect(registers[key]).toBe(2);
		expect(registers.flags).toBe(0);
		expect(registers.m).toBe(2);

		registers[key] = 0x80;
		operator.invoke(hardware);

		expect(registers[key]).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.CARRY | RegisterFlag.ZERO);
		expect(registers.m).toBe(2);
	};

	test('ShiftALeftArithmetic', () => runRegisterTests('a', 0x27));
	test('ShiftBLeftArithmetic', () => runRegisterTests('b', 0x20));
	test('ShiftCLeftArithmetic', () => runRegisterTests('c', 0x21));
	test('ShiftDLeftArithmetic', () => runRegisterTests('d', 0x22));
	test('ShiftELeftArithmetic', () => runRegisterTests('e', 0x23));
	test('ShiftHLeftArithmetic', () => runRegisterTests('h', 0x24));
	test('ShiftLLeftArithmetic', () => runRegisterTests('l', 0x25));
	// endregion

	test('ShiftHLAddressLeftArithmetic', () => {
		const operator = BitInstructions.getByCode(0x26);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('ShiftHLAddressLeftArithmetic');

		registers.h = 0xC0;
		registers.l = 0x00;

		memory.writeByte(0xC000, 0);
		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
		expect(registers.m).toBe(4);

		memory.writeByte(0xC000, 1);
		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(2);
		expect(registers.flags).toBe(0);
		expect(registers.m).toBe(4);

		memory.writeByte(0xC000, 0x80);
		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.CARRY | RegisterFlag.ZERO);
		expect(registers.m).toBe(4);
	});
});