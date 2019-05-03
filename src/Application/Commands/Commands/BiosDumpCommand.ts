import {BitInstructions, PrimaryInstructions} from '../../../Emulator/CPU/InstructionSet';
import {bios} from '../../../Emulator/Memory/bios';
import {rpad, toHex} from '../../../Emulator/util';
import {Command} from '../Command';

export class BiosDumpCommand implements Command {
	public getName(): string {
		return 'bios:dump';
	}

	public execute(key: 'name' | 'mnemonic' | 'both' = 'name'): void {
		const output: string[] = [];
		let extended = false;

		for (let i = 0; i < bios.length; i++) {
			const opcode = bios[i];

			if (opcode === 0xCB) {
				extended = true;

				continue;
			}

			let instruction;

			if (extended) {
				instruction = BitInstructions.getByCode(opcode);

				extended = false;
			} else
				instruction = PrimaryInstructions.getByCode(opcode);

			if (!instruction) {
				output.push(
					' '.repeat(33) +
					'/!\\ No instruction found for ' + toHex(opcode, 2) +
					` (extended = ${extended.toString()}, offset = ${i} / ${toHex(i, 2)})`
				);

				continue;
			}

			let line = '';

			if (key === 'mnemonic' || key === 'both')
				line += rpad(instruction.mnemonic, 20);

			if (key === 'name' || key === 'both')
				line += instruction.name;

			output.push(`${toHex(i, 2)}: [${toHex(opcode, 2)}] ${line}`);

			i += instruction.width - 1;
		}

		console.log(output.join('\n'));
	}
}
