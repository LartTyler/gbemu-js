import {BitInstructions, PrimaryInstructions} from '../../../Emulator/CPU/InstructionSet';
import {OperatorInterface} from '../../../Emulator/CPU/InstructionSet/InstructionManager';
import {Command} from '../Command';

export class InstructionInfoCommand implements Command {
	public getName(): string {
		return 'inst:info';
	}

	public execute(inst: string): void {
		let instruction: OperatorInterface;

		if (inst.indexOf('0x') === 0) {
			const parts = inst.split(' ');

			if (parts.length === 1)
				instruction = PrimaryInstructions.getByCode(parseInt(inst, 16));
			else if (parts.length === 2 && parts[0] === '0xCB')
				instruction = BitInstructions.getByCode(parseInt(parts[1], 16));
		} else {
			instruction = PrimaryInstructions.getByName(inst);

			if (!instruction)
				instruction = BitInstructions.getByName(inst);
		}

		if (!instruction)
			throw new Error('Unrecognized instruction ' + inst);

		console.log(instruction);
	}
}
