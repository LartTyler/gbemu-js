import {Event} from '../../../Application/Events/EventDispatcher';
import {CpuInterface} from '../index';

export abstract class CpuEvent extends Event {
	public readonly cpu: CpuInterface;

	public constructor(cpu: CpuInterface) {
		super();

		this.cpu = cpu;
	}
}