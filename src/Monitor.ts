import {RegisterKey, RegisterSetInterface} from './Emulator/CPU/Registers';
import {HardwareBusInterface} from './Emulator/Hardware';
import {toHex} from './Emulator/util';

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

			this.elements[key].textContent = toHex(this.registers[<RegisterKey>key], 2);
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