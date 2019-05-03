import {HardwareBusInterface} from '../../../Hardware';
import {RegisterFlag, RegisterKey} from '../../Registers';
import {Operator, OperatorInterface} from '../InstructionManager';

const subtract = (value: number, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;
	const original = registers.a;

	registers.flags = RegisterFlag.OPERATION;
	registers.a -= value;

	if (registers.a < 0)
		registers.flags |= RegisterFlag.CARRY;

	registers.a &= 255;

	if (!registers.a)
		registers.flags |= RegisterFlag.ZERO;

	if ((registers.a ^ original ^ value) & 0x10)
		registers.flags |= RegisterFlag.HALF_CARRY;
};

const subtractRegister = (key: RegisterKey, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	subtract(registers[key], hardware);

	registers.m = 1;
};

const subtractAddress = (address: number, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	subtract(hardware.memory.readByte(address), hardware);

	registers.m = 2;
};

const subtractWithCarry = (value: number, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;
	const original = registers.a;

	registers.a -= value;

	if (registers.flags & RegisterFlag.CARRY)
		registers.a -= 1;

	registers.flags = RegisterFlag.OPERATION;

	if (registers.a < 0)
		registers.flags |= RegisterFlag.CARRY;

	registers.a &= 255;

	if (!registers.a)
		registers.flags |= RegisterFlag.ZERO;

	if ((registers.a ^ original ^ value) & 0x10)
		registers.flags |= RegisterFlag.HALF_CARRY;
};

const subtractRegisterWithCarry = (key: RegisterKey, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	subtractWithCarry(registers[key], hardware);

	registers.m = 1;
};

const subtractAddressWithCarry = (address: number, hardware: HardwareBusInterface): void => {
	subtractWithCarry(hardware.memory.readByte(address), hardware);

	hardware.registers.m = 2;
};

export const SubtractOperators: OperatorInterface[] = [
	// region Subtract registers
	new Operator('SubtractA', 0x97, hardware => subtractRegister('a', hardware)),
	new Operator('SubtractB', 0x90, hardware => subtractRegister('b', hardware)),
	new Operator('SubtractC', 0x91, hardware => subtractRegister('c', hardware)),
	new Operator('SubtractD', 0x92, hardware => subtractRegister('d', hardware)),
	new Operator('SubtractE', 0x93, hardware => subtractRegister('e', hardware)),
	new Operator('SubtractH', 0x94, hardware => subtractRegister('h', hardware)),
	new Operator('SubtractL', 0x95, hardware => subtractRegister('l', hardware)),
	// endregion

	// region Subtract address
	new Operator('SubtractHLAddress', 0x96, hardware => {
		const registers = hardware.registers;

		subtractAddress((registers.h << 8) + registers.l, hardware);
	}),
	new Operator(
		'SubtractPCAddress',
		0xD6,
		hardware => subtractAddress(hardware.registers.programCount++, hardware),
		null,
		2,
	),
	// endregion

	// region Subtract register with carry
	new Operator('SubtractAWithCarry', 0x9F, hardware => subtractRegisterWithCarry('a', hardware)),
	new Operator('SubtractBWithCarry', 0x98, hardware => subtractRegisterWithCarry('b', hardware)),
	new Operator('SubtractCWithCarry', 0x99, hardware => subtractRegisterWithCarry('c', hardware)),
	new Operator('SubtractDWithCarry', 0x9A, hardware => subtractRegisterWithCarry('d', hardware)),
	new Operator('SubtractEWithCarry', 0x9B, hardware => subtractRegisterWithCarry('e', hardware)),
	new Operator('SubtractHWithCarry', 0x9C, hardware => subtractRegisterWithCarry('h', hardware)),
	new Operator('SubtractLWithCarry', 0x9D, hardware => subtractRegisterWithCarry('l', hardware)),
	// endregion

	// region Subtract address with carry
	new Operator('SubtractHLAddressWithCarry', 0x9E, hardware => {
		const registers = hardware.registers;

		subtractAddressWithCarry((registers.h << 8) + registers.l, hardware);
	}),

	new Operator('SubtractPCAddressWithCarry', 0xDE, hardware => {
		subtractAddressWithCarry(hardware.registers.programCount++, hardware);
	}, null, 2),
	// endregion
];
