import {RegisterKey, RegisterSetInterface} from './Emulator/CPU/Registers';
import {HardwareBusInterface} from './Emulator/Hardware';

const registerKeys: RegisterKey[] = ['a', 'b', 'c', 'd', 'e', 'h', 'l', 'flags', 'programCount', 'stackPointer', 'm', 't'];

class RegisterMonitor {
	private static attached: boolean = false;
	private static registers: RegisterSetInterface = null;
	private static elements: {[key: string]: HTMLElement} = {};

	public static update(): void {
		if (!this.attached)
			return;

		Object.keys(this.elements).forEach(key => {
			if (!this.elements[key])
				return;

			let value = this.registers[<RegisterKey>key].toString(16);

			if (value.length < 2)
				value = `0${value}`;

			this.elements[key].textContent = '0x' + value;
		});
	}

	public static attach(root: HTMLElement, registers: RegisterSetInterface) {
		registerKeys.forEach(key => {
			this.elements[key] = root.querySelector(`#register-${key}`);
		});

		this.attached = true;
		this.registers = registers;
	}
}

export default class Monitor {
	private static updateIntervalId: number = null;

	public static attach(root: HTMLElement, hardware: HardwareBusInterface) {
		RegisterMonitor.attach(root.querySelector('#registers'), hardware.registers);

		this.updateIntervalId = setInterval(() => {
			RegisterMonitor.update();
		});
	}
}