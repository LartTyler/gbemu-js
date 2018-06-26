import {MemoryInterface} from '../../Memory/index';
import {RegisterFlag, RegisterKey, RegisterSetInterface} from '../Registers';
import {OperatorCallback, OperatorSet} from './index';

const registerAdd = (value: number, registers: RegisterSetInterface) => {
	registers.a += value;
	registers.flags = 0;

	if (!(registers.a & 255))
		registers.flags |= RegisterFlag.ZERO;

	if (registers.a > 255)
		registers.flags |= RegisterFlag.CARRY;

	registers.a &= 255;
	registers.m = 1;
};

const registerAdd16 = (value: number, registers: RegisterSetInterface) => {
	value += (registers.h << 8) + registers.l;

	if (value > 65535)
		registers.flags |= RegisterFlag.CARRY;
	else
		registers.flags &= 0xEF;

	registers.h = (value >> 8) & 255;
	registers.l = value & 255;

	registers.m = 3;
};

const registerAdd16FromAddress = (sourceHigh: RegisterKey, sourceLow: RegisterKey, registers: RegisterSetInterface) => {
	registerAdd16((registers[sourceHigh] << 8) + registers[sourceLow], registers);
};

const addFromAddress = (address: number, memory: MemoryInterface, registers: RegisterSetInterface) => {
	const a = registers.a;
	const m = memory.readByte(address);

	registers.a += m;
	registers.flags = registers.a > 255 ? RegisterFlag.CARRY : 0;

	registers.a &= 255;

	if (!registers.a)
		registers.flags |= RegisterFlag.ZERO;

	if ((registers.a ^ a ^ m) & 0x10)
		registers.flags |= RegisterFlag.HALF_CARRY;

	registers.m = 2;
};

const addWithCarry = (value: number, registers: RegisterSetInterface) => {
	const a = registers.a;

	registers.a += value;
	registers.a += registers.flags & RegisterFlag.CARRY ? 1 : 0;

	registers.flags = (registers.a > 255) ? RegisterFlag.CARRY : 0;

	registers.a &= 255;

	if (registers.a)
		registers.flags |= RegisterFlag.ZERO;

	if ((registers.a ^ value ^ a) & 0x10)
		registers.flags |= RegisterFlag.HALF_CARRY;

	registers.m = 1;
};

export interface AddOperatorSet extends OperatorSet {
	AddA: OperatorCallback;
	AddB: OperatorCallback;
	AddC: OperatorCallback;
	AddD: OperatorCallback;
	AddE: OperatorCallback;
	AddH: OperatorCallback;
	AddL: OperatorCallback;

	AddHLAddress: OperatorCallback;
	AddPCAddress: OperatorCallback;

	AddBCToHL: OperatorCallback;
	AddDEToHL: OperatorCallback;
	AddHLToHL: OperatorCallback;
	AddSPToHL: OperatorCallback;

	AddPCAddressToSP: OperatorCallback;

	AddAWithCarry: OperatorCallback;
	AddBWithCarry: OperatorCallback;
	AddCWithCarry: OperatorCallback;
	AddDWithCarry: OperatorCallback;
	AddEWithCarry: OperatorCallback;
	AddHWithCarry: OperatorCallback;
	AddLWithCarry: OperatorCallback;
}

export const AddOperators: AddOperatorSet = {
	AddA: hardware => registerAdd(hardware.cpu.registers.a, hardware.cpu.registers),
	AddB: hardware => registerAdd(hardware.cpu.registers.b, hardware.cpu.registers),
	AddC: hardware => registerAdd(hardware.cpu.registers.c, hardware.cpu.registers),
	AddD: hardware => registerAdd(hardware.cpu.registers.d, hardware.cpu.registers),
	AddE: hardware => registerAdd(hardware.cpu.registers.e, hardware.cpu.registers),
	AddH: hardware => registerAdd(hardware.cpu.registers.h, hardware.cpu.registers),
	AddL: hardware => registerAdd(hardware.cpu.registers.l, hardware.cpu.registers),

	AddPCAddress: hardware => addFromAddress(hardware.cpu.registers.programCount, hardware.memory, hardware.cpu.registers),
	AddHLAddress: hardware => {
		const registers = hardware.cpu.registers;

		addFromAddress((registers.h << 8) + registers.l, hardware.memory, registers);
	},

	AddBCToHL: hardware => registerAdd16FromAddress('b', 'c', hardware.cpu.registers),
	AddDEToHL: hardware => registerAdd16FromAddress('d', 'e', hardware.cpu.registers),
	AddHLToHL: hardware => registerAdd16FromAddress('h', 'l', hardware.cpu.registers),
	AddSPToHL: hardware => registerAdd16(hardware.cpu.registers.stackPointer, hardware.cpu.registers),

	AddPCAddressToSP: hardware => {
		const memory = hardware.memory;
		const registers = hardware.cpu.registers;

		let i = memory.readByte(registers.programCount++);

		if (i > 127)
			i = -((~i + 1) & 255);

		registers.stackPointer += i;

		registers.m = 4;
	},

	AddAWithCarry: hardware => addWithCarry(hardware.cpu.registers.a, hardware.cpu.registers),
	AddBWithCarry: hardware => addWithCarry(hardware.cpu.registers.b, hardware.cpu.registers),
	AddCWithCarry: hardware => addWithCarry(hardware.cpu.registers.c, hardware.cpu.registers),
	AddDWithCarry: hardware => addWithCarry(hardware.cpu.registers.d, hardware.cpu.registers),
	AddEWithCarry: hardware => addWithCarry(hardware.cpu.registers.e, hardware.cpu.registers),
	AddHWithCarry: hardware => addWithCarry(hardware.cpu.registers.h, hardware.cpu.registers),
	AddLWithCarry: hardware => addWithCarry(hardware.cpu.registers.l, hardware.cpu.registers),

	// TODO ADDCHL
};