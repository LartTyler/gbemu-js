// @see http://gbdev.gg8.se/wiki/articles/The_Cartridge_Header
export const HeaderRegions = {
	logo: {
		start: 0x104,
		end: 0x133,
	},
	title: {
		start: 0x134,
		end: 0x143,
	},
	type: 0x147,
	romSize: 0x148,
	ramSize: 0x149,
};

// @see http://gbdev.gg8.se/wiki/articles/The_Cartridge_Header#0147_-_Cartridge_Type
export enum CartType {
	ROM = 0x00,

	MBC1 = 0x01,
	MBC1_RAM = 0x02,
	MBC1_RAM_BATTERY = 0x03,

	MBC2 = 0x05,
	MBC2_BATTERY = 0x06,

	ROM_RAM = 0x08,
	ROM_RAM_BATTERY = 0x09,

	MMM01 = 0x0B,
	MMM01_RAM = 0x0C,
	MMM01_RAM_BATTERY = 0x0D,

	MBC3_TIMER_BATTERY = 0x0F,
	MBC3_TIMER_RAM_BATTERY = 0x10,
	MBC3 = 0x11,
	MBC3_RAM = 0x12,
	MBC3_RAM_BATTERY = 0x13,

	MBC5 = 0x19,
	MBC5_RAM = 0x1A,
	MBC5_RAM_BATTERY = 0x1B,
	MBC5_RUMBLE = 0x1C,
	MBC5_RUMBLE_RAM = 0x1D,
	MBC5_RUMBLE_RAM_BATTERY = 0x1E,

	MBC6 = 0x20,
	MBC7_SENSOR_RUMBLE_RAM_BATTERY = 0x22,

	CAMERA = 0xFC,
	TAMA5 = 0xFD,
	HUC3 = 0xFE,
	HUC1_RAM_BATTERY = 0xFF,
}

// @see http://gbdev.gg8.se/wiki/articles/The_Cartridge_Header#0148_-_ROM_Size
export enum RomSize {
	KB32 = 0x00,  // No ROM Banking
	KB64 = 0x01,  // 4 banks
	KB128 = 0x02, // 8 banks
	KB256 = 0x03, // 16 banks
	KB512 = 0x04, // 32 banks

	MB1 = 0x05,   // 64 banks (only 63 banks used by MBC1
	MB2 = 0x06,   // 128 banks (only 125 banks used by MBC1)
	MB4 = 0x07,   // 256 banks
	MB8 = 0x08,   // 512 banks

	MB1_1 = 0x52, // 1.1 MB, 72 banks
	MB1_2 = 0x53, // 1.2 MB, 80 banks
	MB1_5 = 0x54, // 1.5 MB, 96 banks
}

export const RomSizeBanks = {
	[RomSize.KB32]: 2,
	[RomSize.KB64]: 4,
	[RomSize.KB128]: 8,
	[RomSize.KB256]: 16,
	[RomSize.KB512]: 32,

	[RomSize.MB1]: 64,
	[RomSize.MB2]: 128,
	[RomSize.MB4]: 256,
	[RomSize.MB8]: 512,

	[RomSize.MB1_1]: 72,
	[RomSize.MB1_2]: 80,
	[RomSize.MB1_5]: 96,
};

// @see http://gbdev.gg8.se/wiki/articles/The_Cartridge_Header#0149_-_RAM_Size
export enum RamSize {
	NONE = 0x00,

	KB2 = 0x01,
	KB8 = 0x02,
	KB32 = 0x03,  // 4 banks, 8 KB each
	KB128 = 0x04, // 16 banks, 8 KB each
	KB64 = 0x05,  // 8 banks, 8 KB each
}

export const RamSizeBanks = {
	[RamSize.NONE]: 0,
	[RamSize.KB2]: 1,
	[RamSize.KB8]: 1,
	[RamSize.KB32]: 4,
	[RamSize.KB128]: 16,
	[RamSize.KB64]: 8,
};

export class Headers {
	public readonly title: string;
	public readonly type: CartType;
	public readonly romSize: RomSize;
	public readonly ramSize: RamSize;

	public constructor(title: string, type: CartType, romSize: RomSize, ramSize: RamSize) {
		this.title = title;
		this.type = type;
		this.romSize = romSize;
		this.ramSize = ramSize;
	}

	public getTypeDescription(): string {
		return CartType[this.type];
	}
}