import {BitInstructions, PrimaryInstructions} from '../../../Emulator/CPU/InstructionSet';
import {bios} from '../../../Emulator/Memory/bios';
import {Command} from '../Command';

export class BiosDumpCommand implements Command {
	public getName(): string {
		return 'bios:dump';
	}

	public execute(key: 'name' | 'mnemonic' = 'name'): void {
		let extended = false;

		bios.forEach(opcode => {
			if (opcode === 0xCB) {
				extended = true;

				return;
			}

			let instruction;

			if (extended)
				instruction = BitInstructions.getByCode(opcode);
			else
				instruction = PrimaryInstructions.getByCode(opcode);

			console.log(instruction[key]);
		});
	}
}