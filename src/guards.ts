import {CpuInterface} from './Emulator/CPU';
import {CpuAfterInstructionCallEvent} from './Emulator/CPU/Events/CpuAfterInstructionCallEvent';
import {CpuInstructionCallEvent} from './Emulator/CPU/Events/CpuInstructionCallEvent';
import {Boundry, BoundryRange} from './Emulator/Memory/Regions';

export interface TickableCpu extends CpuInterface {
	tickInterval: number;
}

export const isTickableCpu = (object: any): object is TickableCpu => {
	return typeof object === 'object' && 'tickInterval' in object;
};

export const isAfterInstructionCallEvent = (event: any): event is CpuAfterInstructionCallEvent => {
	return typeof event === 'object' && 'operator' in event;
};

export const isInstructionCallEvent = (event: any): event is CpuInstructionCallEvent => {
	return typeof event === 'object' && 'operator' in event;
};

export const isNumber = (thing: any): thing is number => {
	return !isNaN(Number(thing));
};

export const isBoundryRange = (object: any): object is BoundryRange => {
	return typeof object === 'object' && 'start' in object;
};