export const toBinary = (value: number): string => {
	return value.toString(2);
};

export const toHex = (value: number): string => {
	return `0x${value.toString(16).toUpperCase()}`;
};