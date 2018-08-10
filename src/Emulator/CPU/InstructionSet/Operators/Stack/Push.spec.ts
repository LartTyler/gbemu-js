import {Gpu} from '../../../../_GPU';
import {HardwareBus} from '../../../../Hardware';
import {Memory} from '../../../../Memory/Memory';
import {pairFrom16Bit} from '../../../../util';
import {Cpu} from '../../../index';
import {RegisterKey} from '../../../Registers';
import {PrimaryInstructions} from '../../index';

jest.mock('../../../../_GPU');

describe('Stack PUSH operators', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory(), new Gpu(null));
	const {memory, registers} = hardware;

	beforeEach(() => {
		memory.reset();
		hardware.cpu.reset();
	});

	const runTests = (high: RegisterKey, low: RegisterKey, opcode: number): void => {
		const operator = PrimaryInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`Push${(high + (low === 'flags' ? 'F' : low)).toUpperCase()}`);

		registers.stackPointer = 0xC0FF;
		[registers[high], registers[low]] = pairFrom16Bit(0);
		operator.invoke(hardware);

		expect(registers.stackPointer).toBe(0xC0FD);
		expect(memory.readWord(0xC0FD)).toBe(0);
		expect(registers.m).toBe(3);

		registers.stackPointer = 0xC0FF;
		[registers[high], registers[low]] = pairFrom16Bit(0xC0FF);
		operator.invoke(hardware);

		expect(registers.stackPointer).toBe(0xC0FD);
		expect(memory.readWord(0xC0FD)).toBe(0xC0FF);
		expect(registers.m).toBe(3);
	};

	test('PushBC', () => runTests('b', 'c', 0xC5));
	test('PushDE', () => runTests('d', 'e', 0xD5));
	test('PushHL', () => runTests('h', 'l', 0xE5));
	test('PushAF', () => runTests('a', 'flags', 0xF5));
});