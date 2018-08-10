import {CpuInterface} from '../index';
import {CpuEvent} from './CpuEvent';

export class CpuAfterStepEvent extends CpuEvent {
	public static readonly NAME: string = 'cpu.step.after';

	public constructor(cpu: CpuInterface) {
		super(cpu);
	}
}