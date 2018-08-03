import {Gpu} from '../../../../GPU';
import {HardwareBus} from '../../../../Hardware';
import {Memory} from '../../../../Memory';
import {Cpu} from '../../../index';
import {RegisterFlag, RegisterKey} from '../../../Registers';
import {BitInstructions, PrimaryInstructions} from '../../index';
import {InstructionManagerInterface} from '../../InstructionManager';

jest.mock('../../../../GPU');

describe('RotateLeftCircular operators', () => {
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
		expect(operator.name).toBe(`Rotate${key.toUpperCase()}LeftCircular${fast ? 'Fast' : ''}`);

		const mtime = fast ? 1 : 2;

		registers[key] = 0;
		operator.invoke(hardware);

		expect(registers[key]).toBe(0);
		expect(registers.flags).toBe(fast ? 0 : RegisterFlag.ZERO);
		expect(registers.m).toBe(mtime);

		registers[key] = 0x80;
		operator.invoke(hardware);

		expect(registers[key]).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.CARRY);
		expect(registers.m).toBe(mtime);

		// Invoking the operator on the previous result
		operator.invoke(hardware);

		expect(registers[key]).toBe(2);
		expect(registers.flags).toBe(0);
		expect(registers.m).toBe(mtime);
	};

	test('RotateALeftCircularFast', () => runRegisterTests('a', true, 0x07, PrimaryInstructions));

	test('RotateALeftCircular', () => runRegisterTests('a', false, 0x07, BitInstructions));
	test('RotateBLeftCircular', () => runRegisterTests('b', false, 0x00, BitInstructions));
	test('RotateCLeftCircular', () => runRegisterTests('c', false, 0x01, BitInstructions));
	test('RotateDLeftCircular', () => runRegisterTests('d', false, 0x02, BitInstructions));
	test('RotateELeftCircular', () => runRegisterTests('e', false, 0x03, BitInstructions));
	test('RotateHLeftCircular', () => runRegisterTests('h', false, 0x04, BitInstructions));
	test('RotateLLeftCircular', () => runRegisterTests('l', false, 0x05, BitInstructions));
	// endregion

	test('RotateHLAddressLeftCircular', () => {
		const operator = BitInstructions.getByCode(0x06);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('RotateHLAddressLeftCircular');

		registers.h = 0xC0;
		registers.l = 0x00;

		memory.writeByte(0xC000, 0);
		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(0);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
		expect(registers.m).toBe(4);

		memory.writeByte(0xC000, 0x80);
		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.CARRY);
		expect(registers.m).toBe(4);

		// Invoking the operator on the previous result
		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(2);
		expect(registers.flags).toBe(0);
		expect(registers.m).toBe(4);
	});
});