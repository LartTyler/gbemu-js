import {Gpu} from '../../../_GPU';
import {HardwareBus} from '../../../Hardware';
import {Memory} from '../../../Memory/Memory';
import {Cpu} from '../../index';
import {RegisterKey} from '../../Registers';
import {PrimaryInstructions} from '../index';

jest.mock('../../../_GPU');

describe('Load Operators', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory(), new Gpu(null));
	const {memory, registers} = hardware;

	beforeEach(() => {
		hardware.cpu.reset();
		hardware.memory.reset();
	});

	// region Load into registers
	const runRegisterIntoRegisterTests = (source: RegisterKey, destination: RegisterKey, opcode: number): void => {
		const operator = PrimaryInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`LoadRegister${source.toUpperCase()}Into${destination.toUpperCase()}`);

		registers[destination] = 1;
		registers[source] = 3;

		operator.invoke(hardware);

		expect(registers[destination]).toBe(3);
		expect(registers.m).toBe(1);
	};

	const runPairAddressIntoRegisterTests = (high: RegisterKey, low: RegisterKey, destination: RegisterKey, opcode: number): void => {
		const operator = PrimaryInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`Load${(high + low).toUpperCase()}AddressInto${destination.toUpperCase()}`);

		registers[destination] = 1;
		registers[high] = 0xC0;
		registers[low] = 0x00;
		memory.writeByte(0xC000, 3);

		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(3);
		expect(registers.m).toBe(2);
	};

	const runHLAddressRegisterTests = (destination: RegisterKey, opcode: number): void => {
		runPairAddressIntoRegisterTests('h', 'l', destination, opcode);
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
		expect(registers.m).toBe(2);
	};

	const runPCAddressWordIntoPairTests = (high: RegisterKey, low: RegisterKey, opcode: number): void => {
		const operator = PrimaryInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`LoadPCAddressWordInto${(high + low).toUpperCase()}Pair`);

		registers[high] = 1;
		registers[low] = 1;
		registers.programCount = 0xC000;
		memory.writeWord(registers.programCount, 0x1A96);

		operator.invoke(hardware);

		expect(registers[high]).toBe(0x1A);
		expect(registers[low]).toBe(0x96);
		expect(registers.programCount).toBe(0xC002);
		expect(registers.m).toBe(3);
	};

	test('Load register B into A', () => runRegisterIntoRegisterTests('b', 'a', 0x78));
	test('Load register C into A', () => runRegisterIntoRegisterTests('c', 'a', 0x79));
	test('Load register D into A', () => runRegisterIntoRegisterTests('d', 'a', 0x7A));
	test('Load register E into A', () => runRegisterIntoRegisterTests('e', 'a', 0x7B));
	test('Load register H into A', () => runRegisterIntoRegisterTests('h', 'a', 0x7C));
	test('Load register L into A', () => runRegisterIntoRegisterTests('l', 'a', 0x7D));
	test('Load HL address into A', () => runHLAddressRegisterTests('a', 0x7E));
	test('Load register A into A', () => runRegisterIntoRegisterTests('a', 'a', 0x7F));
	test('Load PC address into A', () => runPCAddressRegisterTests('a', 0x3E));

	test('Load register B into B', () => runRegisterIntoRegisterTests('b', 'b', 0x40));
	test('Load register C into B', () => runRegisterIntoRegisterTests('c', 'b', 0x41));
	test('Load register D into B', () => runRegisterIntoRegisterTests('d', 'b', 0x42));
	test('Load register E into B', () => runRegisterIntoRegisterTests('e', 'b', 0x43));
	test('Load register H into B', () => runRegisterIntoRegisterTests('h', 'b', 0x44));
	test('Load register L into B', () => runRegisterIntoRegisterTests('l', 'b', 0x45));
	test('Load HL address into B', () => runHLAddressRegisterTests('b', 0x46));
	test('Load register A into B', () => runRegisterIntoRegisterTests('a', 'b', 0x47));
	test('Load PC address into B', () => runPCAddressRegisterTests('b', 0x06));

	test('Load register B into C', () => runRegisterIntoRegisterTests('b', 'c', 0x48));
	test('Load register C into C', () => runRegisterIntoRegisterTests('c', 'c', 0x49));
	test('Load register D into C', () => runRegisterIntoRegisterTests('d', 'c', 0x4A));
	test('Load register E into C', () => runRegisterIntoRegisterTests('e', 'c', 0x4B));
	test('Load register H into C', () => runRegisterIntoRegisterTests('h', 'c', 0x4C));
	test('Load register L into C', () => runRegisterIntoRegisterTests('l', 'c', 0x4D));
	test('Load HL address into C', () => runHLAddressRegisterTests('c', 0x4E));
	test('Load register A into C', () => runRegisterIntoRegisterTests('a', 'c', 0x4F));
	test('Load PC address into C', () => runPCAddressRegisterTests('c', 0x0E));

	test('Load register B into D', () => runRegisterIntoRegisterTests('b', 'd', 0x50));
	test('Load register C into D', () => runRegisterIntoRegisterTests('c', 'd', 0x51));
	test('Load register D into D', () => runRegisterIntoRegisterTests('d', 'd', 0x52));
	test('Load register E into D', () => runRegisterIntoRegisterTests('e', 'd', 0x53));
	test('Load register H into D', () => runRegisterIntoRegisterTests('h', 'd', 0x54));
	test('Load register L into D', () => runRegisterIntoRegisterTests('l', 'd', 0x55));
	test('Load HL address into D', () => runHLAddressRegisterTests('d', 0x56));
	test('Load register A into D', () => runRegisterIntoRegisterTests('a', 'd', 0x57));
	test('Load PC address into D', () => runPCAddressRegisterTests('d', 0x16));

	test('Load register B into E', () => runRegisterIntoRegisterTests('b', 'e', 0x58));
	test('Load register C into E', () => runRegisterIntoRegisterTests('c', 'e', 0x59));
	test('Load register D into E', () => runRegisterIntoRegisterTests('d', 'e', 0x5A));
	test('Load register E into E', () => runRegisterIntoRegisterTests('e', 'e', 0x5B));
	test('Load register H into E', () => runRegisterIntoRegisterTests('h', 'e', 0x5C));
	test('Load register L into E', () => runRegisterIntoRegisterTests('l', 'e', 0x5D));
	test('Load HL address into E', () => runHLAddressRegisterTests('e', 0x5E));
	test('Load register A into E', () => runRegisterIntoRegisterTests('a', 'e', 0x5F));
	test('Load PC address into E', () => runPCAddressRegisterTests('e', 0x1E));

	test('Load register B into H', () => runRegisterIntoRegisterTests('b', 'h', 0x60));
	test('Load register C into H', () => runRegisterIntoRegisterTests('c', 'h', 0x61));
	test('Load register D into H', () => runRegisterIntoRegisterTests('d', 'h', 0x62));
	test('Load register E into H', () => runRegisterIntoRegisterTests('e', 'h', 0x63));
	test('Load register H into H', () => runRegisterIntoRegisterTests('h', 'h', 0x64));
	test('Load register L into H', () => runRegisterIntoRegisterTests('l', 'h', 0x65));
	test('Load HL address into H', () => runHLAddressRegisterTests('h', 0x66));
	test('Load register A into H', () => runRegisterIntoRegisterTests('a', 'h', 0x67));
	test('Load PC address into H', () => runPCAddressRegisterTests('h', 0x26));

	test('Load register B into L', () => runRegisterIntoRegisterTests('b', 'l', 0x68));
	test('Load register C into L', () => runRegisterIntoRegisterTests('c', 'l', 0x69));
	test('Load register D into L', () => runRegisterIntoRegisterTests('d', 'l', 0x6A));
	test('Load register E into L', () => runRegisterIntoRegisterTests('e', 'l', 0x6B));
	test('Load register H into L', () => runRegisterIntoRegisterTests('h', 'l', 0x6C));
	test('Load register L into L', () => runRegisterIntoRegisterTests('l', 'l', 0x6D));
	test('Load HL address into L', () => runHLAddressRegisterTests('l', 0x6E));
	test('Load register A into L', () => runRegisterIntoRegisterTests('a', 'l', 0x6F));
	test('Load PC address into L', () => runPCAddressRegisterTests('l', 0x2E));

	test('Load BC Address into A', () => runPairAddressIntoRegisterTests('b', 'c', 'a', 0x0A));
	test('Load DE Address into A', () => runPairAddressIntoRegisterTests('d', 'e', 'a', 0x1A));

	test('LoadPCAddressWordIntoBCPair', () => runPCAddressWordIntoPairTests('b', 'c', 0x01));
	test('LoadPCAddressWordIntoDEPair', () => runPCAddressWordIntoPairTests('d', 'e', 0x11));
	test('LoadPCAddressWordIntoHLPair', () => runPCAddressWordIntoPairTests('h', 'l', 0x21));

	test('LoadPCAddressWordIntoSP', () => {
		const operator = PrimaryInstructions.getByCode(0x31);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('LoadPCAddressWordIntoSP');

		registers.stackPointer = 1;
		registers.programCount = 0xC000;
		memory.writeWord(0xC000, 0x1A96);

		operator.invoke(hardware);

		expect(registers.stackPointer).toBe(0x1A96);
		expect(registers.programCount).toBe(0xC002);
		expect(registers.m).toBe(3);
	});
	// endregion

	// region Load registers into memory
	const runRegisterIntoRegisterPairTests = (high: RegisterKey, low: RegisterKey, source: RegisterKey, opcode: number): void => {
		const operator = PrimaryInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`Load${source.toUpperCase()}Into${(high + low).toUpperCase()}Address`);

		registers[source] = 3;
		registers[high] = 0xC0;
		registers[low] = 0x03;
		memory.writeByte(0xC003, 0);

		operator.invoke(hardware);

		expect(memory.readByte(0xC003)).toBe(source === high ? 0xC0 : 3);
		expect(registers.m).toBe(2);
	};

	const runRegisterIntoHLAddressTests = (source: RegisterKey, opcode: number): void => {
		runRegisterIntoRegisterPairTests('h', 'l', source, opcode);
	};

	test('LoadAIntoHLAddress', () => runRegisterIntoHLAddressTests('a', 0x77));
	test('LoadBIntoHLAddress', () => runRegisterIntoHLAddressTests('b', 0x70));
	test('LoadCIntoHLAddress', () => runRegisterIntoHLAddressTests('c', 0x71));
	test('LoadDIntoHLAddress', () => runRegisterIntoHLAddressTests('d', 0x72));
	test('LoadEIntoHLAddress', () => runRegisterIntoHLAddressTests('e', 0x73));
	test('LoadHIntoHLAddress', () => runRegisterIntoHLAddressTests('h', 0x74));
	test('LoadLIntoHLAddress', () => runRegisterIntoHLAddressTests('l', 0x75));

	test('LoadAIntoBCAddress', () => runRegisterIntoRegisterPairTests('b', 'c', 'a', 0x02));
	test('LoadAIntoDEAddress', () => runRegisterIntoRegisterPairTests('d', 'e', 'a', 0x12));

	test('LoadAIntoPCAddress16', () => {
		const operator = PrimaryInstructions.getByCode(0xEA);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('LoadAIntoPCAddress16');

		registers.a = 3;
		registers.programCount = 0xC000;
		memory.writeWord(0xC000, 0xC100);
		memory.writeByte(0xC100, 0);

		operator.invoke(hardware);

		expect(memory.readByte(0xC100)).toBe(3);
		expect(registers.m).toBe(4);
		expect(registers.programCount).toBe(0xC002);
	});

	test('LoadPCAddress16IntoA', () => {
		const operator = PrimaryInstructions.getByCode(0xFA);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('LoadPCAddress16IntoA');

		registers.a = 1;
		registers.programCount = 0xC000;
		memory.writeWord(0xC000, 0xC100);
		memory.writeByte(0xC100, 3);

		operator.invoke(hardware);

		expect(registers.a).toBe(3);
		expect(registers.programCount).toBe(0xC002);
		expect(registers.m).toBe(4);
	});
	// endregion

	// region Load memory into memory
	test('LoadPCAddressIntoHLAddress', () => {
		const operator = PrimaryInstructions.getByCode(0x36);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('LoadPCAddressIntoHLAddress');

		registers.programCount = 0xC000;
		registers.h = 0xC0;
		registers.l = 0x10;

		memory.writeByte(registers.programCount, 3);
		memory.writeByte(0xC010, 0);

		operator.invoke(hardware);

		expect(memory.readByte(0xC010)).toBe(3);
		expect(registers.m).toBe(3);
	});
	// endregion

	// region Load and increment
	test('LoadAIntoHLAddressAndIncrement', () => {
		const operator = PrimaryInstructions.getByCode(0x22);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('LoadAIntoHLAddressAndIncrement');

		registers.a = 3;
		registers.h = 0xC0;
		registers.l = 0x00;
		memory.writeByte(0xC000, 1);

		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(3);
		expect(registers.h).toBe(0xC0);
		expect(registers.l).toBe(0x01);
		expect(registers.m).toBe(2);

		registers.a = 3;
		registers.h = 0xCF;
		registers.l = 0xFF;
		memory.writeByte(0xCFFF, 1);

		operator.invoke(hardware);

		expect(memory.readByte(0xCFFF)).toBe(3);
		expect(registers.h).toBe(0xD0);
		expect(registers.l).toBe(0x00);
	});

	test('LoadHLAddressIntoAAndIncrement', () => {
		const operator = PrimaryInstructions.getByCode(0x2A);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('LoadHLAddressIntoAAndIncrement');

		registers.a = 1;
		registers.h = 0xC0;
		registers.l = 0x00;
		memory.writeByte(0xC000, 3);

		operator.invoke(hardware);

		expect(registers.a).toBe(3);
		expect(registers.h).toBe(0xC0);
		expect(registers.l).toBe(0x01);
		expect(registers.m).toBe(2);

		registers.a = 1;
		registers.h = 0xCF;
		registers.l = 0xFF;
		memory.writeByte(0xCFFF, 3);

		operator.invoke(hardware);

		expect(registers.a).toBe(3);
		expect(registers.h).toBe(0xD0);
		expect(registers.l).toBe(0x00);
		expect(registers.m).toBe(2);
	});
	// endregion

	// region Load and decrement
	test('LoadAIntoHLAddressAndDecrement', () => {
		const operator = PrimaryInstructions.getByCode(0x32);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('LoadAIntoHLAddressAndDecrement');

		registers.a = 3;
		registers.h = 0xC0;
		registers.l = 0x00;
		memory.writeByte(0xC000, 1);

		operator.invoke(hardware);

		expect(memory.readByte(0xC000)).toBe(3);
		expect(registers.h).toBe(0xBF);
		expect(registers.l).toBe(0xFF);
		expect(registers.m).toBe(2);

		registers.a = 3;
		registers.h = 0xCF;
		registers.l = 0xFF;
		memory.writeByte(0xCFFF, 1);

		operator.invoke(hardware);

		expect(memory.readByte(0xCFFF)).toBe(3);
		expect(registers.h).toBe(0xCF);
		expect(registers.l).toBe(0xFE);
		expect(registers.m).toBe(2);
	});

	test('LoadHLAddressIntoAAndDecrement', () => {
		const operator = PrimaryInstructions.getByCode(0x3A);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('LoadHLAddressIntoAAndDecrement');

		registers.a = 1;
		registers.h = 0xC0;
		registers.l = 0x00;
		memory.writeByte(0xC000, 3);

		operator.invoke(hardware);

		expect(registers.a).toBe(3);
		expect(registers.h).toBe(0xBF);
		expect(registers.l).toBe(0xFF);
		expect(registers.m).toBe(2);

		registers.a = 1;
		registers.h = 0xCF;
		registers.l = 0xFF;
		memory.writeByte(0xCFFF, 3);

		operator.invoke(hardware);

		expect(registers.a).toBe(3);
		expect(registers.h).toBe(0xCF);
		expect(registers.l).toBe(0xFE);
		expect(registers.m).toBe(2);
	});
	// endregion

	test('LoadCAddress8IntoA', () => {
		const operator = PrimaryInstructions.getByCode(0xF2);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('LoadCAddress8IntoA');

		registers.a = 1;
		registers.c = 0x80;
		memory.writeByte(0xFF80, 3);

		operator.invoke(hardware);

		expect(registers.a).toBe(3);
		expect(registers.m).toBe(2);
	});

	test('LoadAIntoCAddress8', () => {
		const operator = PrimaryInstructions.getByCode(0xE2);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('LoadAIntoCAddress8');

		registers.a = 3;
		registers.c = 0x80;
		memory.writeByte(0xFF80, 1);

		operator.invoke(hardware);

		expect(memory.readByte(0xFF80)).toBe(3);
		expect(registers.m).toBe(2);
	});

	test('WeirdLoadThingWithSPAndHL', () => {
		const operator = PrimaryInstructions.getByCode(0xF8);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('WeirdLoadThingWithSPAndHL');

		registers.programCount = 0xC000;
		registers.stackPointer = 5;
		memory.writeByte(0xC000, 3);

		operator.invoke(hardware);

		expect(registers.h).toBe(0);
		expect(registers.l).toBe(8);
		expect(registers.programCount).toBe(0xC001);
		expect(registers.m).toBe(3);

		registers.programCount = 0xC000;
		registers.stackPointer = 3;
		memory.writeByte(0xC000, 197);

		operator.invoke(hardware);

		expect(registers.h).toBe(0xFF);
		expect(registers.l).toBe(0xC8);
		expect(registers.programCount).toBe(0xC001);
		expect(registers.m).toBe(3);
	});
	// endregion
});