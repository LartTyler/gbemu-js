import {HardwareBusInterface} from '../../Hardware';

export type OperatorCallback = (hardware: HardwareBusInterface) => void;

export interface OperatorSet {
	[key: string]: OperatorCallback;
}