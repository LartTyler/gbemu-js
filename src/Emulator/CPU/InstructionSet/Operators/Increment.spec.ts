import {Gpu} from '../../../GPU';
import {HardwareBus} from '../../../Hardware';
import {Memory} from '../../../Memory';
import {Cpu} from '../../index';
import {RegisterFlag, RegisterKey} from '../../Registers';
import {PrimaryInstructions} from '../index';

jest.mock('../../../GPU');

describe('Increment operators', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory(), new Gpu(null));
	const {memory, registers} = hardware;

	// region Registers
	const runRegisterTests = (key: RegisterKey, opcode: number): void => {
		const operator = PrimaryInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`Increment${key.toUpperCase()}`);

		registers[key] = 1;

		operator.invoke(hardware);

		expect(registers[key]).toBe(2);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(0);

		registers[key] = 255;

		operator.invoke(hardware);

		expect(registers[key]).toBe(0);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.ZERO);
	};

	test('IncrementA', () => runRegisterTests('a', 0x3C));
	test('IncrementB', () => runRegisterTests('b', 0x04));
	test('IncrementC', () => runRegisterTests('c', 0x0C));
	test('IncrementD', () => runRegisterTests('d', 0x14));
	test('IncrementE', () => runRegisterTests('e', 0x1C));
	test('IncrementH', () => runRegisterTests('h', 0x24));
	test('IncrementL', () => runRegisterTests('l', 0x2C));
	// endregion
});