import {HardwareBusInterface} from '../../Hardware';
import {RegisterFlag} from '../Registers';

export type OperatorCallback = (hardware: HardwareBusInterface) => void;

export interface OperatorSet {
	[key: string]: OperatorCallback;
}

export const testMask = (value: number, mask: number) => (value & mask) !== 0;
export const testZero = (hardware: HardwareBusInterface) => testMask(hardware.registers.flags, RegisterFlag.ZERO);
export const testCarry = (hardware: HardwareBusInterface) => testMask(hardware.registers.flags, RegisterFlag.CARRY);