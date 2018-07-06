import {HardwareBusInterface} from '../../Hardware';
import {toHex} from '../../util';

export type OperatorCallback = (hardware: HardwareBusInterface) => void;

export interface OperatorInterface {
	readonly opcode: number;
	readonly name: string;

	invoke: OperatorCallback;
}

export class Operator implements OperatorInterface {
	public readonly name: string;
	public readonly opcode: number;

	private readonly callback: OperatorCallback;

	public constructor(name: string, opcode: number, callback: OperatorCallback) {
		this.name = name;
		this.opcode = opcode;
		this.callback = callback;
	}

	public invoke(hardware: HardwareBusInterface): void {
		this.callback(hardware);
	}
}

export interface OperatorSet {
	[key: string]: OperatorInterface;
}

export interface InstructionManagerInterface {
	getByName(name: string): OperatorInterface | null;

	getByCode(opcode: number): OperatorInterface | null;

	register(operator: OperatorInterface): this;

	registerAll(operators: OperatorInterface[]): this;

	deregister(operator: OperatorInterface): this;
}

export class InstructionManager implements InstructionManagerInterface {
	private opcodes: OperatorInterface[];
	private operators: OperatorSet = {};

	/**
	 * InstructionManager constructor.
	 */
	public constructor(operators?: OperatorInterface[]) {
		this.opcodes = new Array(256);

		if (operators)
			this.registerAll(operators);
	}

	/**
	 * @param {string} name
	 * @return {OperatorInterface | null}
	 */
	public getByName(name: string): OperatorInterface | null {
		return this.operators[name] || null;
	}

	/**
	 * @param {number} opcode
	 * @return {OperatorInterface | null}
	 */
	public getByCode(opcode: number): OperatorInterface | null {
		return this.opcodes[opcode] || null;
	}

	/**
	 * @param {OperatorInterface} operator
	 * @return {InstructionManager}
	 *
	 * @throws Will throw an error if the operator's opcode or name are already in use
	 */
	public register(operator: OperatorInterface): this {
		if (this.getByCode(operator.opcode) || this.getByName(operator.name))
			throw new Error(`Cannot register ${operator.name} at ${toHex(operator.opcode)}: Operator already exists with that name or opcode`);

		this.operators[operator.name] = operator;
		this.opcodes[operator.opcode] = operator;

		return this;
	}

	/**
	 * @param {OperatorInterface[]} operators
	 * @return {InstructionManager}
	 */
	public registerAll(operators: OperatorInterface[]): this {
		operators.forEach(operator => this.register(operator));

		return this;
	}

	/**
	 * @param {OperatorInterface} operator
	 * @return {InstructionManager}
	 */
	public deregister(operator: OperatorInterface): this {
		delete this.operators[operator.name];
		delete this.opcodes[operator.opcode];

		return this;
	}
}