import {Gpu} from '../../../../GPU';
import {HardwareBus} from '../../../../Hardware';
import {Memory} from '../../../../Memory';
import {Cpu} from '../../../index';
import {RegisterFlag} from '../../../Registers';
import {PrimaryInstructions} from '../../index';
import {OperatorInterface} from '../../InstructionManager';

jest.mock('../../../../GPU');

describe('Return operators', () => {
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

	test('Return', () => {
		const operator = getOperator(0xC9, 'Return');

		registers.stackPointer = 0xC000;
		memory.writeWord(registers.stackPointer, 0);
		operator.invoke(hardware);

		expect(registers.stackPointer).toBe(0xC002);
		expect(registers.programCount).toBe(0);
		expect(registers.m).toBe(3);

		registers.stackPointer = 0xC000;
		memory.writeWord(registers.stackPointer, 0xC0FF);
		operator.invoke(hardware);

		expect(registers.stackPointer).toBe(0xC002);
		expect(registers.programCount).toBe(0xC0FF);
		expect(registers.m).toBe(3);
	});

	test('ReturnIfZeroReset', () => {
		const operator = getOperator(0xC0, 'ReturnIfZeroReset');

		registers.stackPointer = 0xC000;
		memory.writeWord(registers.stackPointer, 0xC0FF);
		operator.invoke(hardware);

		expect(registers.stackPointer).toBe(0xC002);
		expect(registers.programCount).toBe(0xC0FF);
		expect(registers.m).toBe(3);

		registers.flags = RegisterFlag.ZERO;
		registers.stackPointer = 0xC000;
		registers.programCount = 0xC0F0;
		memory.writeWord(registers.stackPointer, 0xC0FF);
		operator.invoke(hardware);

		expect(registers.stackPointer).toBe(0xC000);
		expect(registers.programCount).toBe(0xC0F2);
		expect(registers.m).toBe(1);
	});

	test('ReturnIfZeroSet', () => {
		const operator = getOperator(0xC8, 'ReturnIfZeroSet');

		registers.flags = RegisterFlag.ZERO;
		registers.stackPointer = 0xC000;
		memory.writeWord(registers.stackPointer, 0xC0FF);
		operator.invoke(hardware);

		expect(registers.stackPointer).toBe(0xC002);
		expect(registers.programCount).toBe(0xC0FF);
		expect(registers.m).toBe(3);

		registers.flags = 0;
		registers.stackPointer = 0xC000;
		registers.programCount = 0xC0F0;
		memory.writeWord(registers.stackPointer, 0xC0FF);
		operator.invoke(hardware);

		expect(registers.stackPointer).toBe(0xC000);
		expect(registers.programCount).toBe(0xC0F2);
		expect(registers.m).toBe(1);
	});

	test('ReturnIfCarryReset', () => {
		const operator = getOperator(0xD0, 'ReturnIfCarryReset');

		registers.stackPointer = 0xC000;
		memory.writeWord(registers.stackPointer, 0xC0FF);
		operator.invoke(hardware);

		expect(registers.stackPointer).toBe(0xC002);
		expect(registers.programCount).toBe(0xC0FF);
		expect(registers.m).toBe(3);

		registers.flags = RegisterFlag.CARRY;
		registers.stackPointer = 0xC000;
		registers.programCount = 0xC0F0;
		memory.writeWord(registers.stackPointer, 0xC0FF);
		operator.invoke(hardware);

		expect(registers.stackPointer).toBe(0xC000);
		expect(registers.programCount).toBe(0xC0F2);
		expect(registers.m).toBe(1);
	});

	test('ReturnIfCarrySet', () => {
		const operator = getOperator(0xD8, 'ReturnIfCarrySet');

		registers.flags = RegisterFlag.CARRY;
		registers.stackPointer = 0xC000;
		memory.writeWord(registers.stackPointer, 0xC0FF);
		operator.invoke(hardware);

		expect(registers.stackPointer).toBe(0xC002);
		expect(registers.programCount).toBe(0xC0FF);
		expect(registers.m).toBe(3);

		registers.flags = 0;
		registers.stackPointer = 0xC000;
		registers.programCount = 0xC0F0;
		memory.writeWord(registers.stackPointer, 0xC0FF);
		operator.invoke(hardware);

		expect(registers.stackPointer).toBe(0xC000);
		expect(registers.programCount).toBe(0xC0F2);
		expect(registers.m).toBe(1);
	});

	test('ReturnInterrupt', () => {
		const operator = getOperator(0xD9, 'ReturnInterrupt');
		const cpu = hardware.cpu;

		cpu.allowInterrupts = true;
		registers.stackPointer = 0xC000;
		memory.writeWord(registers.stackPointer, 0);
		operator.invoke(hardware);

		expect(cpu.allowInterrupts).toBe(true);
		expect(registers.stackPointer).toBe(0xC002);
		expect(registers.programCount).toBe(0);
		expect(registers.m).toBe(3);

		cpu.allowInterrupts = false;
		registers.stackPointer = 0xC000;
		memory.writeWord(registers.stackPointer, 0xC0FF);
		operator.invoke(hardware);

		expect(cpu.allowInterrupts).toBe(true);
		expect(registers.stackPointer).toBe(0xC002);
		expect(registers.programCount).toBe(0xC0FF);
		expect(registers.m).toBe(3);
	});
});