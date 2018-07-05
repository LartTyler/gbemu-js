import {Gpu} from '../../../GPU';
import {HardwareBus, HardwareBusInterface} from '../../../Hardware';
import {Memory} from '../../../Memory';
import {Cpu} from '../../index';
import {RegisterKey} from '../../Registers';
import {PrimaryInstructions} from '../index';

jest.mock('../../../GPU');

const init = (): HardwareBusInterface => {
	const cpu = new Cpu();
	const memory = new Memory();
	const gpu = new Gpu(null);

	const hardware = new HardwareBus(cpu, memory, gpu);

	cpu.setHardwareBus(hardware);
	memory.setHardwareBus(hardware);
	gpu.setHardwareBus(hardware);

	return hardware;
};

describe('Load Operators', () => {
	const hardware = init();

	const {memory, registers} = hardware;

	beforeEach(() => {
		hardware.cpu.reset();
		hardware.memory.reset();
	});

	const runRegisterTests = (source: RegisterKey, destination: RegisterKey, opcode: number): void => {
		const operator = PrimaryInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`LoadRegister${source.toUpperCase()}Into${destination.toUpperCase()}`);

		registers[destination] = 1;
		registers[source] = 3;

		operator.invoke(hardware);

		expect(registers[destination]).toBe(3);
	};

	const runHLAddressRegisterTests = (destination: RegisterKey, opcode: number): void => {
		const operator = PrimaryInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`LoadHLAddressInto${destination.toUpperCase()}`);

		registers[destination] = 1;
		registers.h = 0xC0;
		registers.l = 0;

		memory.writeByte(0xC000, 3);

		operator.invoke(hardware);

		expect(registers[destination]).toBe(3);
	};

	const runPCAddressRegisterTests = (destination: RegisterKey, opcode: number): void => {
		const operator = PrimaryInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`LoadPCAddressInto${destination.toUpperCase()}`);

		registers[destination] = 1;
		registers.programCount = 0xC000;

		memory.writeByte(0xC000, 3);

		operator.invoke(hardware);

		expect(registers[destination]).toBe(3);
		expect(registers.programCount).toBe(0xC001);
	};

	test('Load register B into A', () => runRegisterTests('b', 'a', 0x78));
	test('Load register C into A', () => runRegisterTests('c', 'a', 0x79));
	test('Load register D into A', () => runRegisterTests('d', 'a', 0x7A));
	test('Load register E into A', () => runRegisterTests('e', 'a', 0x7B));
	test('Load register H into A', () => runRegisterTests('h', 'a', 0x7C));
	test('Load register L into A', () => runRegisterTests('l', 'a', 0x7D));
	test('Load HL address into A', () => runHLAddressRegisterTests('a', 0x7E));
	test('Load register A into A', () => runRegisterTests('a', 'a', 0x7F));
	test('Load PC address into A', () => runPCAddressRegisterTests('a', 0x3E));

	test('Load register B into B', () => runRegisterTests('b', 'b', 0x40));
	test('Load register C into B', () => runRegisterTests('c', 'b', 0x41));
	test('Load register D into B', () => runRegisterTests('d', 'b', 0x42));
	test('Load register E into B', () => runRegisterTests('e', 'b', 0x43));
	test('Load register H into B', () => runRegisterTests('h', 'b', 0x44));
	test('Load register L into B', () => runRegisterTests('l', 'b', 0x45));
	test('Load HL address into B', () => runHLAddressRegisterTests('b', 0x46));
	test('Load register A into B', () => runRegisterTests('a', 'b', 0x47));
	test('Load PC address into B', () => runPCAddressRegisterTests('b', 0x06));

	test('Load register B into C', () => runRegisterTests('b', 'c', 0x48));
	test('Load register C into C', () => runRegisterTests('c', 'c', 0x49));
	test('Load register D into C', () => runRegisterTests('d', 'c', 0x4A));
	test('Load register E into C', () => runRegisterTests('e', 'c', 0x4B));
	test('Load register H into C', () => runRegisterTests('h', 'c', 0x4C));
	test('Load register L into C', () => runRegisterTests('l', 'c', 0x4D));
	test('Load HL address into C', () => runHLAddressRegisterTests('c', 0x4E));
	test('Load register A into C', () => runRegisterTests('a', 'c', 0x4F));
	test('Load PC address into C', () => runPCAddressRegisterTests('c', 0x0E));

	test('Load register B into D', () => runRegisterTests('b', 'd', 0x50));
	test('Load register C into D', () => runRegisterTests('c', 'd', 0x51));
	test('Load register D into D', () => runRegisterTests('d', 'd', 0x52));
	test('Load register E into D', () => runRegisterTests('e', 'd', 0x53));
	test('Load register H into D', () => runRegisterTests('h', 'd', 0x54));
	test('Load register L into D', () => runRegisterTests('l', 'd', 0x55));
	test('Load HL address into D', () => runHLAddressRegisterTests('d', 0x56));
	test('Load register A into D', () => runRegisterTests('a', 'd', 0x57));
	test('Load PC address into D', () => runPCAddressRegisterTests('d', 0x16));

	test('Load register B into E', () => runRegisterTests('b', 'e', 0x58));
	test('Load register C into E', () => runRegisterTests('c', 'e', 0x59));
	test('Load register D into E', () => runRegisterTests('d', 'e', 0x5A));
	test('Load register E into E', () => runRegisterTests('e', 'e', 0x5B));
	test('Load register H into E', () => runRegisterTests('h', 'e', 0x5C));
	test('Load register L into E', () => runRegisterTests('l', 'e', 0x5D));
	test('Load HL address into E', () => runHLAddressRegisterTests('e', 0x5E));
	test('Load register A into E', () => runRegisterTests('a', 'e', 0x5F));
	test('Load PC address into E', () => runPCAddressRegisterTests('e', 0x1E));

	test('Load register B into H', () => runRegisterTests('b', 'h', 0x60));
	test('Load register C into H', () => runRegisterTests('c', 'h', 0x61));
	test('Load register D into H', () => runRegisterTests('d', 'h', 0x62));
	test('Load register E into H', () => runRegisterTests('e', 'h', 0x63));
	test('Load register H into H', () => runRegisterTests('h', 'h', 0x64));
	test('Load register L into H', () => runRegisterTests('l', 'h', 0x65));
	test('Load HL address into H', () => runHLAddressRegisterTests('h', 0x66));
	test('Load register A into H', () => runRegisterTests('a', 'h', 0x67));
	test('Load PC address into H', () => runPCAddressRegisterTests('h', 0x26));

	test('Load register B into L', () => runRegisterTests('b', 'l', 0x68));
	test('Load register C into L', () => runRegisterTests('c', 'l', 0x69));
	test('Load register D into L', () => runRegisterTests('d', 'l', 0x6A));
	test('Load register E into L', () => runRegisterTests('e', 'l', 0x6B));
	test('Load register H into L', () => runRegisterTests('h', 'l', 0x6C));
	test('Load register L into L', () => runRegisterTests('l', 'l', 0x6D));
	test('Load HL address into L', () => runHLAddressRegisterTests('l', 0x6E));
	test('Load register A into L', () => runRegisterTests('a', 'l', 0x6F));
	test('Load PC address into L', () => runPCAddressRegisterTests('l', 0x2E));
});