import {Gpu} from '../../../GPU';
import {HardwareBus} from '../../../Hardware';
import {Memory} from '../../../Memory';
import {Cpu} from '../../index';
import {PrimaryInstructions} from '../index';

jest.mock('../../../GPU');

describe('Miscellaneous operators', () => {
	const hardware = new HardwareBus(new Cpu(), new Memory(), new Gpu(null));

	test('Noop', () => {
		const operator = PrimaryInstructions.getByCode(0x0);

		expect(operator).not.toBeNull();
		expect(operator.name).toBe('Noop');

		operator.invoke(hardware);

		expect(hardware.registers.m).toBe(1);
	});
});