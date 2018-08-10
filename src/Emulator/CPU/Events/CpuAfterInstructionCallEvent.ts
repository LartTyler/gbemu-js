import {CpuInterface} from '../index';
import {OperatorInterface} from '../InstructionSet/InstructionManager';
import {CpuEvent} from './CpuEvent';

export class CpuAfterInstructionCallEvent extends CpuEvent {
	public static readonly NAME: string = 'cpu.instruction.call.after';

	public readonly operator: OperatorInterface;

	public constructor(cpu: CpuInterface, operator: OperatorInterface) {
		super(cpu);

		this.operator = operator;
	}
}