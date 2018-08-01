import {Gpu} from '../../../../GPU';
import {HardwareBus} from '../../../../Hardware';
import {Memory} from '../../../../Memory';
import {pairFrom16Bit} from '../../../../util';
import {Cpu} from '../../../index';
import {RegisterFlag, RegisterKey} from '../../../Registers';
import {BitInstructions, PrimaryInstructions} from '../../index';
import {InstructionManagerInterface} from '../../InstructionManager';

jest.mock('../../../../GPU');

describe('RotateRightCarry operators', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory(), new Gpu(null));
	const {memory, registers} = hardware;

	beforeEach(() => {
		memory.reset();
		hardware.cpu.reset();
	});

	const runRegisterTests = (
		key: RegisterKey,
		fast: boolean,
		opcode: number,
		instructions: InstructionManagerInterface
	): void => {
		const operator = instructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`Rotate${key.toUpperCase()}RightCarry${fast ? 'Fast' : ''}`);

		const mtime = fast ? 1 : 2;

		registers[key] = 0;
		operator.invoke(hardware);

		expect(registers[key]).toBe(0);
		expect(registers.flags).toBe(fast ? 0 : RegisterFlag.ZERO);
		expect(registers.m).toBe(mtime);

		registers[key] = 1;
		operator.invoke(hardware);

		expect(registers[key]).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.CARRY | (fast ? 0 : RegisterFlag.ZERO));
		expect(registers.m).toBe(mtime);

		// Invoking operator on previous results for the next test
		operator.invoke(hardware);

		expect(registers[key]).toBe(0x80);
		expect(registers.flags).toBe(0);
		expect(registers.m).toBe(mtime);
	};

	test('RotateARightCarryFast', () => runRegisterTests('a', true, 0x1F, PrimaryInstructions));

	test('RotateARightCarry', () => runRegisterTests('a', false, 0x1F, BitInstructions));
	test('RotateBRightCarry', () => runRegisterTests('b', false, 0x18, BitInstructions));
	test('RotateCRightCarry', () => runRegisterTests('c', false, 0x19, BitInstructions));
	test('RotateDRightCarry', () => runRegisterTests('d', false, 0x1A, BitInstructions));
	test('RotateERightCarry', () => runRegisterTests('e', false, 0x1B, BitInstructions));
	test('RotateHRightCarry', () => runRegisterTests('h', false, 0x1C, BitInstructions));
	test('RotateLRightCarry', () => runRegisterTests('l', false, 0x1D, BitInstructions));

	test('RotateHLAddressRightCarry', () => {
		const operator = BitInstructions.getByCode(0x1E);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('RotateHLAddressRightCarry');

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

		// Invoking operator on previous results for the next test
		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(0x80);
		expect(registers.flags).toBe(0);
		expect(registers.m).toBe(4);
	});
});