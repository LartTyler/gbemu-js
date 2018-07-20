import {Gpu} from '../../../../GPU';
import {HardwareBus} from '../../../../Hardware';
import {Memory} from '../../../../Memory';
import {Cpu} from '../../../index';
import {RegisterKey} from '../../../Registers';
import {BitInstructions} from '../../index';

jest.mock('../../../../GPU');

describe('Bit reset operators', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory(), new Gpu(null));
	const {memory, registers} = hardware;

	// region Registers
	const runRegisterTests = (key: RegisterKey, position: number, opcode: number): void => {
		const operator = BitInstructions.getByCode(opcode);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe(`ResetBit${position}In${key.toUpperCase()}`);

		registers[key] = 0;

		operator.invoke(hardware);

		expect(registers[key]).toBe(0);
		expect(registers.m).toBe(2);
	};
	// endregion
});