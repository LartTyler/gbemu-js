import {HardwareBusInterface} from '../../../Hardware';
import {RegisterKey, RegisterSetInterface} from '../../Registers';
import {OperatorCallback, OperatorSet} from '../index';

const rotateRight = (name: RegisterKey, carry: boolean, registers: RegisterSetInterface) => {
	const flagMask = carry ? 1 : 0x10;

	const ci = registers.flags & flagMask ? 0x80 : 0;
	const co = registers[name] & 1 ? 0x10 : 0;

	registers[name] = ((registers[name] >> 1) + ci) & 255;

	registers.flags = (registers.flags & 0xEF) + co;

	registers.m = name === 'a' ? 1 : 2;
};

const rotateRightAddress = (carry: boolean, hardware: HardwareBusInterface) => {
	const memory = hardware.memory;
	const registers = hardware.cpu.registers;

	const flagMask = carry ? 1 : 0x10;
	const address = (registers.h << 8) + registers.l;

	let i = memory.readByte(address);

	const ci = registers.flags & flagMask ? 0x80 : 0;
	const co = i & 1 ? 0x10 : 0;

	i = ((i >> 1) + ci) & 255;

	memory.writeByte(address, i);

	registers.flags = i ? 0 : 0x80;
	registers.flags = (registers.flags & 0xEF) + co;

	registers.m = 4;
};

export interface RotateRightOperatorSet extends OperatorSet {
	RotateRightA: OperatorCallback;
	RotateRightB: OperatorCallback;
	RotateRightC: OperatorCallback;
	RotateRightD: OperatorCallback;
	RotateRightE: OperatorCallback;
	RotateRightH: OperatorCallback;
	RotateRightL: OperatorCallback;
	RotateRightHLAddress: OperatorCallback;

	RotateRightAWithCarry: OperatorCallback;
	RotateRightBWithCarry: OperatorCallback;
	RotateRightCWithCarry: OperatorCallback;
	RotateRightDWithCarry: OperatorCallback;
	RotateRightEWithCarry: OperatorCallback;
	RotateRightHWithCarry: OperatorCallback;
	RotateRightLWithCarry: OperatorCallback;
	RotateRightHLAddressWithCarry: OperatorCallback;
}

export const RotateRightOperators: RotateRightOperatorSet = {
	RotateRightA: hardware => rotateRight('a', false, hardware.cpu.registers),
	RotateRightB: hardware => rotateRight('b', false, hardware.cpu.registers),
	RotateRightC: hardware => rotateRight('c', false, hardware.cpu.registers),
	RotateRightD: hardware => rotateRight('d', false, hardware.cpu.registers),
	RotateRightE: hardware => rotateRight('e', false, hardware.cpu.registers),
	RotateRightH: hardware => rotateRight('h', false, hardware.cpu.registers),
	RotateRightL: hardware => rotateRight('l', false, hardware.cpu.registers),
	RotateRightHLAddress: hardware => rotateRightAddress(false, hardware),

	RotateRightAWithCarry: hardware => rotateRight('a', true, hardware.cpu.registers),
	RotateRightBWithCarry: hardware => rotateRight('b', true, hardware.cpu.registers),
	RotateRightCWithCarry: hardware => rotateRight('c', true, hardware.cpu.registers),
	RotateRightDWithCarry: hardware => rotateRight('d', true, hardware.cpu.registers),
	RotateRightEWithCarry: hardware => rotateRight('e', true, hardware.cpu.registers),
	RotateRightHWithCarry: hardware => rotateRight('h', true, hardware.cpu.registers),
	RotateRightLWithCarry: hardware => rotateRight('l', true, hardware.cpu.registers),
	RotateRightHLAddressWithCarry: hardware => rotateRightAddress(true, hardware),
};