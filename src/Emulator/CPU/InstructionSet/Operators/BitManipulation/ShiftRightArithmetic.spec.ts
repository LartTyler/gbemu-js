import {Gpu} from '../../../../GPU';
import {HardwareBus} from '../../../../Hardware';
import {Memory} from '../../../../Memory';
import {Cpu} from '../../../index';
import {RegisterFlag, RegisterKey} from '../../../Registers';
import {BitInstructions} from '../../index';

jest.mock('../../../../GPU');

describe('ShiftRightArithemetic operators', () => {
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
		expect(operator.name).toBe(`Shift${key.toUpperCase()}RightArithmetic`);

		registers[key] = 0;
		operator.invoke(hardware);

		expect(registers[key]).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
		expect(registers.m).toBe(2);

		registers[key] = 1;
		operator.invoke(hardware);

		expect(registers[key]).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.CARRY | RegisterFlag.ZERO);
		expect(registers.m).toBe(2);

		registers[key] = 0xC0;
		operator.invoke(hardware);

		expect(registers[key]).toBe(0xE0);
		expect(registers.flags).toBe(0);
		expect(registers.m).toBe(2);
	};

	test('ShiftARightArithmetic', () => runRegisterTests('a', 0x2F));
	test('ShiftBRightArithmetic', () => runRegisterTests('b', 0x28));
	test('ShiftCRightArithmetic', () => runRegisterTests('c', 0x29));
	test('ShiftDRightArithmetic', () => runRegisterTests('d', 0x2A));
	test('ShiftERightArithmetic', () => runRegisterTests('e', 0x2B));
	test('ShiftHRightArithmetic', () => runRegisterTests('h', 0x2C));
	test('ShiftLRightArithmetic', () => runRegisterTests('l', 0x2D));
	// endregion

	test('ShiftHLAddressRightArithmetic', () => {
		const operator = BitInstructions.getByCode(0x2E);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('ShiftHLAddressRightArithmetic');

		registers.h = 0xC0;
		registers.l = 0x00;

		memory.writeByte(0xC000, 0);
		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
		expect(registers.m).toBe(4);

		memory.writeByte(0xC000, 1);
		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.CARRY | RegisterFlag.ZERO);
		expect(registers.m).toBe(4);

		memory.writeByte(0xC000, 0xC0);
		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(0xE0);
		expect(registers.flags).toBe(0);
		expect(registers.m).toBe(4);
	});
});