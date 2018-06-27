import {HardwareBusInterface} from '../../../Hardware';
import {RegisterKey, RegisterSetInterface} from '../../Registers';
import {OperatorCallback, OperatorSet} from '../index';

const set = (name: RegisterKey, mask: number, registers: RegisterSetInterface) => {
	registers[name] = registers[name] & mask;

	registers.m = 2;
};

const setAddress = (mask: number, hardware: HardwareBusInterface) => {
	const memory = hardware.memory;
	const registers = hardware.cpu.registers;

	const address = (registers.h << 8) + registers.l;

	memory.writeByte(address, memory.readByte(address) & mask);

	registers.m = 4;
};

export interface SetOperatorSet extends OperatorSet {
	SetABit0: OperatorCallback;
	SetABit1: OperatorCallback;
	SetABit2: OperatorCallback;
	SetABit3: OperatorCallback;
	SetABit4: OperatorCallback;
	SetABit5: OperatorCallback;
	SetABit6: OperatorCallback;
	SetABit7: OperatorCallback;
	SetBBit0: OperatorCallback;
	SetBBit1: OperatorCallback;
	SetBBit2: OperatorCallback;
	SetBBit3: OperatorCallback;
	SetBBit4: OperatorCallback;
	SetBBit5: OperatorCallback;
	SetBBit6: OperatorCallback;
	SetBBit7: OperatorCallback;
	SetCBit0: OperatorCallback;
	SetCBit1: OperatorCallback;
	SetCBit2: OperatorCallback;
	SetCBit3: OperatorCallback;
	SetCBit4: OperatorCallback;
	SetCBit5: OperatorCallback;
	SetCBit6: OperatorCallback;
	SetCBit7: OperatorCallback;
	SetDBit0: OperatorCallback;
	SetDBit1: OperatorCallback;
	SetDBit2: OperatorCallback;
	SetDBit3: OperatorCallback;
	SetDBit4: OperatorCallback;
	SetDBit5: OperatorCallback;
	SetDBit6: OperatorCallback;
	SetDBit7: OperatorCallback;
	SetEBit0: OperatorCallback;
	SetEBit1: OperatorCallback;
	SetEBit2: OperatorCallback;
	SetEBit3: OperatorCallback;
	SetEBit4: OperatorCallback;
	SetEBit5: OperatorCallback;
	SetEBit6: OperatorCallback;
	SetEBit7: OperatorCallback;
	SetHBit0: OperatorCallback;
	SetHBit1: OperatorCallback;
	SetHBit2: OperatorCallback;
	SetHBit3: OperatorCallback;
	SetHBit4: OperatorCallback;
	SetHBit5: OperatorCallback;
	SetHBit6: OperatorCallback;
	SetHBit7: OperatorCallback;
	SetLBit0: OperatorCallback;
	SetLBit1: OperatorCallback;
	SetLBit2: OperatorCallback;
	SetLBit3: OperatorCallback;
	SetLBit4: OperatorCallback;
	SetLBit5: OperatorCallback;
	SetLBit6: OperatorCallback;
	SetLBit7: OperatorCallback;
	SetHLAddressBit0: OperatorCallback;
	SetHLAddressBit1: OperatorCallback;
	SetHLAddressBit2: OperatorCallback;
	SetHLAddressBit3: OperatorCallback;
	SetHLAddressBit4: OperatorCallback;
	SetHLAddressBit5: OperatorCallback;
	SetHLAddressBit6: OperatorCallback;
	SetHLAddressBit7: OperatorCallback;
}

const operators: Partial<SetOperatorSet> = {};

['a', 'b', 'c', 'd', 'e', 'h', 'l', 'm'].forEach((name: string) => {
	let mask = 0x01;

	for (let i = 0; i <= 7; i++) {
		let key;
		let callable;

		if (name === 'm') {
			key = `SetHLAddressBit${i}`;
			callable = (hardware: HardwareBusInterface) => setAddress(mask, hardware);
		} else {
			key = `Set${name.toUpperCase()}Bit${i}`;
			callable = (hardware: HardwareBusInterface) => set(<RegisterKey>name, mask, hardware.cpu.registers);
		}

		operators[key] = callable;

		mask *= 2;
	}
});

export const SetOperators: SetOperatorSet = <SetOperatorSet>operators;