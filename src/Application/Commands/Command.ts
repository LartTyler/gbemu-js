export interface Command {
	getName(): string;
	execute(...args: any[]): void;
}

export interface CommandManagerInterface {
	getCommand(name: string): Command | null;
	execute(name: string, ...args: any[]): void;
}

export class CommandManager implements CommandManagerInterface {
	protected commands: {[name: string]: Command} = {};

	public constructor(commands: Command[]) {
		commands.forEach(command => this.commands[command.getName()] = command);
	}

	public getCommand(name: string): Command | null {
		return name in this.commands ? this.commands[name] : null;
	}

	public execute(name: string, ...args: any[]): void {
		const command = this.getCommand(name);

		if (!command)
			throw new Error(`Could not find command named ${name}`);

		command.execute(...args);
	}
}