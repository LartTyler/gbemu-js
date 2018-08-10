import {CpuInterface} from '../index';
import {CpuEvent} from './CpuEvent';

export class CpuStepEvent extends CpuEvent {
	public static readonly NAME: string = 'cpu.step';

	public constructor(cpu: CpuInterface) {
		super(cpu);
	}
}