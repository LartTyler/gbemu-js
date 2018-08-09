import {DumpBiosCommand} from './Commands/DumpBiosCommand';
import {GetInstructionCommand} from './Commands/GetInstructionCommand';

export interface Command {
	execute(...args: any[]): void;
}

export class Console {
	private commands: {[key: string]: Command};

	constructor() {
		this.commands = {
			'bios:dump': new DumpBiosCommand(),
			'instruction:info': new GetInstructionCommand(),
		};
	}

	public getCommand(name: string): Command | null {
		if (name in this.commands)
			return this.commands[name];

		return null;
	}

	public execute(name: string, ...args: any[]): void {
		const command = this.getCommand(name);

		if (!command)
			throw new Error(`No command named ${name} found`);

		command.execute(...args);
	}
}