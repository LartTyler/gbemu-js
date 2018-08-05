import {HardwareBusInterface} from '../../../../Hardware';
import {RegisterFlag} from '../../../Registers';

const testMask = (value: number, mask: number): boolean => (value & mask) !== 0;

export const testZero = (hardware: HardwareBusInterface): boolean => {
	return testMask(hardware.registers.flags, RegisterFlag.ZERO);
};

export const testCarry = (hardware: HardwareBusInterface): boolean => {
	return testMask(hardware.registers.flags, RegisterFlag.CARRY);
};