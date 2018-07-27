import {HardwareBusInterface} from '../../../../Hardware';
import {RegisterFlag, RegisterKey} from '../../../Registers';
import {OperatorInterface} from '../../InstructionManager';

const rotateLeft = (key: RegisterKey, value: number, hardware: HardwareBusInterface): void => {
	const registers = hardware.registers;

	const original = registers[key];
};

export const RotateLeftPrimaryOperators: OperatorInterface[] = [

];

export const RotateLeftBitOperators: OperatorInterface[] = [

];