import {CpuInterface} from './CPU';
import {RegisterSetInterface} from './CPU/Registers';
import {GpuInterface} from './GPU';
import {MemoryInterface} from './Memory';

export interface HardwareBusInterface {
	readonly cpu: CpuInterface;
	readonly memory: MemoryInterface;
	readonly gpu: GpuInterface;
	readonly registers: RegisterSetInterface;
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

	get registers(): RegisterSetInterface {
		return this.cpu.registers;
	}
}