import {HardwareBusInterface} from '../../../../Hardware';
import {pairTo16Bit} from '../../../../util';
import {RegisterFlag, RegisterKey} from '../../../Registers';
import {Operator, OperatorInterface} from '../../InstructionManager';

const rotate = (value: number, hardware: HardwareBusInterface): number => {
	const registers = hardware.registers;
	const highBit = value & 0x80;

	value = ((value << 1) + (highBit ? 1 : 0)) & 255;
	registers.flags = highBit ? RegisterFlag.CARRY : 0;

	if (!value)
		registers.flags |= RegisterFlag.ZERO;

	return value;
};

const rotateRegister = (key: RegisterKey, fast: boolean, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	registers[key] = rotate(registers[key], hardware);
	registers.m = fast ? 1 : 2;

	// Per spec, fast calls (such as RLCA / RotateALeftCircularFast) should reset all flags except CARRY
	if (fast)
		registers.flags &= RegisterFlag.CARRY;
};

export const RotateLeftCircularPrimaryOperators: OperatorInterface[] = [
	new Operator('RotateALeftCircularFast', 0x07, hardware => rotateRegister('a', true, hardware), 'RLCA'),
];

export const RotateLeftCircularBitOperators: OperatorInterface[] = [
	// region Registers
	new Operator('RotateALeftCircular', 0x07, hardware => rotateRegister('a', false, hardware), 'RLC a'),
	new Operator('RotateBLeftCircular', 0x00, hardware => rotateRegister('b', false, hardware), 'RLC b'),
	new Operator('RotateCLeftCircular', 0x01, hardware => rotateRegister('c', false, hardware), 'RLC c'),
	new Operator('RotateDLeftCircular', 0x02, hardware => rotateRegister('d', false, hardware), 'RLC d'),
	new Operator('RotateELeftCircular', 0x03, hardware => rotateRegister('e', false, hardware), 'RLC e'),
	new Operator('RotateHLeftCircular', 0x04, hardware => rotateRegister('h', false, hardware), 'RLC h'),
	new Operator('RotateLLeftCircular', 0x05, hardware => rotateRegister('l', false, hardware), 'RLC l'),
	// endregion

	new Operator('RotateHLAddressLeftCircular', 0x06, hardware => {
		const {memory, registers} = hardware;
		const address = pairTo16Bit(registers.h, registers.l);

		memory.writeByte(address, rotate(memory.readByte(address), hardware));

		registers.m = 4;
	}, 'RLC (hl)'),
];