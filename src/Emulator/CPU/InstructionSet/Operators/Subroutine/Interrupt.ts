import {HardwareBusInterface} from '../../../../Hardware';
import {Operator, OperatorInterface} from '../../InstructionManager';

const interrupt = (target: number, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	registers.save();

	registers.stackPointer -= 2;
	hardware.memory.writeWord(registers.stackPointer, registers.programCount);

	registers.programCount = target;

	registers.m = 3;
};

export const InterruptOperators: OperatorInterface[] = [
	new Operator('InterruptJumpTo00h', 0xC7, hardware => interrupt(0x00, hardware)),
	new Operator('InterruptJumpTo08h', 0xCF, hardware => interrupt(0x08, hardware)),
	new Operator('InterruptJumpTo10h', 0xD7, hardware => interrupt(0x10, hardware)),
	new Operator('InterruptJumpTo18h', 0xDF, hardware => interrupt(0x18, hardware)),
	new Operator('InterruptJumpTo20h', 0xE7, hardware => interrupt(0x20, hardware)),
	new Operator('InterruptJumpTo28h', 0xEF, hardware => interrupt(0x28, hardware)),
	new Operator('InterruptJumpTo30h', 0xF7, hardware => interrupt(0x30, hardware)),
	new Operator('InterruptJumpTo38h', 0xFF, hardware => interrupt(0x38, hardware)),

	new Operator('DisableInterrupts', 0xF3, hardware => {
		hardware.cpu.allowInterrupts = false;

		hardware.registers.m = 1;
	}),
	new Operator('EnableInterrupts', 0xFB, hardware => {
		hardware.cpu.allowInterrupts = true;

		hardware.registers.m = 1;
	}),
];