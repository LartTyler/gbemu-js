import {toHex} from '../../../util';
import {RegisterFlag} from '../../Registers';
import {BitInstructions} from '../index';
import {Operator, OperatorInterface} from '../InstructionManager';

export const MiscOperators: OperatorInterface[] = [
	new Operator('Noop', 0x00, hardware => {
		hardware.registers.m = 1;
	}),
	new Operator('BitInstructionShift', 0xCB, hardware => {
		const registers = hardware.registers;

		const opcode = hardware.memory.readByte(registers.programCount++);
		const operator = BitInstructions.getByCode(opcode);

		registers.programCount &= 65535;

		if (operator)
			operator.invoke(hardware);
		else
			throw new Error(`Bit instruction ${toHex(opcode)} is not implemented (at ${(registers.programCount - 1) & 65535})`);
	}),
	new Operator('DecimalAdjust', 0x27, hardware => {
		const registers = hardware.registers;

		let value = registers.a;

		if ((registers.flags & RegisterFlag.HALF_CARRY) || (value & 0xFF) > 9)
			registers.a += 6;

		registers.flags &= ~RegisterFlag.CARRY;

		if ((registers.flags & RegisterFlag.HALF_CARRY) || value > 0x99) {
			registers.a += 0x60;

			registers.flags |= RegisterFlag.CARRY;
		}

		registers.m = 1;
	}),
];