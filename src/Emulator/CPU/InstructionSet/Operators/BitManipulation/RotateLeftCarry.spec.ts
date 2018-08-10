import {Gpu} from '../../../../_GPU';
import {HardwareBus} from '../../../../Hardware';
import {Memory} from '../../../../Memory/Memory';
import {Cpu} from '../../../index';
import {RegisterFlag, RegisterKey} from '../../../Registers';
import {BitInstructions, PrimaryInstructions} from '../../index';
import {InstructionManagerInterface} from '../../InstructionManager';

jest.mock('../../../../_GPU');

describe('RotateLeftCarry operators', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory(), new Gpu(null));
	const {memory, registers} = hardware;

	beforeEach(() => {
		hardware.cpu.reset();
		memory.reset();
	});

	// region Registers
	const runRegisterTests = (
		key: RegisterKey,
		fast: boolean,
		opcode: number,
		instructions: InstructionManagerInterface
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

	test('RotateALeftCarryFast', () => runRegisterTests('a', true, 0x17, PrimaryInstructions));

	test('RotateALeftCarry', () => runRegisterTests('a', false, 0x17, BitInstructions));
	test('RotateBLeftCarry', () => runRegisterTests('b', false, 0x10, BitInstructions));
	test('RotateCLeftCarry', () => runRegisterTests('c', false, 0x11, BitInstructions));
	test('RotateDLeftCarry', () => runRegisterTests('d', false, 0x12, BitInstructions));
	test('RotateELeftCarry', () => runRegisterTests('e', false, 0x13, BitInstructions));
	test('RotateHLeftCarry', () => runRegisterTests('h', false, 0x14, BitInstructions));
	test('RotateLLeftCarry', () => runRegisterTests('l', false, 0x15, BitInstructions));
	// endregion

	test('RotateHLAddressLeftCarry', () => {
		const operator = BitInstructions.getByCode(0x16);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('RotateHLAddressLeftCarry');

		registers.h = 0xC0;
		registers.l = 0x00;

		memory.writeByte(0xC000, 0);
		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
		expect(registers.m).toBe(4);

		memory.writeByte(0xC000, 0x80);
		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.CARRY | RegisterFlag.ZERO);
		expect(registers.m).toBe(4);

		// Invoking operator on previous results for the next test
		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(1);
		expect(registers.flags).toBe(0);
		expect(registers.m).toBe(4);
	});
});