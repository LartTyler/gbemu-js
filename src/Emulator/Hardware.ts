import {CpuInterface} from './CPU/index';
import {GpuInterface} from './GPU/index';
import {MemoryInterface} from './Memory/index';

export interface HardwareBusInterface {
	readonly cpu: CpuInterface;
	readonly memory: MemoryInterface;
	readonly gpu: GpuInterface;
}

export interface HardwareBusAwareInterface {
	setHardwareBus(hardware: HardwareBusInterface): void;
}

export class HardwareBus implements HardwareBusInterface {
	public readonly cpu: CpuInterface;
	public readonly memory: MemoryInterface;
	public readonly gpu: GpuInterface;

	public constructor(cpu: CpuInterface, memory: MemoryInterface, gpu: GpuInterface) {
		this.cpu = cpu;
		this.memory = memory;
		this.gpu = gpu;
	}
}