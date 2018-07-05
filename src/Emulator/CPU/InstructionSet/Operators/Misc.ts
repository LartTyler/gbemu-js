import {toHex} from '../../../util';
import {BitInstructions, Operator, OperatorInterface, PrimaryInstructions} from '../Operators';

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
			throw new Error(`Bit instruction ${toHex(opcode)} is not implemented (at ${(registers.programCount - 1) & 65535}`);
	}),
];

MiscOperators.forEach(PrimaryInstructions.register);