import {HardwareBusInterface} from '../Emulator/Hardware';
import {isTickableCpu} from '../guards';

export class DebugControls {
	protected hardware: HardwareBusInterface;

	public constructor(hardware: HardwareBusInterface) {
		this.hardware = hardware;

		const pauseButton = <HTMLButtonElement>document.getElementById('debug-pause-button');
		pauseButton.addEventListener('click', () => this.hardware.cpu.halt = true);

		const resumeButton = <HTMLButtonElement>document.getElementById('debug-resume-button');
		resumeButton.addEventListener('click', () => {
			if (this.hardware.cpu.halt)
				this.hardware.cpu.exec();
		});

		const cpu = hardware.cpu;

		if (isTickableCpu(cpu)) {
			const tickUpdateButton = <HTMLButtonElement>document.getElementById('debug-update-tick-interval-button');
			const tickUpdateInput = <HTMLInputElement>document.getElementById('debug-tick-interval');

			tickUpdateInput.value = localStorage.getItem('debug_cpu_tick_rate') || '1';

			tickUpdateButton.addEventListener('click', () => {
				const tickRate = parseInt(tickUpdateInput.value, 10);

				localStorage.setItem('debug_cpu_tick_rate', tickRate.toString(10));

				cpu.tickInterval = Math.max(1, tickRate);
			});

			tickUpdateInput.addEventListener('blur', () => tickUpdateButton.click());
		}

		const resetButton = <HTMLButtonElement>document.getElementById('debug-reset-button');
		resetButton.addEventListener('click', () => {
			hardware.reset();

			hardware.cpu.exec();
		});
	}
}