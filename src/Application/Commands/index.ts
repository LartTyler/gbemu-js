import {CommandManager} from './Command';
import {BiosDumpCommand} from './Commands/BiosDumpCommand';

export const commands = new CommandManager([
	new BiosDumpCommand(),
]);