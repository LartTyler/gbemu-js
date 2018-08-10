import {Gpu} from '../../../../_GPU';
import {HardwareBus} from '../../../../Hardware';
import {Memory} from '../../../../Memory/Memory';
import {Cpu} from '../../../index';
import {RegisterKey} from '../../../Registers';
import {PrimaryInstructions} from '../../index';

jest.mock('../../../../_GPU');

describe('Stack POP operators', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory(), new Gpu(null));
	const {memory, registers} = hardware;

	beforeEach(() => {
		memory.reset();
		hardware.cpu.reset();
	});

	const runTests = (high: RegisterKey, low: RegisterKey, opcode: number): void => {
		const operator = PrimaryInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`Pop${(high + (low === 'flags' ? 'F' : low)).toUpperCase()}`);

		registers.stackPointer = 0xC000;

		memory.writeWord(registers.stackPointer, 0);
		operator.invoke(hardware);

		expect(registers[high]).toBe(0);
		expect(registers[low]).toBe(0);
		expect(registers.stackPointer).toBe(0xC002);
		expect(registers.m).toBe(3);

		memory.writeWord(registers.stackPointer, 255);
		operator.invoke(hardware);

		expect(registers[high]).toBe(0);
		expect(registers[low]).toBe(255);
		expect(registers.stackPointer).toBe(0xC004);
		expect(registers.m).toBe(3);

		memory.writeWord(registers.stackPointer, 0xC0FF);
		operator.invoke(hardware);

		expect(registers[high]).toBe(0xC0);
		expect(registers[low]).toBe(0xFF);
		expect(registers.stackPointer).toBe(0xC006);
		expect(registers.m).toBe(3);
	};

	test('PopBC', () => runTests('b', 'c', 0xC1));
	test('PopDE', () => runTests('d', 'e', 0xD1));
	test('PopHL', () => runTests('h', 'l', 0xE1));
	test('PopAF', () => runTests('a', 'flags', 0xF1));
});