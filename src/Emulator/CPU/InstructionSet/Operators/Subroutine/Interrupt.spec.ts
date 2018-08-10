import {Gpu} from '../../../../_GPU';
import {HardwareBus} from '../../../../Hardware';
import {Memory} from '../../../../Memory/Memory';
import {toHex} from '../../../../util';
import {Cpu} from '../../../index';
import {PrimaryInstructions} from '../../index';
import {OperatorInterface} from '../../InstructionManager';

jest.mock('../../../../_GPU');

describe('Interrupt jump operators', () => {
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

	const runTests = (target: number, opcode: number): void => {
		const operator = getOperator(opcode, `InterruptJumpTo${toHex(target, 2, false)}h`);

		registers.programCount = 0xC000;
		registers.stackPointer = 0xC0FF;
		operator.invoke(hardware);

		expect(registers.programCount).toBe(target);
		expect(registers.stackPointer).toBe(0xC0FD);
		expect(memory.readWord(registers.stackPointer)).toBe(0xC000);
		expect(registers.m).toBe(3);
	};

	test('InterruptJumpTo00h', () => runTests(0x00, 0xC7));
	test('InterruptJumpTo08h', () => runTests(0x08, 0xCF));
	test('InterruptJumpTo10h', () => runTests(0x10, 0xD7));
	test('InterruptJumpTo18h', () => runTests(0x18, 0xDF));
	test('InterruptJumpTo20h', () => runTests(0x20, 0xE7));
	test('InterruptJumpTo28h', () => runTests(0x28, 0xEF));
	test('InterruptJumpTo30h', () => runTests(0x30, 0xF7));
	test('InterruptJumpTo38h', () => runTests(0x38, 0xFF));

	test('DisableInterrupts', () => {
		const operator = getOperator(0xF3, 'DisableInterrupts');
		const cpu = hardware.cpu;

		cpu.allowInterrupts = true;
		operator.invoke(hardware);

		expect(cpu.allowInterrupts).toBe(false);
		expect(registers.m).toBe(1);

		operator.invoke(hardware);

		expect(cpu.allowInterrupts).toBe(false);
		expect(registers.m).toBe(1);
	});

	test('EnableInterrupts', () => {
		const operator = getOperator(0xFB, 'EnableInterrupts');
		const cpu = hardware.cpu;

		cpu.allowInterrupts = true;
		operator.invoke(hardware);

		expect(cpu.allowInterrupts).toBe(true);
		expect(registers.m).toBe(1);

		operator.invoke(hardware);

		expect(cpu.allowInterrupts).toBe(true);
		expect(registers.m).toBe(1);
	});
});