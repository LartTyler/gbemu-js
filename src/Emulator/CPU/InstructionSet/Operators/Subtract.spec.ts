import {Gpu} from '../../../GPU';
import {HardwareBus} from '../../../Hardware';
import {Memory} from '../../../Memory';
import {Cpu} from '../../index';
import {RegisterFlag, RegisterKey} from '../../Registers';
import {PrimaryInstructions} from '../index';

jest.mock('../../../GPU');

describe('Subtract operators', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory(), new Gpu(null));
	const {memory, registers} = hardware;

	beforeEach(() => {
		memory.reset();
		registers.reset();
	});

	// region Subtract registers
	const runRegisterTests = (key: RegisterKey, opcode: number): void => {
		const operator = PrimaryInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`Subtract${key.toUpperCase()}`);

		// TODO Finish subtract tests
	};

	test('SubtractA', () => {
		const operator = PrimaryInstructions.getByCode(0x97);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`SubtractA`);

		registers.a = 3;
		registers.flags = 0;

		operator.invoke(hardware);

		expect(registers.a).toBe(0);
		expect(registers.m).toBe(1);
		expect(registers.flags).toBe(RegisterFlag.OPERATION | RegisterFlag.ZERO);
	});

	test('SubtractB', () => runRegisterTests('b', 0x90));
	// endregion
});