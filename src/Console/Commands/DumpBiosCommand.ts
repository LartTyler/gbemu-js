import {BitInstructions, PrimaryInstructions} from '../../Emulator/CPU/InstructionSet';
import {bios} from '../../Emulator/Memory/Bios';
import {Command} from '../Console';

export class DumpBiosCommand implements Command {
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