import {HardwareBusInterface} from '../../../Hardware';
import {RegisterKey, RegisterSetInterface} from '../../Registers';
import {OperatorCallback, OperatorSet} from '../index';

const rotateLeft = (name: RegisterKey, carry: boolean, registers: RegisterSetInterface) => {
	const flagMask = carry ? 0x80 : 0x10;

	const ci = registers.flags & flagMask ? 1 : 0;
	const co = registers[name] & 0x80 ? 0x10 : 0;

	registers[name] = ((registers[name] << 1) + ci) & 255;
	registers.flags = (registers.flags & 0xEF) + co;

	registers.m = name === 'a' ? 1 : 2;
};

const rotateLeftAddress = (carry: boolean, hardware: HardwareBusInterface) => {
	const memory = hardware.memory;
	const registers = hardware.cpu.registers;

	const flagMask = carry ? 0x80 : 0x10;
	const address = (registers.h << 8) + registers.l;

	let i = memory.readByte(address);

	const ci = registers.flags & flagMask ? 1 : 0;
	const co = i & 0x80 ? 0x10 : 0;

	i = ((i << 1) + ci) & 255;

	registers.flags = i ? 0 : 0x80;

	memory.writeByte(address, i);

	registers.flags = (registers.flags & 0xEF) + co;

	registers.m = 4;
};

export interface RotateLeftOperatorSet extends OperatorSet {
	RotateLeftA: OperatorCallback;
	RotateLeftB: OperatorCallback;
	RotateLeftC: OperatorCallback;
	RotateLeftD: OperatorCallback;
	RotateLeftE: OperatorCallback;
	RotateLeftH: OperatorCallback;
	RotateLeftL: OperatorCallback;
	RotateLeftHLAddress: OperatorCallback;

	RotateLeftAWithCarry: OperatorCallback;
	RotateLeftBWithCarry: OperatorCallback;
	RotateLeftCWithCarry: OperatorCallback;
	RotateLeftDWithCarry: OperatorCallback;
	RotateLeftEWithCarry: OperatorCallback;
	RotateLeftHWithCarry: OperatorCallback;
	RotateLeftLWithCarry: OperatorCallback;
	RotateLeftHLAddressWithCarry: OperatorCallback;
}

export const RotateLeftOperators: RotateLeftOperatorSet = {
	RotateLeftA: hardware => rotateLeft('a', false, hardware.cpu.registers),
	RotateLeftB: hardware => rotateLeft('b', false, hardware.cpu.registers),
	RotateLeftC: hardware => rotateLeft('c', false, hardware.cpu.registers),
	RotateLeftD: hardware => rotateLeft('d', false, hardware.cpu.registers),
	RotateLeftE: hardware => rotateLeft('e', false, hardware.cpu.registers),
	RotateLeftH: hardware => rotateLeft('h', false, hardware.cpu.registers),
	RotateLeftL: hardware => rotateLeft('l', false, hardware.cpu.registers),
	RotateLeftHLAddress: hardware => rotateLeftAddress(false, hardware),

	RotateLeftAWithCarry: hardware => rotateLeft('a', true, hardware.cpu.registers),
	RotateLeftBWithCarry: hardware => rotateLeft('b', true, hardware.cpu.registers),
	RotateLeftCWithCarry: hardware => rotateLeft('c', true, hardware.cpu.registers),
	RotateLeftDWithCarry: hardware => rotateLeft('d', true, hardware.cpu.registers),
	RotateLeftEWithCarry: hardware => rotateLeft('e', true, hardware.cpu.registers),
	RotateLeftHWithCarry: hardware => rotateLeft('h', true, hardware.cpu.registers),
	RotateLeftLWithCarry: hardware => rotateLeft('l', true, hardware.cpu.registers),
	RotateLeftHLAddressWithCarry: hardware => rotateLeftAddress(true, hardware),
};