export const toBinary = (value: number, minLength?: number): string => {
	let bin = value.toString(2);

	if (minLength !== null && bin.length < minLength) {
		for (let i = 0, ii = minLength - bin.length; i < ii; i++)
			bin = '0' + bin;
	}

	return bin;
};

export const toHex = (value: number, minLength?: number, prefix: boolean = true): string => {
	let hex = value.toString(16).toUpperCase();

	if (minLength !== null && hex.length < minLength) {
		for (let i = 0, ii = minLength - hex.length; i < ii; i++)
			hex = '0' + hex;
	}

	return `${prefix ? '0x' : ''}${hex.toUpperCase()}`;
};

export const pairTo16Bit = (high: number, low: number): number => {
	return (high << 8) + low;
};

export const pairFrom16Bit = (value: number): [number, number] => {
	return [
		(value >> 8) & 255,
		value & 255,
	];
};

export const lpad = (string: string, length: number, padChar: string = ' '): string => {
	if (string.length < length) {
		for (let i = 0, ii = length - string.length; i < ii; i++)
			string = padChar + string;
	}

	return string;
};

export const rpad = (string: string, length: number, char: string = ' '): string => {
	if (string.length < length) {
		for (let i = 0, ii = length - string.length; i < ii; i++)
			string += char;
	}

	return string;
};
