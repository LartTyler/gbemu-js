import {BitInstructions, PrimaryInstructions} from '../../Emulator/CPU/InstructionSet';
import {Command} from '../Console';

export class GetInstructionCommand implements Command {
	public execute(nameOrOpcode: number | string, extended: boolean = false): void {
		const instructions = extended ? BitInstructions : PrimaryInstructions;

		console.log(
			typeof nameOrOpcode === 'string' ?
				instructions.getByName(nameOrOpcode) :
				instructions.getByCode(nameOrOpcode)
		);
	}
}