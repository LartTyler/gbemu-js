import {commands as defaultCommands} from './Commands';
import {CommandManagerInterface} from './Commands/Command';
import {eventDispatcher} from './Events';
import {EventDispatcher} from './Events/EventDispatcher';

export class Application {
	protected commands: CommandManagerInterface;
	protected eventDispatcher: EventDispatcher;

	public constructor(commands: CommandManagerInterface = null) {
		this.commands = commands || defaultCommands;
		this.eventDispatcher = eventDispatcher;
	}

	public getCommands(): CommandManagerInterface {
		return this.commands;
	}

	public getEventDispatcher(): EventDispatcher {
		return this.eventDispatcher;
	}
}