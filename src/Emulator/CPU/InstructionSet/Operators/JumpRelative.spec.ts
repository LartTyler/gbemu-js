import {Gpu} from '../../../GPU';
import {HardwareBus} from '../../../Hardware';
import {Memory} from '../../../Memory';
import {Cpu} from '../../index';
import {RegisterFlag} from '../../Registers';
import {PrimaryInstructions} from '../index';
import {OperatorInterface} from '../InstructionManager';

jest.mock('../../../GPU');

describe('JumpRelative operators', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory(), new Gpu(null));
	const {memory, registers} = hardware;

	beforeEach(() => {
		hardware.cpu.reset();
	});

	const getOperator = (opcode: number, name: string): OperatorInterface => {
		const operator = PrimaryInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(name);

		return operator;
	};

	test('JumpRelative', () => {
		const operator = getOperator(0x18, 'JumpRelative');

		registers.programCount = 0xC000;
		memory.writeByte(registers.programCount, 0);
		operator.invoke(hardware);

		expect(registers.programCount).toBe(0xC001);
		expect(registers.m).toBe(3);

		registers.programCount = 0xC000;
		memory.writeByte(registers.programCount, 10);
		operator.invoke(hardware);

		expect(registers.programCount).toBe(0xC00B);
		expect(registers.m).toBe(3);

		registers.programCount = 0xC000;
		memory.writeByte(0xC000, 200);
		operator.invoke(hardware);

		expect(registers.programCount).toBe(0xBFC9);
		expect(registers.m).toBe(3);
	});

	test('JumpRelativeIfZeroReset', () => {
		const operator = getOperator(0x20, 'JumpRelativeIfZeroReset');

		registers.programCount = 0xC000;
		memory.writeWord(registers.programCount, 10);
		operator.invoke(hardware);

		expect(registers.programCount).toBe(0xC00B);
		expect(registers.m).toBe(3);

		registers.programCount = 0xC000;
		memory.writeByte(registers.programCount, 200);
		operator.invoke(hardware);

		expect(registers.programCount).toBe(0xBFC9);
		expect(registers.m).toBe(3);

		registers.flags = RegisterFlag.ZERO;
		registers.programCount = 0xC000;
		memory.writeWord(registers.programCount, 10);
		operator.invoke(hardware);

		expect(registers.programCount).toBe(0xC001);
		expect(registers.m).toBe(2);
	});

	test('JumpRelativeIfZeroSet', () => {
		const operator = getOperator(0x28, 'JumpRelativeIfZeroSet');

		registers.flags = RegisterFlag.ZERO;
		registers.programCount = 0xC000;
		memory.writeWord(registers.programCount, 10);
		operator.invoke(hardware);

		expect(registers.programCount).toBe(0xC00B);
		expect(registers.m).toBe(3);

		registers.programCount = 0xC000;
		memory.writeByte(registers.programCount, 200);
		operator.invoke(hardware);

		expect(registers.programCount).toBe(0xBFC9);
		expect(registers.m).toBe(3);

		registers.flags = 0;
		registers.programCount = 0xC000;
		memory.writeWord(registers.programCount, 10);
		operator.invoke(hardware);

		expect(registers.programCount).toBe(0xC001);
		expect(registers.m).toBe(2);
	});

	test('JumpRelativeIfCarryReset', () => {
		const operator = getOperator(0x30, 'JumpRelativeIfCarryReset');

		registers.programCount = 0xC000;
		memory.writeWord(registers.programCount, 10);
		operator.invoke(hardware);

		expect(registers.programCount).toBe(0xC00B);
		expect(registers.m).toBe(3);

		registers.programCount = 0xC000;
		memory.writeByte(registers.programCount, 200);
		operator.invoke(hardware);

		expect(registers.programCount).toBe(0xBFC9);
		expect(registers.m).toBe(3);

		registers.flags = RegisterFlag.CARRY;
		registers.programCount = 0xC000;
		memory.writeWord(registers.programCount, 10);
		operator.invoke(hardware);

		expect(registers.programCount).toBe(0xC001);
		expect(registers.m).toBe(2);
	});

	test('JumpRelativeIfCarrySet', () => {
		const operator = getOperator(0x38, 'JumpRelativeIfCarrySet');

		registers.flags = RegisterFlag.CARRY;
		registers.programCount = 0xC000;
		memory.writeWord(registers.programCount, 10);
		operator.invoke(hardware);

		expect(registers.programCount).toBe(0xC00B);
		expect(registers.m).toBe(3);

		registers.programCount = 0xC000;
		memory.writeByte(registers.programCount, 200);
		operator.invoke(hardware);

		expect(registers.programCount).toBe(0xBFC9);
		expect(registers.m).toBe(3);

		registers.flags = 0;
		registers.programCount = 0xC000;
		memory.writeWord(registers.programCount, 10);
		operator.invoke(hardware);

		expect(registers.programCount).toBe(0xC001);
		expect(registers.m).toBe(2);
	});
});