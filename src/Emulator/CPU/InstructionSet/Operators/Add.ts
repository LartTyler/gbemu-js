import {HardwareBusInterface} from '../../../Hardware';
import {pairTo16Bit} from '../../../util';
import {RegisterFlag, RegisterKey} from '../../Registers';
import {Operator, OperatorInterface} from '../InstructionManager';

const add = (key: RegisterKey, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	const originalA = registers.a;
	const originalOther = registers[key];

	registers.a += originalOther;
	registers.flags = registers.a > 255 ? RegisterFlag.CARRY : 0;

	registers.a &= 255;

	if (!registers.a)
		registers.flags |= RegisterFlag.ZERO;

	// This was corrected from the original algorithm to preserve the original value of the "other" register, in order
	// to correct a potential issue where `ADD a,a` would never yield a HALF_CARRY flag
	if ((registers.a ^ originalA ^ originalOther) & 0x10)
		registers.flags |= RegisterFlag.HALF_CARRY;

	registers.m = 1;
};

const addAddress = (address: number, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	const originalA = registers.a;
	const originalOther = hardware.memory.readByte(address);

	registers.a += originalOther;
	registers.flags = registers.a > 255 ? RegisterFlag.CARRY : 0;

	registers.a &= 255;

	if (!registers.a)
		registers.flags |= RegisterFlag.ZERO;

	if ((registers.a ^ originalA ^ originalOther) & 0x10)
		registers.flags |= RegisterFlag.HALF_CARRY;

	registers.m = 2;
};

const addPairToHLPair = (high: RegisterKey, low: RegisterKey, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	let value = (registers.h << 8) + registers.l + (registers[high] << 8) + registers[low];

	if (value > 65535)
		registers.flags |= RegisterFlag.CARRY;
	else
		registers.flags &= ~RegisterFlag.CARRY;

	registers.h = (value >> 8) & 255;
	registers.l = value & 255;

	registers.m = 3;
};

const addWithCarry = (key: RegisterKey, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	const originalA = registers.a;
	const originalOther = registers[key];

	registers.a += registers[key] + (registers.flags & RegisterFlag.CARRY ? 1 : 0);
	registers.flags = registers.a > 255 ? RegisterFlag.CARRY : 0;

	registers.a &= 255;

	if (!registers.a)
		registers.flags |= RegisterFlag.ZERO;

	if ((registers.a ^ originalA ^ originalOther) & 0x10)
		registers.flags |= RegisterFlag.HALF_CARRY;

	registers.m = 1;
};

const addAddressWithCarry = (address: number, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	const originalA = registers.a;
	const value = hardware.memory.readByte(address);

	registers.a += value + (registers.flags & RegisterFlag.CARRY ? 1 : 0);
	registers.flags = registers.a > 255 ? RegisterFlag.CARRY : 0;

	registers.a &= 255;

	if (!registers.a)
		registers.flags |= RegisterFlag.ZERO;

	if ((registers.a ^ originalA ^ value) & 0x10)
		registers.flags |= RegisterFlag.HALF_CARRY;

	registers.m = 2;
};

export const AddOperators: OperatorInterface[] = [
	// region Add register to A
	new Operator('AddA', 0x87, hardware => add('a', hardware)),
	new Operator('AddB', 0x80, hardware => add('b', hardware)),
	new Operator('AddC', 0x81, hardware => add('c', hardware)),
	new Operator('AddD', 0x82, hardware => add('d', hardware)),
	new Operator('AddE', 0x83, hardware => add('e', hardware)),
	new Operator('AddH', 0x84, hardware => add('h', hardware)),
	new Operator('AddL', 0x85, hardware => add('l', hardware)),
	// endregion

	// region Add address to A
	new Operator('AddHLAddress', 0x86, hardware => {
		const registers = hardware.registers;

		addAddress((registers.h << 8) + registers.l, hardware);
	}),
	new Operator('AddPCAddress', 0xC6, hardware => addAddress(hardware.registers.programCount++, hardware)),
	// endregion

	// region Add register pair to HL pair
	new Operator('AddBCPairToHLPair', 0x09, hardware => addPairToHLPair('b', 'c', hardware)),
	new Operator('AddDEPairToHLPair', 0x19, hardware => addPairToHLPair('d', 'e', hardware)),
	new Operator('AddHLPairToHLPair', 0x29, hardware => addPairToHLPair('h', 'l', hardware)),
	// endregion

	new Operator('AddSPToHLPair', 0x39, hardware => {
		const {registers} = hardware;

		const value = (registers.h << 8) + registers.l + registers.stackPointer;

		if (value > 65535)
			registers.flags |= RegisterFlag.CARRY;
		else
			registers.flags &= ~RegisterFlag.CARRY;

		registers.h = (value >> 8) & 255;
		registers.l = value & 255;

		registers.m = 3;
	}),

	new Operator('AddPCAddressToSP', 0xE8, hardware => {
		const registers = hardware.registers;

		let value = hardware.memory.readByte(registers.programCount++);

		if (value > 127)
			value = -((~value + 1) & 255);

		registers.stackPointer += value;
		registers.m = 4;
	}),

	// region Add register to A with carry
	new Operator('AddAWithCarry', 0x8F, hardware => addWithCarry('a', hardware)),
	new Operator('AddBWithCarry', 0x88, hardware => addWithCarry('b', hardware)),
	new Operator('AddCWithCarry', 0x89, hardware => addWithCarry('c', hardware)),
	new Operator('AddDWithCarry', 0x8A, hardware => addWithCarry('d', hardware)),
	new Operator('AddEWithCarry', 0x8B, hardware => addWithCarry('e', hardware)),
	new Operator('AddHWithCarry', 0x8C, hardware => addWithCarry('h', hardware)),
	new Operator('AddLWithCarry', 0x8D, hardware => addWithCarry('l', hardware)),
	// endregion

	// region Add address to A with carry
	new Operator('AddPCAddressWithCarry', 0xCE, hardware => addAddressWithCarry(hardware.registers.programCount++, hardware)),
	new Operator('AddHLAddressWithCarry', 0x8E, hardware => {
		const registers = hardware.registers;

		addAddressWithCarry(pairTo16Bit(registers.h, registers.l), hardware);
	}),
	// endregion
];