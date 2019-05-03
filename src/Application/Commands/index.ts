import {CommandManager} from './Command';
import {BiosDumpCommand} from './Commands/BiosDumpCommand';
import {InstructionInfoCommand} from './Commands/InstructionInfoCommand';

export const commands = new CommandManager([
	new BiosDumpCommand(),
	new InstructionInfoCommand(),
]);
