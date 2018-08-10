import {Gpu} from '../../../../_GPU';
import {HardwareBus} from '../../../../Hardware';
import {Memory} from '../../../../Memory/Memory';
import {Cpu} from '../../../index';
import {RegisterFlag, RegisterKey} from '../../../Registers';
import {BitInstructions} from '../../index';

jest.mock('../../../../_GPU');

describe('ShiftLeft', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory(), new Gpu(null));
	const registers = hardware.registers;

	const runSwapTests = (target: RegisterKey, opcode: number): void => {
		const operator = BitInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`SwapRegister${target.toUpperCase()}Nibbles`);

		registers[target] = 0;

		operator.invoke(hardware);

		expect(registers[target]).toBe(0);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.ZERO);

		registers[target] = 0b11001010;

		operator.invoke(hardware);

		expect(registers[target]).toBe(0b10101100);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(0);
	};

	test('SwapRegisterANibbles', () => runSwapTests('a', 0x37));
	test('SwapRegisterBNibbles', () => runSwapTests('b', 0x30));
	test('SwapRegisterCNibbles', () => runSwapTests('c', 0x31));
	test('SwapRegisterDNibbles', () => runSwapTests('d', 0x32));
	test('SwapRegisterENibbles', () => runSwapTests('e', 0x33));
	test('SwapRegisterHNibbles', () => runSwapTests('h', 0x34));
	test('SwapRegisterLNibbles', () => runSwapTests('l', 0x35));
});