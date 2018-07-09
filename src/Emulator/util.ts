import {RegisterKey} from './CPU/Registers';

export const toBinary = (value: number): string => {
	return value.toString(2);
};

export const toHex = (value: number): string => {
	return `0x${value.toString(16).toUpperCase()}`;
};

export const pairTo16Bit = (high: number, low: number): number => {
	return (high << 8) + low;
};