import {HardwareBusInterface} from '../../../Hardware';
import {RegisterKey} from '../../Registers';
import {PrimaryInstructions} from '../index';
import {Operator, OperatorInterface} from '../InstructionManager';

const compareRegister = (key: RegisterKey, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;
	const original = registers.a;

	PrimaryInstructions.getByName(`Subtract${key.toUpperCase()}`).invoke(hardware);

	registers.a = original;
};

const compareAddress = (opname: string, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;
	const original = registers.a;

	PrimaryInstructions.getByName(opname).invoke(hardware);

	registers.a = original;
};

export const CompareOperators: OperatorInterface[] = [
	// region Compare registers
	new Operator('CompareA', 0xBF, hardware => compareRegister('a', hardware)),
	new Operator('CompareB', 0xB8, hardware => compareRegister('b', hardware)),
	new Operator('CompareC', 0xB9, hardware => compareRegister('c', hardware)),
	new Operator('CompareD', 0xBA, hardware => compareRegister('d', hardware)),
	new Operator('CompareE', 0xBB, hardware => compareRegister('e', hardware)),
	new Operator('CompareH', 0xBC, hardware => compareRegister('h', hardware)),
	new Operator('CompareL', 0xBD, hardware => compareRegister('l', hardware)),
	// endregion

	// region Compare addresses
	new Operator('CompareHLAddress', 0xBE, hardware => compareAddress('SubtractHLAddress', hardware)),
	new Operator('ComparePCAddress', 0xFE, hardware => compareAddress('SubtractPCAddress', hardware)),
	// endregion
];