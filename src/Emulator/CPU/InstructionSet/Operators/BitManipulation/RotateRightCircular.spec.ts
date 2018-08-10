import {Gpu} from '../../../../_GPU';
import {HardwareBus} from '../../../../Hardware';
import {Memory} from '../../../../Memory/Memory';
import {Cpu} from '../../../index';
import {RegisterFlag, RegisterKey} from '../../../Registers';
import {BitInstructions, PrimaryInstructions} from '../../index';
import {InstructionManagerInterface} from '../../InstructionManager';

jest.mock('../../../../_GPU');

describe('RotateRightCircular operations', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory(), new Gpu(null));
	const {memory, registers} = hardware;

	beforeEach(() => {
		memory.reset();
		hardware.cpu.reset();
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
		expect(operator.name).toBe(`Rotate${key.toUpperCase()}RightCircular${fast ? 'Fast' : ''}`);

		const mtime = fast ? 1 : 2;

		registers[key] = 0;
		operator.invoke(hardware);

		expect(registers[key]).toBe(0);
		expect(registers.flags).toBe(fast ? 0 : RegisterFlag.ZERO);
		expect(registers.m).toBe(mtime);

		registers[key] = 1;
		operator.invoke(hardware);

		expect(registers[key]).toBe(0x80);
		expect(registers.flags).toBe(RegisterFlag.CARRY);
		expect(registers.m).toBe(mtime);

		// Invoking the operator on the previous result
		operator.invoke(hardware);

		expect(registers[key]).toBe(0x40);
		expect(registers.flags).toBe(0);
		expect(registers.m).toBe(mtime);
	};

	test('RotateARightCircularFast', () => runRegisterTests('a', true, 0x0F, PrimaryInstructions));

	test('RotateARightCircular', () => runRegisterTests('a', false, 0x0F, BitInstructions));
	test('RotateBRightCircular', () => runRegisterTests('b', false, 0x08, BitInstructions));
	test('RotateCRightCircular', () => runRegisterTests('c', false, 0x09, BitInstructions));
	test('RotateDRightCircular', () => runRegisterTests('d', false, 0x0A, BitInstructions));
	test('RotateERightCircular', () => runRegisterTests('e', false, 0x0B, BitInstructions));
	test('RotateHRightCircular', () => runRegisterTests('h', false, 0x0C, BitInstructions));
	test('RotateLRightCircular', () => runRegisterTests('l', false, 0x0D, BitInstructions));
	// endregion

	test('RotateHLAddressRightCircular', () => {
		const operator = BitInstructions.getByCode(0x0E);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('RotateHLAddressRightCircular');

		registers.h = 0xC0;
		registers.l = 0x00;

		memory.writeByte(0xC000, 0);
		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
		expect(registers.m).toBe(4);

		memory.writeByte(0xC000, 1);
		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(0x80);
		expect(registers.flags).toBe(RegisterFlag.CARRY);
		expect(registers.m).toBe(4);

		// Invoking the operator on the previous result
		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(0x40);
		expect(registers.flags).toBe(0);
		expect(registers.m).toBe(4);
	});
});