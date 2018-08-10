import {Application} from '../Application';
import {CpuInterface} from './CPU';
import {RegisterSetInterface} from './CPU/Registers';
import {ResetEvent} from './Events/ResetEvent';
import {GpuInterface} from './_GPU';
import {Joypad, JoypadInterface} from './Joypad';
import {MemoryInterface} from './Memory/Memory';

const isHardwareBusAware = (object: any): object is HardwareBusAwareInterface => {
	return 'setHardwareBus' in object;
};

export interface HardwareBusInterface {
	readonly cpu: CpuInterface;
	readonly memory: MemoryInterface;
	readonly gpu: GpuInterface;
	readonly registers: RegisterSetInterface;
	readonly joypad: JoypadInterface;

	reset(): void;
}

export interface HardwareBusAwareInterface {
	setHardwareBus(hardware: HardwareBusInterface): void;
}

export class HardwareBus implements HardwareBusInterface {
	public readonly cpu: CpuInterface;
	public readonly memory: MemoryInterface;
	public readonly gpu: GpuInterface;
	public readonly joypad: JoypadInterface;

	public constructor(cpu: CpuInterface, memory: MemoryInterface, gpu: GpuInterface, joypad?: JoypadInterface) {
		this.cpu = cpu;
		this.memory = memory;
		this.gpu = gpu;
		this.joypad = joypad || new Joypad();

		if (isHardwareBusAware(cpu))
			cpu.setHardwareBus(this);

		if (isHardwareBusAware(memory))
			memory.setHardwareBus(this);

		if (isHardwareBusAware(gpu))
			gpu.setHardwareBus(this);

		if (isHardwareBusAware(this.joypad))
			this.joypad.setHardwareBus(this);
	}

	get registers(): RegisterSetInterface {
		return this.cpu.registers;
	}

	public reset(): void {
		this.cpu.reset();
		this.memory.reset();
		this.gpu.reset();

		Application.getEventDispatcher().dispatch(new ResetEvent(this));
	}
}