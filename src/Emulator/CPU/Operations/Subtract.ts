import {HardwareBusInterface} from '../../Hardware';
import {RegisterFlag, RegisterSetInterface} from '../Registers';
import {OperatorCallback, OperatorSet} from './index';

const setFlags = (result: number, value: number, original: number, registers: RegisterSetInterface) => {
	registers.flags = RegisterFlag.OPERATION;

	if (result < 0)
		registers.flags |= RegisterFlag.CARRY;

	result &= 255;

	if (!result)
		registers.flags |= RegisterFlag.ZERO;

	if (result ^ value ^ original)
		registers.flags |= RegisterFlag.HALF_CARRY;
};

const finalize = (value: number, original: number, registers: RegisterSetInterface) => {
	setFlags(registers.a, value, original, registers);

	registers.a &= 255;
};

const subtract = (value: number, registers: RegisterSetInterface) => {
	const original = registers.a;

	registers.a -= value;

	finalize(value, original, registers);

	registers.m = 1;
};

const subtractAddress = (address: number, hardware: HardwareBusInterface) => {
	const memory = hardware.memory;
	const registers = hardware.cpu.registers;

	const original = registers.a;
	const value = memory.readByte(address);

	registers.a -= value;

	finalize(value, original, registers);

	registers.m = 2;
};

const subtractWithCarry = (value: number, registers: RegisterSetInterface) => {
	const original = registers.a;

	registers.a -= value;
	registers.a -= registers.flags & RegisterFlag.CARRY ? 1 : 0;

	finalize(value, original, registers);

	registers.m = 1;
};

const subtractAddressWithCarry = (address: number, hardware: HardwareBusInterface) => {
	const registers = hardware.cpu.registers;

	const original = registers.a;
	const value = hardware.memory.readByte(address);

	registers.a -= value;
	registers.a -= registers.flags & RegisterFlag.CARRY ? 1 : 0;

	finalize(value, original, registers);

	registers.m = 2;
};

const setSubtractFlags = (value: number, hardware: HardwareBusInterface) => {
	const registers = hardware.cpu.registers;
	const original = registers.a;

	setFlags(original - value, value, original, registers);

	registers.m = 1;
};

const setSubtractAddressFlags = (address: number, hardware: HardwareBusInterface) => {
	const registers = hardware.cpu.registers;

	const original = registers.a;
	const value = hardware.memory.readByte(address);

	setFlags(original - value, value, original, registers);

	registers.m = 2;
};

export interface SubtractOperatorSet extends OperatorSet {
	SubtractA: OperatorCallback;
	SubtractB: OperatorCallback;
	SubtractC: OperatorCallback;
	SubtractD: OperatorCallback;
	SubtractE: OperatorCallback;
	SubtractH: OperatorCallback;
	SubtractL: OperatorCallback;

	SubtractHLAddress: OperatorCallback;
	SubtractPCAddress: OperatorCallback;

	SubtractAWithCarry: OperatorCallback;
	SubtractBWithCarry: OperatorCallback;
	SubtractCWithCarry: OperatorCallback;
	SubtractDWithCarry: OperatorCallback;
	SubtractEWithCarry: OperatorCallback;
	SubtractHWithCarry: OperatorCallback;
	SubtractLWithCarry: OperatorCallback;

	SubtractHLAddressWithCarry: OperatorCallback;
	SubtractPCAddressWithCarry: OperatorCallback;

	SetSubtractAFlags: OperatorCallback;
	SetSubtractBFlags: OperatorCallback;
	SetSubtractCFlags: OperatorCallback;
	SetSubtractDFlags: OperatorCallback;
	SetSubtractEFlags: OperatorCallback;
	SetSubtractHFlags: OperatorCallback;
	SetSubtractLFlags: OperatorCallback;

	SetSubtractHLAddressFlags: OperatorCallback;
	SetSubtractPCAddressFlags: OperatorCallback;
}

export const SubtractOperators: SubtractOperatorSet = {
	SubtractA: hardware => subtract(hardware.cpu.registers.a, hardware.cpu.registers),
	SubtractB: hardware => subtract(hardware.cpu.registers.b, hardware.cpu.registers),
	SubtractC: hardware => subtract(hardware.cpu.registers.c, hardware.cpu.registers),
	SubtractD: hardware => subtract(hardware.cpu.registers.d, hardware.cpu.registers),
	SubtractE: hardware => subtract(hardware.cpu.registers.e, hardware.cpu.registers),
	SubtractH: hardware => subtract(hardware.cpu.registers.h, hardware.cpu.registers),
	SubtractL: hardware => subtract(hardware.cpu.registers.l, hardware.cpu.registers),

	SubtractHLAddress: hardware => {
		const registers = hardware.cpu.registers;

		subtractAddress((registers.h << 8) + registers.l, hardware);
	},
	SubtractPCAddress: hardware => {
		const registers = hardware.cpu.registers;

		subtractAddress(registers.programCount++, hardware);
	},

	SubtractAWithCarry: hardware => subtractWithCarry(hardware.cpu.registers.a, hardware.cpu.registers),
	SubtractBWithCarry: hardware => subtractWithCarry(hardware.cpu.registers.b, hardware.cpu.registers),
	SubtractCWithCarry: hardware => subtractWithCarry(hardware.cpu.registers.c, hardware.cpu.registers),
	SubtractDWithCarry: hardware => subtractWithCarry(hardware.cpu.registers.d, hardware.cpu.registers),
	SubtractEWithCarry: hardware => subtractWithCarry(hardware.cpu.registers.e, hardware.cpu.registers),
	SubtractHWithCarry: hardware => subtractWithCarry(hardware.cpu.registers.h, hardware.cpu.registers),
	SubtractLWithCarry: hardware => subtractWithCarry(hardware.cpu.registers.l, hardware.cpu.registers),

	SubtractHLAddressWithCarry: hardware => {
		const registers = hardware.cpu.registers;

		subtractAddressWithCarry((registers.h << 8) + registers.l, hardware);
	},
	SubtractPCAddressWithCarry: hardware => {
		const registers = hardware.cpu.registers;

		subtractAddressWithCarry(registers.programCount++, hardware);
	},

	SetSubtractAFlags: hardware => setSubtractFlags(hardware.cpu.registers.a, hardware),
	SetSubtractBFlags: hardware => setSubtractFlags(hardware.cpu.registers.b, hardware),
	SetSubtractCFlags: hardware => setSubtractFlags(hardware.cpu.registers.c, hardware),
	SetSubtractDFlags: hardware => setSubtractFlags(hardware.cpu.registers.d, hardware),
	SetSubtractEFlags: hardware => setSubtractFlags(hardware.cpu.registers.e, hardware),
	SetSubtractHFlags: hardware => setSubtractFlags(hardware.cpu.registers.h, hardware),
	SetSubtractLFlags: hardware => setSubtractFlags(hardware.cpu.registers.l, hardware),

	SetSubtractHLAddressFlags: hardware => {
		const registers = hardware.cpu.registers;

		setSubtractAddressFlags((registers.h << 8) + registers.l, hardware);
	},
	SetSubtractPCAddressFlags: hardware => {
		const registers = hardware.cpu.registers;

		setSubtractAddressFlags(registers.programCount++, hardware);
	},
};