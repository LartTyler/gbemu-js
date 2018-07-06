import {HardwareBusInterface} from '../../../Hardware';
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
];