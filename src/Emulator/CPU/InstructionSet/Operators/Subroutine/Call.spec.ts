import {Gpu} from '../../../../GPU';
import {HardwareBus} from '../../../../Hardware';
import {Memory} from '../../../../Memory';
import {Cpu} from '../../../index';
import {RegisterFlag} from '../../../Registers';
import {PrimaryInstructions} from '../../index';
import {OperatorInterface} from '../../InstructionManager';

jest.mock('../../../../GPU');

describe('Call operators', () => {
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

	test('Call', () => {
		const operator = getOperator(0xCD, 'Call');

		registers.stackPointer = 0xC00F;
		registers.programCount = 0xC0F0;
		memory.writeWord(registers.programCount, 0);
		operator.invoke(hardware);

		expect(registers.stackPointer).toBe(0xC00D);
		expect(registers.programCount).toBe(0);
		expect(memory.readWord(registers.stackPointer)).toBe(0xC0F2);
		expect(registers.m).toBe(5);

		registers.stackPointer = 0xC00F;
		registers.programCount = 0xC0F0;
		memory.writeWord(registers.programCount, 0xCFFF);
		operator.invoke(hardware);

		expect(registers.stackPointer).toBe(0xC00D);
		expect(registers.programCount).toBe(0xCFFF);
		expect(memory.readWord(registers.stackPointer)).toBe(0xC0F2);
		expect(registers.m).toBe(5);
	});

	test('CallIfZeroReset', () => {
		const operator = getOperator(0xC4, 'CallIfZeroReset');

		registers.stackPointer = 0xC00F;
		registers.programCount = 0xC0F0;
		memory.writeWord(registers.programCount, 0xCFFF);
		operator.invoke(hardware);

		expect(registers.stackPointer).toBe(0xC00D);
		expect(registers.programCount).toBe(0xCFFF);
		expect(memory.readWord(registers.stackPointer)).toBe(0xC0F2);
		expect(registers.m).toBe(5);

		registers.flags = RegisterFlag.ZERO;
		registers.stackPointer = 0xC00F;
		registers.programCount = 0xC0F0;
		memory.writeWord(registers.stackPointer, 5);
		memory.writeWord(registers.programCount, 0xCFFF);
		operator.invoke(hardware);

		expect(registers.stackPointer).toBe(0xC00F);
		expect(registers.programCount).toBe(0xC0F2);
		expect(memory.readWord(registers.stackPointer)).toBe(5);
		expect(registers.m).toBe(3);
	});

	test('CallIfZeroSet', () => {
		const operator = getOperator(0xCC, 'CallIfZeroSet');

		registers.flags = RegisterFlag.ZERO;
		registers.stackPointer = 0xC00F;
		registers.programCount = 0xC0F0;
		memory.writeWord(registers.programCount, 0xCFFF);
		operator.invoke(hardware);

		expect(registers.stackPointer).toBe(0xC00D);
		expect(registers.programCount).toBe(0xCFFF);
		expect(memory.readWord(registers.stackPointer)).toBe(0xC0F2);
		expect(registers.m).toBe(5);

		registers.flags = 0;
		registers.stackPointer = 0xC00F;
		registers.programCount = 0xC0F0;
		memory.writeWord(registers.stackPointer, 5);
		memory.writeWord(registers.programCount, 0xCFFF);
		operator.invoke(hardware);

		expect(registers.stackPointer).toBe(0xC00F);
		expect(registers.programCount).toBe(0xC0F2);
		expect(memory.readWord(registers.stackPointer)).toBe(5);
		expect(registers.m).toBe(3);
	});

	test('CallIfCarryReset', () => {
		const operator = getOperator(0xD4, 'CallIfCarryReset');

		registers.stackPointer = 0xC00F;
		registers.programCount = 0xC0F0;
		memory.writeWord(registers.programCount, 0xCFFF);
		operator.invoke(hardware);

		expect(registers.stackPointer).toBe(0xC00D);
		expect(registers.programCount).toBe(0xCFFF);
		expect(memory.readWord(registers.stackPointer)).toBe(0xC0F2);
		expect(registers.m).toBe(5);

		registers.flags = RegisterFlag.CARRY;
		registers.stackPointer = 0xC00F;
		registers.programCount = 0xC0F0;
		memory.writeWord(registers.stackPointer, 5);
		memory.writeWord(registers.programCount, 0xCFFF);
		operator.invoke(hardware);

		expect(registers.stackPointer).toBe(0xC00F);
		expect(registers.programCount).toBe(0xC0F2);
		expect(memory.readWord(registers.stackPointer)).toBe(5);
		expect(registers.m).toBe(3);
	});

	test('CallIfCarrySet', () => {
		const operator = getOperator(0xDC, 'CallIfCarrySet');

		registers.flags = RegisterFlag.CARRY;
		registers.stackPointer = 0xC00F;
		registers.programCount = 0xC0F0;
		memory.writeWord(registers.programCount, 0xCFFF);
		operator.invoke(hardware);

		expect(registers.stackPointer).toBe(0xC00D);
		expect(registers.programCount).toBe(0xCFFF);
		expect(memory.readWord(registers.stackPointer)).toBe(0xC0F2);
		expect(registers.m).toBe(5);

		registers.flags = 0;
		registers.stackPointer = 0xC00F;
		registers.programCount = 0xC0F0;
		memory.writeWord(registers.stackPointer, 5);
		memory.writeWord(registers.programCount, 0xCFFF);
		operator.invoke(hardware);

		expect(registers.stackPointer).toBe(0xC00F);
		expect(registers.programCount).toBe(0xC0F2);
		expect(memory.readWord(registers.stackPointer)).toBe(5);
		expect(registers.m).toBe(3);
	});
});