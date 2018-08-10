import {isBoundryRange, isNumber} from '../../guards';

export enum MemoryRegion {
	BIOS,
	CART,
	VIDEO,
	WORKING,
	INTERRUPT_ENABLE,
	INTERRUPT_FLAGS,
	ZERO_PAGE,
	JOYPAD,
	TIMER,
	GPU,
	LCD,
	IO,

	// Special memory region that always returns zero
	BLANK,
}

export interface BoundryRange {
	start: number;
	end: number;
}

export type Boundry = BoundryRange | number;

interface RegionMap {
	[key: number]: Boundry[];
}

// @see http://gbdev.gg8.se/wiki/articles/Memory_Map
export const MemoryRegionMap: RegionMap = {
	[MemoryRegion.BIOS]: [
		{
			start: 0,
			end: 0x00FF,
		},
	],
	[MemoryRegion.CART]: [
		{
			start: 0x0100,
			end: 0x7FFF,
		},
		{
			start: 0xA000,
			end: 0xBFFF,
		},
	],
	[MemoryRegion.VIDEO]: [
		{
			start: 0x8000,
			end: 0x9FFF,
		},
		{
			start: 0xFE00,
			end: 0xFE9F,
		}
	],
	[MemoryRegion.WORKING]: [
		{
			start: 0xC000,
			end: 0xDFFF,
		},

		// Echo RAM
		{
			start: 0xE000,
			end: 0xFDFF,
		},
	],
	[MemoryRegion.INTERRUPT_ENABLE]: [
		0xFFFF,
	],
	[MemoryRegion.INTERRUPT_FLAGS]: [
		0xFF0F,
	],
	[MemoryRegion.ZERO_PAGE]: [
		{
			start: 0xFF80,
			end: 0xFFFE,
		},
	],
	[MemoryRegion.JOYPAD]: [
		0xFF00,
	],
	[MemoryRegion.TIMER]: [
		{
			start: 0xFF04,
			end: 0xFF07,
		},
	],
	[MemoryRegion.GPU]: [
		0xFF40,
		{
			start: 0xFF42,
			end: 0xFF43,
		},
		{
			start: 0xFF47,
			end: 0xFF4B,
		},
	],
	[MemoryRegion.LCD]: [
		0xFF41,
		{
			start: 0xFF44,
			end: 0xFF45,
		},
	],
	[MemoryRegion.IO]: [
		{
			start: 0xFF00,
			end: 0xFF7F,
		},
	],

	[MemoryRegion.BLANK]: [
		{
			start: 0xFEA0,
			end: 0xFEFF,
		},
	],
};

export const findRegion = (address: number): MemoryRegion | null => {
	for (let region in MemoryRegionMap) {
		if (!isNumber(region))
			continue;

		const boundries = MemoryRegionMap[region];

		for (let i = 0, ii = boundries.length; i < ii; i++) {
			const boundry = boundries[i];

			if (isNumber(boundry) && address === boundry)
				return parseInt(region, 10);
			else if (isBoundryRange(boundry) && address >= boundry.start && address <= boundry.end)
				return parseInt(region, 10);
		}
	}

	return null;
};