import {Cpu} from './Emulator/CPU/index';
import {Gpu} from './Emulator/GPU/index';
import {HardwareBus} from './Emulator/Hardware';
import {Memory} from './Emulator/Memory/index';

const cpu = new Cpu();
const memory = new Memory();
const gpu = new Gpu(<HTMLCanvasElement>document.getElementById('screen'));

const hardware = new HardwareBus(cpu, memory, gpu);

cpu.setHardwareBus(hardware);
memory.setHardwareBus(hardware);
gpu.setHardwareBus(hardware);

const romLoader = <HTMLInputElement>document.getElementById('rom-loader');

romLoader.addEventListener('change', () => {
	gpu.reset();
	memory.reset();
	cpu.reset();

	cpu.halt = true;

	if (!romLoader.files.length)
		return;

	gpu.load(romLoader.files[0]);

	cpu.exec();
});