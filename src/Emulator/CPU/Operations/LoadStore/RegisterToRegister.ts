import {RegisterKey, RegisterSetInterface} from '../../Registers';
import {OperatorCallback, OperatorSet} from '../index';

const writeToRegister = (destination: RegisterKey, source: number, registers: RegisterSetInterface) => {
	registers[destination] = source;

	registers.m = 1;
};

/**
 * Keys follow the pattern of LoadRegXY, meaning:
 * 		Load the value of Y into X
 */
export interface RegisterToRegisterOperatorSet extends OperatorSet {
	LoadRegAA: OperatorCallback;
	LoadRegAB: OperatorCallback;
	LoadRegAC: OperatorCallback;
	LoadRegAD: OperatorCallback;
	LoadRegAE: OperatorCallback;
	LoadRegAH: OperatorCallback;
	LoadRegAL: OperatorCallback;
	LoadRegBA: OperatorCallback;
	LoadRegBB: OperatorCallback;
	LoadRegBC: OperatorCallback;
	LoadRegBD: OperatorCallback;
	LoadRegBE: OperatorCallback;
	LoadRegBH: OperatorCallback;
	LoadRegBL: OperatorCallback;
	LoadRegCA: OperatorCallback;
	LoadRegCB: OperatorCallback;
	LoadRegCC: OperatorCallback;
	LoadRegCD: OperatorCallback;
	LoadRegCE: OperatorCallback;
	LoadRegCH: OperatorCallback;
	LoadRegCL: OperatorCallback;
	LoadRegDA: OperatorCallback;
	LoadRegDB: OperatorCallback;
	LoadRegDC: OperatorCallback;
	LoadRegDD: OperatorCallback;
	LoadRegDE: OperatorCallback;
	LoadRegDH: OperatorCallback;
	LoadRegDL: OperatorCallback;
	LoadRegEA: OperatorCallback;
	LoadRegEB: OperatorCallback;
	LoadRegEC: OperatorCallback;
	LoadRegED: OperatorCallback;
	LoadRegEE: OperatorCallback;
	LoadRegEH: OperatorCallback;
	LoadRegEL: OperatorCallback;
	LoadRegHA: OperatorCallback;
	LoadRegHB: OperatorCallback;
	LoadRegHC: OperatorCallback;
	LoadRegHD: OperatorCallback;
	LoadRegHE: OperatorCallback;
	LoadRegHH: OperatorCallback;
	LoadRegHL: OperatorCallback;
	LoadRegLA: OperatorCallback;
	LoadRegLB: OperatorCallback;
	LoadRegLC: OperatorCallback;
	LoadRegLD: OperatorCallback;
	LoadRegLE: OperatorCallback;
	LoadRegLH: OperatorCallback;
	LoadRegLL: OperatorCallback;
}

export const RegisterToRegisterOperators: RegisterToRegisterOperatorSet = {
	LoadRegAA: hardware => writeToRegister('a', hardware.cpu.registers.a, hardware.cpu.registers),
	LoadRegAB: hardware => writeToRegister('a', hardware.cpu.registers.b, hardware.cpu.registers),
	LoadRegAC: hardware => writeToRegister('a', hardware.cpu.registers.c, hardware.cpu.registers),
	LoadRegAD: hardware => writeToRegister('a', hardware.cpu.registers.d, hardware.cpu.registers),
	LoadRegAE: hardware => writeToRegister('a', hardware.cpu.registers.e, hardware.cpu.registers),
	LoadRegAH: hardware => writeToRegister('a', hardware.cpu.registers.h, hardware.cpu.registers),
	LoadRegAL: hardware => writeToRegister('a', hardware.cpu.registers.l, hardware.cpu.registers),
	LoadRegBA: hardware => writeToRegister('b', hardware.cpu.registers.a, hardware.cpu.registers),
	LoadRegBB: hardware => writeToRegister('b', hardware.cpu.registers.b, hardware.cpu.registers),
	LoadRegBC: hardware => writeToRegister('b', hardware.cpu.registers.c, hardware.cpu.registers),
	LoadRegBD: hardware => writeToRegister('b', hardware.cpu.registers.d, hardware.cpu.registers),
	LoadRegBE: hardware => writeToRegister('b', hardware.cpu.registers.e, hardware.cpu.registers),
	LoadRegBH: hardware => writeToRegister('b', hardware.cpu.registers.h, hardware.cpu.registers),
	LoadRegBL: hardware => writeToRegister('b', hardware.cpu.registers.l, hardware.cpu.registers),
	LoadRegCA: hardware => writeToRegister('c', hardware.cpu.registers.a, hardware.cpu.registers),
	LoadRegCB: hardware => writeToRegister('c', hardware.cpu.registers.b, hardware.cpu.registers),
	LoadRegCC: hardware => writeToRegister('c', hardware.cpu.registers.c, hardware.cpu.registers),
	LoadRegCD: hardware => writeToRegister('c', hardware.cpu.registers.d, hardware.cpu.registers),
	LoadRegCE: hardware => writeToRegister('c', hardware.cpu.registers.e, hardware.cpu.registers),
	LoadRegCH: hardware => writeToRegister('c', hardware.cpu.registers.h, hardware.cpu.registers),
	LoadRegCL: hardware => writeToRegister('c', hardware.cpu.registers.l, hardware.cpu.registers),
	LoadRegDA: hardware => writeToRegister('d', hardware.cpu.registers.a, hardware.cpu.registers),
	LoadRegDB: hardware => writeToRegister('d', hardware.cpu.registers.b, hardware.cpu.registers),
	LoadRegDC: hardware => writeToRegister('d', hardware.cpu.registers.c, hardware.cpu.registers),
	LoadRegDD: hardware => writeToRegister('d', hardware.cpu.registers.d, hardware.cpu.registers),
	LoadRegDE: hardware => writeToRegister('d', hardware.cpu.registers.e, hardware.cpu.registers),
	LoadRegDH: hardware => writeToRegister('d', hardware.cpu.registers.h, hardware.cpu.registers),
	LoadRegDL: hardware => writeToRegister('d', hardware.cpu.registers.l, hardware.cpu.registers),
	LoadRegEA: hardware => writeToRegister('e', hardware.cpu.registers.a, hardware.cpu.registers),
	LoadRegEB: hardware => writeToRegister('e', hardware.cpu.registers.b, hardware.cpu.registers),
	LoadRegEC: hardware => writeToRegister('e', hardware.cpu.registers.c, hardware.cpu.registers),
	LoadRegED: hardware => writeToRegister('e', hardware.cpu.registers.d, hardware.cpu.registers),
	LoadRegEE: hardware => writeToRegister('e', hardware.cpu.registers.e, hardware.cpu.registers),
	LoadRegEH: hardware => writeToRegister('e', hardware.cpu.registers.h, hardware.cpu.registers),
	LoadRegEL: hardware => writeToRegister('e', hardware.cpu.registers.l, hardware.cpu.registers),
	LoadRegHA: hardware => writeToRegister('h', hardware.cpu.registers.a, hardware.cpu.registers),
	LoadRegHB: hardware => writeToRegister('h', hardware.cpu.registers.b, hardware.cpu.registers),
	LoadRegHC: hardware => writeToRegister('h', hardware.cpu.registers.c, hardware.cpu.registers),
	LoadRegHD: hardware => writeToRegister('h', hardware.cpu.registers.d, hardware.cpu.registers),
	LoadRegHE: hardware => writeToRegister('h', hardware.cpu.registers.e, hardware.cpu.registers),
	LoadRegHH: hardware => writeToRegister('h', hardware.cpu.registers.h, hardware.cpu.registers),
	LoadRegHL: hardware => writeToRegister('h', hardware.cpu.registers.l, hardware.cpu.registers),
	LoadRegLA: hardware => writeToRegister('l', hardware.cpu.registers.a, hardware.cpu.registers),
	LoadRegLB: hardware => writeToRegister('l', hardware.cpu.registers.b, hardware.cpu.registers),
	LoadRegLC: hardware => writeToRegister('l', hardware.cpu.registers.c, hardware.cpu.registers),
	LoadRegLD: hardware => writeToRegister('l', hardware.cpu.registers.d, hardware.cpu.registers),
	LoadRegLE: hardware => writeToRegister('l', hardware.cpu.registers.e, hardware.cpu.registers),
	LoadRegLH: hardware => writeToRegister('l', hardware.cpu.registers.h, hardware.cpu.registers),
	LoadRegLL: hardware => writeToRegister('l', hardware.cpu.registers.l, hardware.cpu.registers),
};