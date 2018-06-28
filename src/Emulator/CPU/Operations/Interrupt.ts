import {HardwareBusInterface} from '../../Hardware';
import {RegisterKey, RegisterSetInterface} from '../Registers';
import {OperatorCallback, OperatorSet} from './index';

const registerKeys: RegisterKey[] = ['a', 'b', 'c', 'd', 'e', 'h', 'l'];

class RegisterStorage {
	private static registers: { [key: string]: number } = {
		a: 0,
		b: 0,
		c: 0,
		d: 0,
		e: 0,
		h: 0,
		l: 0,
	};

	public static save(registers: RegisterSetInterface): void {
		registerKeys.forEach(key => this.registers[key] = registers[key]);
	}

	public static restore(registers: RegisterSetInterface): void {
		registerKeys.forEach(key => registers[key] = this.registers[key]);
	}
}

const interrupt = (value: number, hardware: HardwareBusInterface) => {
	const registers = hardware.registers;

	RegisterStorage.save(registers);

	registers.stackPointer -= 2;
	hardware.memory.writeWord(registers.stackPointer, registers.programCount);

	registers.programCount = value;
	registers.m = 3;
};

export enum Interrupt {
	VBLANK = 1,
	LCD_STAT = 2,
	TIMER = 4,
	SERIAL = 8,
	JOYPAD = 16,
}

export interface InterruptOperatorSet extends OperatorSet {
	InterruptEnable: OperatorCallback;
	InterruptDisable: OperatorCallback;
	InterruptReturn: OperatorCallback;

	// TODO Find a better name for these (RSTXX)
	Interrupt00: OperatorCallback;
	Interrupt08: OperatorCallback;
	Interrupt10: OperatorCallback;
	Interrupt18: OperatorCallback;
	Interrupt20: OperatorCallback;
	Interrupt28: OperatorCallback;
	Interrupt30: OperatorCallback;
	Interrupt38: OperatorCallback;
	Interrupt40: OperatorCallback;
	Interrupt48: OperatorCallback;
	Interrupt50: OperatorCallback;
	Interrupt58: OperatorCallback;
	Interrupt60: OperatorCallback;
}

export const InterruptOperators: InterruptOperatorSet = {
	InterruptEnable: hardware => {
		hardware.cpu.allowInterrupts = true;
		hardware.registers.m = 1;
	},
	InterruptDisable: hardware => {
		hardware.cpu.allowInterrupts = false;
		hardware.registers.m = 1;
	},
	InterruptReturn: hardware => {
		const registers = hardware.registers;

		hardware.cpu.allowInterrupts = true;

		RegisterStorage.restore(registers);

		registers.programCount = hardware.memory.readWord(registers.stackPointer);
		registers.stackPointer += 2;

		registers.m = 3;
	},

	Interrupt00: hardware => interrupt(0x00, hardware),
	Interrupt08: hardware => interrupt(0x08, hardware),
	Interrupt10: hardware => interrupt(0x10, hardware),
	Interrupt18: hardware => interrupt(0x18, hardware),
	Interrupt20: hardware => interrupt(0x20, hardware),
	Interrupt28: hardware => interrupt(0x28, hardware),
	Interrupt30: hardware => interrupt(0x30, hardware),
	Interrupt38: hardware => interrupt(0x38, hardware),
	Interrupt40: hardware => interrupt(0x40, hardware),
	Interrupt48: hardware => interrupt(0x48, hardware),
	Interrupt50: hardware => interrupt(0x50, hardware),
	Interrupt58: hardware => interrupt(0x58, hardware),
	Interrupt60: hardware => interrupt(0x60, hardware),
};