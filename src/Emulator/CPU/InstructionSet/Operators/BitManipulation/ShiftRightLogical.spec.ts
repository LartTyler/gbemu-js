import {Gpu} from '../../../../GPU';
import {HardwareBus} from '../../../../Hardware';
import {Memory} from '../../../../Memory';
import {Cpu} from '../../../index';
import {RegisterFlag, RegisterKey} from '../../../Registers';
import {BitInstructions} from '../../index';

jest.mock('../../../../GPU');

describe('ShiftRightLogical operators', () => {
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
		expect(operator.name).toBe(`Shift${key.toUpperCase()}RightLogical`);

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

		registers[key] = 3;
		operator.invoke(hardware);

		expect(registers[key]).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.CARRY);
		expect(registers.m).toBe(2);
	};

	test('ShiftARightLogical', () => runRegisterTests('a', 0x3F));
	test('ShiftBRightLogical', () => runRegisterTests('b', 0x38));
	test('ShiftCRightLogical', () => runRegisterTests('c', 0x39));
	test('ShiftDRightLogical', () => runRegisterTests('d', 0x3A));
	test('ShiftERightLogical', () => runRegisterTests('e', 0x3B));
	test('ShiftHRightLogical', () => runRegisterTests('h', 0x3C));
	test('ShiftLRightLogical', () => runRegisterTests('l', 0x3D));
	// endregion

	test('ShiftHLAddressRightLogical', () => {
		const operator = BitInstructions.getByCode(0x3E);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`ShiftHLAddressRightLogical`);

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

		memory.writeByte(0xC000, 3);
		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.CARRY);
		expect(registers.m).toBe(4);
	});
});