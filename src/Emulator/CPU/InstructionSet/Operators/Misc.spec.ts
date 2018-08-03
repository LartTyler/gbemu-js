import {Gpu} from '../../../GPU';
import {HardwareBus} from '../../../Hardware';
import {Memory} from '../../../Memory';
import {Cpu} from '../../index';
import {RegisterFlag} from '../../Registers';
import {PrimaryInstructions} from '../index';

jest.mock('../../../GPU');

describe('Miscellaneous operators', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory(), new Gpu(null));
	const registers = hardware.registers;

	test('Noop', () => {
		const operator = PrimaryInstructions.getByCode(0x0);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('Noop');

		operator.invoke(hardware);

		expect(hardware.registers.m).toBe(1);
	});

	test('DecimalAdjust', () => {
		const operator = PrimaryInstructions.getByCode(0x27);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('DecimalAdjust');

		// TODO Add test for DecimalAdjust
	});

	test('ComplementA', () => {
		const operator = PrimaryInstructions.getByCode(0x2F);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('ComplementA');

		const flags = RegisterFlag.HALF_CARRY | RegisterFlag.OPERATION;

		registers.a = 0;
		registers.flags = RegisterFlag.ZERO;
		operator.invoke(hardware);

		expect(registers.a).toBe(255);
		expect(registers.flags).toBe(flags | RegisterFlag.ZERO);
		expect(registers.m).toBe(1);

		registers.flags = 0;
		operator.invoke(hardware);

		expect(registers.a).toBe(0);
		expect(registers.flags).toBe(flags);
		expect(registers.m).toBe(1);

		registers.a = 1;
		registers.flags = 0;
		operator.invoke(hardware);

		expect(registers.a).toBe(254);
		expect(registers.flags).toBe(flags);
		expect(registers.m).toBe(1);

		registers.a = 0b1011;
		operator.invoke(hardware);

		expect(registers.a).toBe(0b11110100);
		expect(registers.flags).toBe(flags);
		expect(registers.m).toBe(1);
	});
});