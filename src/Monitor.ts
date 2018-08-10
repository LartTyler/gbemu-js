import {Application} from './Application';
import {CpuInstructionCallEvent} from './Emulator/CPU/Events/CpuInstructionCallEvent';
import {RegisterKey} from './Emulator/CPU/Registers';
import {ResetEvent} from './Emulator/Events/ResetEvent';
import {lpad, toHex} from './Emulator/util';
import {isAfterInstructionCallEvent, isTickableCpu} from './guards';

const registerKeys: RegisterKey[] = ['a', 'b', 'c', 'd', 'e', 'h', 'l', 'flags', 'programCount', 'stackPointer', 'm', 't'];

class RegisterMonitor {
	private static attached: boolean = false;
	private static elements: {[key: string]: HTMLElement} = {};

	public static update(event: CpuInstructionCallEvent): void {
		if (!this.attached)
			return;

		const registers = event.cpu.registers;

		Object.keys(this.elements).forEach(key => {
			if (!this.elements[key])
				return;

			const length = key === 'programCount' || key === 'stackPointer' ? 4 : 2;

			let value = registers[<RegisterKey>key];

			if (key === 'programCount')
				value -= 1;

			this.elements[key].textContent = toHex(value, length);
		});
	}

	public static attach(root: HTMLElement) {
		if (this.attached)
			return;

		registerKeys.forEach(key => {
			this.elements[key] = root.querySelector(`#register-${key}`);
		});

		Application.getEventDispatcher().addListener(CpuInstructionCallEvent.NAME, event => {
			if (isAfterInstructionCallEvent(event))
				this.update(event);
		});

		this.attached = true;
	}
}

class InstructionMonitor {
	private static attached: boolean = false;

	private static outputContainer: HTMLDivElement;
	private static logLines: HTMLDivElement[] = [];

	public static attach(root: HTMLElement): void {
		if (InstructionMonitor.attached)
			return;

		this.outputContainer = root.querySelector('#instruction-log-output');

		Application.getEventDispatcher().addListener(CpuInstructionCallEvent.NAME, event => {
			if (isAfterInstructionCallEvent(event))
				this.update(event);
		});

		Application.getEventDispatcher().addListener(ResetEvent.NAME, () => {
			this.outputContainer.innerHTML = '';
		});

		this.attached = true;
	}

	public static update(event: CpuInstructionCallEvent): void {
		const cpu = event.cpu;

		if (isTickableCpu(cpu) && cpu.tickInterval === 1)
			return;

		if (this.logLines.length > 200) {
			const stale = this.logLines.shift();

			stale.remove();
		}

		const currentScrollPos = this.outputContainer.scrollTop;
		const currentScrollHeight = this.outputContainer.scrollHeight;

		let scroll = false;

		if (this.outputContainer.offsetHeight + currentScrollPos >= currentScrollHeight)
			scroll = true;

		const line = document.createElement('div');
		line.innerHTML = `
			${lpad((cpu.registers.programCount - 1).toString(), 5, '&nbsp;')} (${toHex(cpu.registers.programCount - 1, 4)}):
			[${toHex(event.operator.opcode)}]
			${event.operator.name}
		`;

		line.classList.add('log-line');

		this.outputContainer.appendChild(line);
		this.logLines.push(line);

		if (scroll)
			this.outputContainer.scrollTop = this.outputContainer.scrollHeight;
	}
}

export default class Monitor {
	public static attach(root: HTMLElement) {
		RegisterMonitor.attach(root.querySelector('#registers'));
		InstructionMonitor.attach(root.querySelector('#instruction-log'));
	}
}