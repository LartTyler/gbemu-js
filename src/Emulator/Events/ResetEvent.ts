import {Event} from '../../Application/Events/EventDispatcher';
import {HardwareBusInterface} from '../Hardware';

export class ResetEvent extends Event {
	public static readonly NAME: string = 'reset';

	public readonly hardware: HardwareBusInterface;

	public constructor(hardware: HardwareBusInterface) {
		super();

		this.hardware = hardware;
	}
}