import {Cpu} from './Emulator/CPU';
import {Gpu} from './Emulator/GPU';
import {HardwareBus} from './Emulator/Hardware';
import {Memory} from './Emulator/Memory';
import Monitor from './Monitor';

const cpu = new Cpu();
const memory = new Memory();
const gpu = new Gpu(<HTMLCanvasElement>document.getElementById('screen'));

const hardware = new HardwareBus(cpu, memory, gpu);

Monitor.attach(document.querySelector('#monitor'), hardware);

cpu.enableLog = true;

const romLoader = <HTMLInputElement>document.getElementById('rom-loader');

romLoader.addEventListener('change', () => {
	gpu.reset();
	memory.reset();
	cpu.reset();

	cpu.halt = true;

	if (!romLoader.files.length)
		return;

	memory.load(romLoader.files[0]).then(() => cpu.exec());
});