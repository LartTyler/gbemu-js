import {Gpu} from '../../../../GPU';
import {HardwareBus} from '../../../../Hardware';
import {Memory} from '../../../../Memory';
import {Cpu} from '../../../index';
import {RegisterFlag, RegisterKey} from '../../../Registers';
import {BitInstructions, PrimaryInstructions} from '../../index';
import {InstructionManagerInterface} from '../../InstructionManager';

jest.mock('../../../../GPU');

describe('RotateLeftCarry operators', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory(), new Gpu(null));
	const {memory, registers} = hardware;

	beforeEach(() => {
		hardware.cpu.reset();
		memory.reset();
	});

	const runRegisterTests = (
		key: RegisterKey,
		fast: boolean,
		opcode: number,
		instructions: InstructionManagerInterface = PrimaryInstructions
	): void => {
		const operator = instructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`Rotate${key.toUpperCase()}LeftCarry${fast ? 'Fast' : ''}`);

		const mtime = fast ? 1 : 2;

		registers[key] = 0;
		operator.invoke(hardware);

		expect(registers[key]).toBe(0);
		expect(registers.flags).toBe(fast ? 0 : RegisterFlag.ZERO);
		expect(registers.m).toBe(mtime);

		registers[key] = 0x80;
		operator.invoke(hardware);

		expect(registers[key]).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.CARRY | (fast ? 0 : RegisterFlag.ZERO));
		expect(registers.m).toBe(mtime);

		// Invoking operator on previous results for the next test
		operator.invoke(hardware);

		expect(registers[key]).toBe(1);
		expect(registers.flags).toBe(0);
		expect(registers.m).toBe(mtime);
	};

	test('RotateALeftCarryFast', () => runRegisterTests('a', true, 0x17));

	test('RotateALeftCarry', () => runRegisterTests('a', false, 0x17, BitInstructions));
	test('RotateBLeftCarry', () => runRegisterTests('b', false, 0x10, BitInstructions));
	test('RotateCLeftCarry', () => runRegisterTests('c', false, 0x11, BitInstructions));
	test('RotateDLeftCarry', () => runRegisterTests('d', false, 0x12, BitInstructions));
	test('RotateELeftCarry', () => runRegisterTests('e', false, 0x13, BitInstructions));
	test('RotateHLeftCarry', () => runRegisterTests('h', false, 0x14, BitInstructions));
	test('RotateLLeftCarry', () => runRegisterTests('l', false, 0x15, BitInstructions));
});