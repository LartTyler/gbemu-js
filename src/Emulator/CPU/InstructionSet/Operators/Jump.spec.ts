import {Gpu} from '../../../GPU/index';
import {HardwareBus} from '../../../Hardware';
import {Memory} from '../../../Memory/index';
import {Cpu} from '../../index';
import {RegisterFlag} from '../../Registers';
import {PrimaryInstructions} from '../index';
import {OperatorInterface} from '../InstructionManager';

jest.mock('../../../GPU');

describe('Jump operators', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory(), new Gpu(null));
	const {memory, registers} = hardware;

	beforeEach(() => {
		memory.reset();
		hardware.cpu.reset();
	});

	const getOperator = (opcode: number, name: string): OperatorInterface => {
		const operator = PrimaryInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(name);

		return operator;
	};

	test('Jump', () => {
		const operator = getOperator(0xC3, 'Jump');

		registers.programCount = 0xC000;
		memory.writeWord(registers.programCount, 0);
		operator.invoke(hardware);

		expect(registers.programCount).toBe(0);
		expect(registers.m).toBe(3);

		registers.programCount = 0xC000;
		memory.writeWord(registers.programCount, 0xC0FF);
		operator.invoke(hardware);

		expect(registers.programCount).toBe(0xC0FF);
		expect(registers.m).toBe(3);
	});

	test('JumpToHLAddress', () => {
		const operator = getOperator(0xE9, 'JumpHL');

		registers.h = 0xC0;
		registers.l = 0x00;
		registers.programCount = 0;
		operator.invoke(hardware);

		expect(registers.programCount).toBe(0xC000);
		expect(registers.m).toBe(1);

		registers.h = 0;
		registers.l = 0;
		registers.programCount = 0xC000;
		operator.invoke(hardware);

		expect(registers.programCount).toBe(0);
		expect(registers.m).toBe(1);
	});

	test('JumpIfZeroReset', () => {
		const operator = getOperator(0xC2, 'JumpIfZeroReset');

		registers.programCount = 0xC000;
		memory.writeWord(registers.programCount, 0xC0FF);
		operator.invoke(hardware);

		expect(registers.programCount).toBe(0xC0FF);
		expect(registers.m).toBe(4);

		registers.flags = RegisterFlag.ZERO;
		registers.programCount = 0xC000;
		memory.writeWord(registers.programCount, 0xC0FF);
		operator.invoke(hardware);

		expect(registers.programCount).toBe(0xC002);
		expect(registers.m).toBe(3);
	});

	test('JumpIfZeroSet', () => {
		const operator = getOperator(0xCA, 'JumpIfZeroSet');

		registers.programCount = 0xC000;
		memory.writeWord(registers.programCount, 0xC0FF);
		operator.invoke(hardware);

		expect(registers.programCount).toBe(0xC002);
		expect(registers.m).toBe(3);

		registers.flags = RegisterFlag.ZERO;
		registers.programCount = 0xC000;
		memory.writeWord(registers.programCount, 0xC0FF);
		operator.invoke(hardware);

		expect(registers.programCount).toBe(0xC0FF);
		expect(registers.m).toBe(4);
	});

	test('JumpIfCarryReset', () => {
		const operator = getOperator(0xD2, 'JumpIfCarryReset');

		registers.programCount = 0xC000;
		memory.writeWord(registers.programCount, 0xC0FF);
		operator.invoke(hardware);

		expect(registers.programCount).toBe(0xC0FF);
		expect(registers.m).toBe(4);

		registers.flags = RegisterFlag.CARRY;
		registers.programCount = 0xC000;
		memory.writeByte(registers.programCount, 0xC0FF);
		operator.invoke(hardware);

		expect(registers.programCount).toBe(0xC002);
		expect(registers.m).toBe(3);
	});

	test('JumpIfCarrySet', () => {
		const operator = getOperator(0xDA, 'JumpIfCarrySet');

		registers.programCount = 0xC000;
		memory.writeWord(registers.programCount, 0xC0FF);
		operator.invoke(hardware);

		expect(registers.programCount).toBe(0xC002);
		expect(registers.m).toBe(3);

		registers.flags = RegisterFlag.CARRY;
		registers.programCount = 0xC000;
		memory.writeWord(registers.programCount, 0xC0FF);
		operator.invoke(hardware);

		expect(registers.programCount).toBe(0xC0FF);
		expect(registers.m).toBe(4);
	});
});