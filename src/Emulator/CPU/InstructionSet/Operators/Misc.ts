import {Application} from '../../../../Application';
import {toHex} from '../../../util';
import {CpuInstructionCallEvent} from '../../Events/CpuInstructionCallEvent';
import {RegisterFlag} from '../../Registers';
import {BitInstructions} from '../index';
import {Operator, OperatorInterface} from '../InstructionManager';

export const MiscOperators: OperatorInterface[] = [
	new Operator('Noop', 0x00, hardware => {
		hardware.registers.m = 1;
	}, 'NOP'),
	new Operator('Halt', 0x76, hardware => {
		hardware.cpu.halt = true;
		hardware.registers.m = 1;
	}, 'HALT'),
	new Operator('BitInstructionShift', 0xCB, hardware => {
		const registers = hardware.registers;

		const opcode = hardware.memory.readByte(registers.programCount++);
		const operator = BitInstructions.getByCode(opcode);

		registers.programCount &= 65535;

		Application.getEventDispatcher().dispatch(new CpuInstructionCallEvent(hardware.cpu, operator));

		if (operator)
			operator.invoke(hardware);
		else
			throw new Error(`Bit instruction ${toHex(opcode)} is not implemented (at ${(registers.programCount - 1) & 65535})`);
	}, null, 1),
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
	new Operator('ComplementA', 0x2F, hardware => {
		const registers = hardware.registers;

		registers.a ^= 255;
		registers.flags |= RegisterFlag.HALF_CARRY | RegisterFlag.OPERATION;

		registers.m = 1;
	}),
	new Operator('ComplementCarryFlag', 0x3F, hardware => {
		const registers = hardware.registers;
		const carry = registers.flags & RegisterFlag.CARRY;

		registers.flags = (registers.flags & RegisterFlag.ZERO) | (carry ? 0 : RegisterFlag.CARRY);
		registers.m = 1;
	}),
	new Operator('SetCarryFlag', 0x37, hardware => {
		const registers = hardware.registers;

		registers.flags = (registers.flags & RegisterFlag.ZERO) | RegisterFlag.CARRY;
		registers.m = 1;
	}),
];
