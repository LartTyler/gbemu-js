/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Emulator/CPU/Clock.ts":
/*!***********************************!*\
  !*** ./src/Emulator/CPU/Clock.ts ***!
  \***********************************/
/*! exports provided: Clock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Clock\", function() { return Clock; });\nclass Clock {\n    constructor() {\n        this.t = 0;\n        this._m = 0;\n    }\n    get m() {\n        return this._m;\n    }\n    set m(value) {\n        this._m = value;\n        this.t = value * 4;\n    }\n    reset() {\n        this.m = 0;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/Emulator/CPU/Clock.ts?");

/***/ }),

/***/ "./src/Emulator/CPU/Operations/Add.ts":
/*!********************************************!*\
  !*** ./src/Emulator/CPU/Operations/Add.ts ***!
  \********************************************/
/*! exports provided: AddOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AddOperators\", function() { return AddOperators; });\n/* harmony import */ var _Registers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Registers */ \"./src/Emulator/CPU/Registers.ts\");\n\nconst registerAdd = (value, registers) => {\n    registers.a += value;\n    registers.flags = 0;\n    if (!(registers.a & 255))\n        registers.flags |= _Registers__WEBPACK_IMPORTED_MODULE_0__[\"RegisterFlag\"].ZERO;\n    if (registers.a > 255)\n        registers.flags |= _Registers__WEBPACK_IMPORTED_MODULE_0__[\"RegisterFlag\"].CARRY;\n    registers.a &= 255;\n    registers.m = 1;\n};\nconst registerAdd16 = (value, registers) => {\n    value += (registers.h << 8) + registers.l;\n    if (value > 65535)\n        registers.flags |= _Registers__WEBPACK_IMPORTED_MODULE_0__[\"RegisterFlag\"].CARRY;\n    else\n        registers.flags &= 0xEF;\n    registers.h = (value >> 8) & 255;\n    registers.l = value & 255;\n    registers.m = 3;\n};\nconst registerAdd16FromAddress = (sourceHigh, sourceLow, registers) => {\n    registerAdd16((registers[sourceHigh] << 8) + registers[sourceLow], registers);\n};\nconst addFromAddress = (address, memory, registers) => {\n    const a = registers.a;\n    const m = memory.readByte(address);\n    registers.a += m;\n    registers.flags = registers.a > 255 ? _Registers__WEBPACK_IMPORTED_MODULE_0__[\"RegisterFlag\"].CARRY : 0;\n    registers.a &= 255;\n    if (!registers.a)\n        registers.flags |= _Registers__WEBPACK_IMPORTED_MODULE_0__[\"RegisterFlag\"].ZERO;\n    if ((registers.a ^ a ^ m) & 0x10)\n        registers.flags |= _Registers__WEBPACK_IMPORTED_MODULE_0__[\"RegisterFlag\"].HALF_CARRY;\n    registers.m = 2;\n};\nconst addWithCarry = (value, registers) => {\n    const a = registers.a;\n    registers.a += value;\n    registers.a += registers.flags & _Registers__WEBPACK_IMPORTED_MODULE_0__[\"RegisterFlag\"].CARRY ? 1 : 0;\n    registers.flags = (registers.a > 255) ? _Registers__WEBPACK_IMPORTED_MODULE_0__[\"RegisterFlag\"].CARRY : 0;\n    registers.a &= 255;\n    if (registers.a)\n        registers.flags |= _Registers__WEBPACK_IMPORTED_MODULE_0__[\"RegisterFlag\"].ZERO;\n    if ((registers.a ^ value ^ a) & 0x10)\n        registers.flags |= _Registers__WEBPACK_IMPORTED_MODULE_0__[\"RegisterFlag\"].HALF_CARRY;\n    registers.m = 1;\n};\nconst AddOperators = {\n    AddA: hardware => registerAdd(hardware.cpu.registers.a, hardware.cpu.registers),\n    AddB: hardware => registerAdd(hardware.cpu.registers.b, hardware.cpu.registers),\n    AddC: hardware => registerAdd(hardware.cpu.registers.c, hardware.cpu.registers),\n    AddD: hardware => registerAdd(hardware.cpu.registers.d, hardware.cpu.registers),\n    AddE: hardware => registerAdd(hardware.cpu.registers.e, hardware.cpu.registers),\n    AddH: hardware => registerAdd(hardware.cpu.registers.h, hardware.cpu.registers),\n    AddL: hardware => registerAdd(hardware.cpu.registers.l, hardware.cpu.registers),\n    AddPCAddress: hardware => addFromAddress(hardware.cpu.registers.programCount, hardware.memory, hardware.cpu.registers),\n    AddHLAddress: hardware => {\n        const registers = hardware.cpu.registers;\n        addFromAddress((registers.h << 8) + registers.l, hardware.memory, registers);\n    },\n    AddBCToHL: hardware => registerAdd16FromAddress('b', 'c', hardware.cpu.registers),\n    AddDEToHL: hardware => registerAdd16FromAddress('d', 'e', hardware.cpu.registers),\n    AddHLToHL: hardware => registerAdd16FromAddress('h', 'l', hardware.cpu.registers),\n    AddSPToHL: hardware => registerAdd16(hardware.cpu.registers.stackPointer, hardware.cpu.registers),\n    AddPCAddressToSP: hardware => {\n        const memory = hardware.memory;\n        const registers = hardware.cpu.registers;\n        let i = memory.readByte(registers.programCount++);\n        if (i > 127)\n            i = -((~i + 1) & 255);\n        registers.stackPointer += i;\n        registers.m = 4;\n    },\n    AddAWithCarry: hardware => addWithCarry(hardware.cpu.registers.a, hardware.cpu.registers),\n    AddBWithCarry: hardware => addWithCarry(hardware.cpu.registers.b, hardware.cpu.registers),\n    AddCWithCarry: hardware => addWithCarry(hardware.cpu.registers.c, hardware.cpu.registers),\n    AddDWithCarry: hardware => addWithCarry(hardware.cpu.registers.d, hardware.cpu.registers),\n    AddEWithCarry: hardware => addWithCarry(hardware.cpu.registers.e, hardware.cpu.registers),\n    AddHWithCarry: hardware => addWithCarry(hardware.cpu.registers.h, hardware.cpu.registers),\n    AddLWithCarry: hardware => addWithCarry(hardware.cpu.registers.l, hardware.cpu.registers),\n};\n\n\n//# sourceURL=webpack:///./src/Emulator/CPU/Operations/Add.ts?");

/***/ }),

/***/ "./src/Emulator/CPU/Operations/Compare.ts":
/*!************************************************!*\
  !*** ./src/Emulator/CPU/Operations/Compare.ts ***!
  \************************************************/
/*! exports provided: CompareOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CompareOperators\", function() { return CompareOperators; });\n/* harmony import */ var _Registers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Registers */ \"./src/Emulator/CPU/Registers.ts\");\n\nconst registerCompare = (value, registers) => {\n    const i = registers.a - value;\n    registers.flags |= _Registers__WEBPACK_IMPORTED_MODULE_0__[\"RegisterFlag\"].OPERATION;\n    if (!(i & 255))\n        registers.flags |= _Registers__WEBPACK_IMPORTED_MODULE_0__[\"RegisterFlag\"].ZERO;\n    if (i < 255)\n        registers.flags |= _Registers__WEBPACK_IMPORTED_MODULE_0__[\"RegisterFlag\"].CARRY;\n    registers.m = 1;\n};\nconst CompareOperators = {\n    Compare_RegisterA: hardware => registerCompare(hardware.cpu.registers.a, hardware.cpu.registers),\n    Compare_RegisterB: hardware => registerCompare(hardware.cpu.registers.b, hardware.cpu.registers),\n    Compare_RegisterC: hardware => registerCompare(hardware.cpu.registers.c, hardware.cpu.registers),\n    Compare_RegisterD: hardware => registerCompare(hardware.cpu.registers.d, hardware.cpu.registers),\n    Compare_RegisterE: hardware => registerCompare(hardware.cpu.registers.e, hardware.cpu.registers),\n    Compare_RegisterH: hardware => registerCompare(hardware.cpu.registers.h, hardware.cpu.registers),\n    Compare_RegisterL: hardware => registerCompare(hardware.cpu.registers.l, hardware.cpu.registers),\n};\n\n\n//# sourceURL=webpack:///./src/Emulator/CPU/Operations/Compare.ts?");

/***/ }),

/***/ "./src/Emulator/CPU/Operations/Extra.ts":
/*!**********************************************!*\
  !*** ./src/Emulator/CPU/Operations/Extra.ts ***!
  \**********************************************/
/*! exports provided: ExtraOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ExtraOperators\", function() { return ExtraOperators; });\nconst ExtraOperators = {\n    Noop: hardware => {\n        hardware.cpu.registers.m = 1;\n    },\n    NoImpl: hardware => {\n        const opcode = hardware.cpu.registers.programCount - 1;\n        console.error(`Unimplemented instruction at ${opcode.toString(16)}, stopping`);\n        hardware.cpu.stop = true;\n    },\n};\n\n\n//# sourceURL=webpack:///./src/Emulator/CPU/Operations/Extra.ts?");

/***/ }),

/***/ "./src/Emulator/CPU/Operations/LoadStore.ts":
/*!**************************************************!*\
  !*** ./src/Emulator/CPU/Operations/LoadStore.ts ***!
  \**************************************************/
/*! exports provided: LoadStoreOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LoadStoreOperators\", function() { return LoadStoreOperators; });\n/* harmony import */ var _LoadStore_MemoryToMemory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LoadStore/MemoryToMemory */ \"./src/Emulator/CPU/Operations/LoadStore/MemoryToMemory.ts\");\n/* harmony import */ var _LoadStore_MemoryToRegister__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LoadStore/MemoryToRegister */ \"./src/Emulator/CPU/Operations/LoadStore/MemoryToRegister.ts\");\n/* harmony import */ var _LoadStore_ProgramCount__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LoadStore/ProgramCount */ \"./src/Emulator/CPU/Operations/LoadStore/ProgramCount.ts\");\n/* harmony import */ var _LoadStore_RegisterToMemory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LoadStore/RegisterToMemory */ \"./src/Emulator/CPU/Operations/LoadStore/RegisterToMemory.ts\");\n/* harmony import */ var _LoadStore_RegisterToRegister__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./LoadStore/RegisterToRegister */ \"./src/Emulator/CPU/Operations/LoadStore/RegisterToRegister.ts\");\n/* harmony import */ var _LoadStore_Swap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./LoadStore/Swap */ \"./src/Emulator/CPU/Operations/LoadStore/Swap.ts\");\n\n\n\n\n\n\nconst LoadStoreOperators = Object.assign({}, _LoadStore_MemoryToMemory__WEBPACK_IMPORTED_MODULE_0__[\"MemoryToMemoryOperators\"], _LoadStore_MemoryToRegister__WEBPACK_IMPORTED_MODULE_1__[\"MemoryToRegisterOperators\"], _LoadStore_ProgramCount__WEBPACK_IMPORTED_MODULE_2__[\"ProgramCountOperators\"], _LoadStore_RegisterToMemory__WEBPACK_IMPORTED_MODULE_3__[\"RegisterToMemoryOperators\"], _LoadStore_RegisterToRegister__WEBPACK_IMPORTED_MODULE_4__[\"RegisterToRegisterOperators\"], _LoadStore_Swap__WEBPACK_IMPORTED_MODULE_5__[\"SwapOperators\"]);\n\n\n//# sourceURL=webpack:///./src/Emulator/CPU/Operations/LoadStore.ts?");

/***/ }),

/***/ "./src/Emulator/CPU/Operations/LoadStore/MemoryToMemory.ts":
/*!*****************************************************************!*\
  !*** ./src/Emulator/CPU/Operations/LoadStore/MemoryToMemory.ts ***!
  \*****************************************************************/
/*! exports provided: MemoryToMemoryOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MemoryToMemoryOperators\", function() { return MemoryToMemoryOperators; });\nconst MemoryToMemoryOperators = {\n    LoadPCIntoHLAddress: hardware => {\n        const memory = hardware.memory;\n        const registers = hardware.cpu.registers;\n        memory.writeByte((registers.h << 8) + registers.l, memory.readByte(registers.programCount++));\n        registers.m = 3;\n    },\n};\n\n\n//# sourceURL=webpack:///./src/Emulator/CPU/Operations/LoadStore/MemoryToMemory.ts?");

/***/ }),

/***/ "./src/Emulator/CPU/Operations/LoadStore/MemoryToRegister.ts":
/*!*******************************************************************!*\
  !*** ./src/Emulator/CPU/Operations/LoadStore/MemoryToRegister.ts ***!
  \*******************************************************************/
/*! exports provided: MemoryToRegisterOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MemoryToRegisterOperators\", function() { return MemoryToRegisterOperators; });\nconst loadMemoryToRegister = (destination, highReg, lowReg, hardware) => {\n    const memory = hardware.memory;\n    const registers = hardware.cpu.registers;\n    const high = registers[highReg];\n    const low = registers[lowReg];\n    registers[destination] = memory.readByte((high << 8) + low);\n    registers.m = 2;\n};\nconst loadHLMemoryToRegister = (destination, hardware) => {\n    loadMemoryToRegister(destination, 'h', 'l', hardware);\n};\nconst loadPCAndNextIntoRegister = (destinationA, destinationB, hardware) => {\n    const memory = hardware.memory;\n    const registers = hardware.cpu.registers;\n    registers[destinationA] = memory.readByte(registers.programCount++);\n    registers[destinationB] = memory.readByte(registers.programCount++);\n    registers.m = 3;\n};\nconst MemoryToRegisterOperators = {\n    LoadHLAddressIntoA: hardware => loadHLMemoryToRegister('a', hardware),\n    LoadHLAddressIntoB: hardware => loadHLMemoryToRegister('b', hardware),\n    LoadHLAddressIntoC: hardware => loadHLMemoryToRegister('c', hardware),\n    LoadHLAddressIntoD: hardware => loadHLMemoryToRegister('d', hardware),\n    LoadHLAddressIntoE: hardware => loadHLMemoryToRegister('e', hardware),\n    LoadHLAddressIntoH: hardware => loadHLMemoryToRegister('h', hardware),\n    LoadHLAddressIntoL: hardware => loadHLMemoryToRegister('l', hardware),\n    LoadBCAddressIntoA: hardware => loadMemoryToRegister('a', 'b', 'c', hardware),\n    LoadDEAddressIntoA: hardware => loadMemoryToRegister('a', 'd', 'e', hardware),\n    LoadPCAndNextIntoBC: hardware => loadPCAndNextIntoRegister('b', 'c', hardware),\n    LoadPCAndNextIntoDE: hardware => loadPCAndNextIntoRegister('d', 'e', hardware),\n    LoadPCAndNextIntoHL: hardware => loadPCAndNextIntoRegister('h', 'l', hardware),\n    LoadPCAndNextIntoSP: hardware => {\n        const registers = hardware.cpu.registers;\n        registers.stackPointer = hardware.memory.readWord(registers.programCount);\n        registers.programCount += 2;\n        registers.m = 3;\n    },\n    LoadPCWordIntoLH: hardware => {\n        const memory = hardware.memory;\n        const registers = hardware.cpu.registers;\n        const index = memory.readWord(registers.programCount);\n        registers.programCount += 2;\n        // TODO Should this be reversed?\n        registers.l = memory.readByte(index);\n        registers.h = memory.readByte(index + 1);\n        registers.m = 5;\n    },\n    LoadHLAddressIntoAAndIncrement: hardware => {\n        const memory = hardware.memory;\n        const registers = hardware.cpu.registers;\n        registers.a = memory.readByte((registers.h << 8) + registers.l);\n        registers.l = (registers.l + 1) & 255;\n        if (!registers.l)\n            registers.h = (registers.h + 1) & 255;\n        registers.m = 2;\n    },\n    LoadHLAddressIntoAAndDecrement: hardware => {\n        const memory = hardware.memory;\n        const registers = hardware.cpu.registers;\n        registers.a = memory.readByte((registers.h << 8) + registers.l);\n        registers.l = (registers.l - 1) & 255;\n        if (registers.l === 255)\n            registers.h = (registers.h - 1) & 255;\n        registers.m = 2;\n    },\n    LoadPCWithMagicIntoA: hardware => {\n        const memory = hardware.memory;\n        const registers = hardware.cpu.registers;\n        registers.a = memory.readByte(0xFF00 + memory.readByte(registers.programCount++));\n        registers.m = 3;\n    },\n    LoadCWithMagicAddressIntoA: hardware => {\n        const memory = hardware.memory;\n        const registers = hardware.cpu.registers;\n        registers.a = memory.readByte(0xFF00 + registers.c);\n        registers.m = 2;\n    },\n};\n\n\n//# sourceURL=webpack:///./src/Emulator/CPU/Operations/LoadStore/MemoryToRegister.ts?");

/***/ }),

/***/ "./src/Emulator/CPU/Operations/LoadStore/ProgramCount.ts":
/*!***************************************************************!*\
  !*** ./src/Emulator/CPU/Operations/LoadStore/ProgramCount.ts ***!
  \***************************************************************/
/*! exports provided: ProgramCountOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ProgramCountOperators\", function() { return ProgramCountOperators; });\nconst pcToRegisterAndAdvance = (destination, memory, registers) => {\n    registers[destination] = memory.readByte(registers.programCount++);\n};\nconst ProgramCountOperators = {\n    LoadPCToA_Advance: hardware => pcToRegisterAndAdvance('a', hardware.memory, hardware.cpu.registers),\n    LoadPCToB_Advance: hardware => pcToRegisterAndAdvance('b', hardware.memory, hardware.cpu.registers),\n    LoadPCToC_Advance: hardware => pcToRegisterAndAdvance('c', hardware.memory, hardware.cpu.registers),\n    LoadPCToD_Advance: hardware => pcToRegisterAndAdvance('d', hardware.memory, hardware.cpu.registers),\n    LoadPCToE_Advance: hardware => pcToRegisterAndAdvance('e', hardware.memory, hardware.cpu.registers),\n    LoadPCToH_Advance: hardware => pcToRegisterAndAdvance('h', hardware.memory, hardware.cpu.registers),\n    LoadPCToL_Advance: hardware => pcToRegisterAndAdvance('l', hardware.memory, hardware.cpu.registers),\n    LoadPCWordIntoA: hardware => {\n        const memory = hardware.memory;\n        const registers = hardware.cpu.registers;\n        registers.a = memory.readByte(memory.readWord(registers.programCount));\n        registers.programCount += 2;\n        registers.m = 4;\n    },\n    LoadPCWordIntoHL: hardware => {\n        const memory = hardware.memory;\n        const registers = hardware.cpu.registers;\n        const index = memory.readWord(registers.programCount);\n        registers.programCount += 2;\n        memory.writeWord(index, (registers.h << 8) + registers.l);\n        registers.m = 5;\n    },\n    SomeCrazyShitWithHLAndSP: hardware => {\n        const memory = hardware.memory;\n        const registers = hardware.cpu.registers;\n        let i = memory.readByte(registers.programCount++);\n        if (i > 127)\n            i = -((~i + 1) & 255);\n        i += registers.stackPointer;\n        registers.h = (i >> 8) & 255;\n        registers.l = i & 255;\n        registers.m = 3;\n    },\n};\n\n\n//# sourceURL=webpack:///./src/Emulator/CPU/Operations/LoadStore/ProgramCount.ts?");

/***/ }),

/***/ "./src/Emulator/CPU/Operations/LoadStore/RegisterToMemory.ts":
/*!*******************************************************************!*\
  !*** ./src/Emulator/CPU/Operations/LoadStore/RegisterToMemory.ts ***!
  \*******************************************************************/
/*! exports provided: RegisterToMemoryOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RegisterToMemoryOperators\", function() { return RegisterToMemoryOperators; });\nconst loadRegisterToMemory = (source, highReg, lowReg, hardware) => {\n    const memory = hardware.memory;\n    const registers = hardware.cpu.registers;\n    const high = registers[highReg];\n    const low = registers[lowReg];\n    memory.writeByte((high << 8) + low, registers[source]);\n    registers.m = 2;\n};\nconst loadRegisterToHLMemory = (source, hardware) => {\n    loadRegisterToMemory(source, 'h', 'l', hardware);\n};\nconst RegisterToMemoryOperators = {\n    LoadAIntoHLAddress: hardware => loadRegisterToHLMemory('a', hardware),\n    LoadBIntoHLAddress: hardware => loadRegisterToHLMemory('b', hardware),\n    LoadCIntoHLAddress: hardware => loadRegisterToHLMemory('c', hardware),\n    LoadDIntoHLAddress: hardware => loadRegisterToHLMemory('d', hardware),\n    LoadEIntoHLAddress: hardware => loadRegisterToHLMemory('e', hardware),\n    LoadHIntoHLAddress: hardware => loadRegisterToHLMemory('h', hardware),\n    LoadLIntoHLAddress: hardware => loadRegisterToHLMemory('l', hardware),\n    LoadAIntoBCAddress: hardware => loadRegisterToMemory('a', 'b', 'c', hardware),\n    LoadAIntoDEAddress: hardware => loadRegisterToMemory('a', 'd', 'e', hardware),\n    LoadAIntoPCAddress: hardware => {\n        const memory = hardware.memory;\n        const registers = hardware.cpu.registers;\n        memory.writeByte(memory.readWord(registers.programCount), registers.a);\n        registers.programCount += 2;\n        registers.m = 4;\n    },\n    LoadAIntoHLAddressAndIncrement: hardware => {\n        const memory = hardware.memory;\n        const registers = hardware.cpu.registers;\n        memory.writeByte((registers.h << 8) + registers.l, registers.a);\n        registers.l = (registers.l + 1) & 255;\n        if (!registers.l)\n            registers.h = (registers.h + 1) & 255;\n        registers.m = 2;\n    },\n    LoadAIntoHLAddressAndDecrement: hardware => {\n        const memory = hardware.memory;\n        const registers = hardware.cpu.registers;\n        memory.writeByte((registers.h << 8) + registers.l, registers.a);\n        registers.l = (registers.l - 1) & 255;\n        if (registers.l === 255)\n            registers.h = (registers.h - 1) & 255;\n        registers.m = 2;\n    },\n    LoadAIntoPCWithMagicAddress: hardware => {\n        const memory = hardware.memory;\n        const registers = hardware.cpu.registers;\n        memory.writeByte(0xFF00 + memory.readByte(registers.programCount++), registers.a);\n        registers.m = 3;\n    },\n    LoadAIntoCWithMagicAddress: hardware => {\n        const memory = hardware.memory;\n        const registers = hardware.cpu.registers;\n        memory.writeByte(0xFF00 + registers.c, registers.a);\n        registers.m = 2;\n    },\n};\n\n\n//# sourceURL=webpack:///./src/Emulator/CPU/Operations/LoadStore/RegisterToMemory.ts?");

/***/ }),

/***/ "./src/Emulator/CPU/Operations/LoadStore/RegisterToRegister.ts":
/*!*********************************************************************!*\
  !*** ./src/Emulator/CPU/Operations/LoadStore/RegisterToRegister.ts ***!
  \*********************************************************************/
/*! exports provided: RegisterToRegisterOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RegisterToRegisterOperators\", function() { return RegisterToRegisterOperators; });\nconst writeToRegister = (destination, source, registers) => {\n    registers[destination] = source;\n    registers.m = 1;\n};\nconst RegisterToRegisterOperators = {\n    LoadRegAA: hardware => writeToRegister('a', hardware.cpu.registers.a, hardware.cpu.registers),\n    LoadRegAB: hardware => writeToRegister('a', hardware.cpu.registers.b, hardware.cpu.registers),\n    LoadRegAC: hardware => writeToRegister('a', hardware.cpu.registers.c, hardware.cpu.registers),\n    LoadRegAD: hardware => writeToRegister('a', hardware.cpu.registers.d, hardware.cpu.registers),\n    LoadRegAE: hardware => writeToRegister('a', hardware.cpu.registers.e, hardware.cpu.registers),\n    LoadRegAH: hardware => writeToRegister('a', hardware.cpu.registers.h, hardware.cpu.registers),\n    LoadRegAL: hardware => writeToRegister('a', hardware.cpu.registers.l, hardware.cpu.registers),\n    LoadRegBA: hardware => writeToRegister('b', hardware.cpu.registers.a, hardware.cpu.registers),\n    LoadRegBB: hardware => writeToRegister('b', hardware.cpu.registers.b, hardware.cpu.registers),\n    LoadRegBC: hardware => writeToRegister('b', hardware.cpu.registers.c, hardware.cpu.registers),\n    LoadRegBD: hardware => writeToRegister('b', hardware.cpu.registers.d, hardware.cpu.registers),\n    LoadRegBE: hardware => writeToRegister('b', hardware.cpu.registers.e, hardware.cpu.registers),\n    LoadRegBH: hardware => writeToRegister('b', hardware.cpu.registers.h, hardware.cpu.registers),\n    LoadRegBL: hardware => writeToRegister('b', hardware.cpu.registers.l, hardware.cpu.registers),\n    LoadRegCA: hardware => writeToRegister('c', hardware.cpu.registers.a, hardware.cpu.registers),\n    LoadRegCB: hardware => writeToRegister('c', hardware.cpu.registers.b, hardware.cpu.registers),\n    LoadRegCC: hardware => writeToRegister('c', hardware.cpu.registers.c, hardware.cpu.registers),\n    LoadRegCD: hardware => writeToRegister('c', hardware.cpu.registers.d, hardware.cpu.registers),\n    LoadRegCE: hardware => writeToRegister('c', hardware.cpu.registers.e, hardware.cpu.registers),\n    LoadRegCH: hardware => writeToRegister('c', hardware.cpu.registers.h, hardware.cpu.registers),\n    LoadRegCL: hardware => writeToRegister('c', hardware.cpu.registers.l, hardware.cpu.registers),\n    LoadRegDA: hardware => writeToRegister('d', hardware.cpu.registers.a, hardware.cpu.registers),\n    LoadRegDB: hardware => writeToRegister('d', hardware.cpu.registers.b, hardware.cpu.registers),\n    LoadRegDC: hardware => writeToRegister('d', hardware.cpu.registers.c, hardware.cpu.registers),\n    LoadRegDD: hardware => writeToRegister('d', hardware.cpu.registers.d, hardware.cpu.registers),\n    LoadRegDE: hardware => writeToRegister('d', hardware.cpu.registers.e, hardware.cpu.registers),\n    LoadRegDH: hardware => writeToRegister('d', hardware.cpu.registers.h, hardware.cpu.registers),\n    LoadRegDL: hardware => writeToRegister('d', hardware.cpu.registers.l, hardware.cpu.registers),\n    LoadRegEA: hardware => writeToRegister('e', hardware.cpu.registers.a, hardware.cpu.registers),\n    LoadRegEB: hardware => writeToRegister('e', hardware.cpu.registers.b, hardware.cpu.registers),\n    LoadRegEC: hardware => writeToRegister('e', hardware.cpu.registers.c, hardware.cpu.registers),\n    LoadRegED: hardware => writeToRegister('e', hardware.cpu.registers.d, hardware.cpu.registers),\n    LoadRegEE: hardware => writeToRegister('e', hardware.cpu.registers.e, hardware.cpu.registers),\n    LoadRegEH: hardware => writeToRegister('e', hardware.cpu.registers.h, hardware.cpu.registers),\n    LoadRegEL: hardware => writeToRegister('e', hardware.cpu.registers.l, hardware.cpu.registers),\n    LoadRegHA: hardware => writeToRegister('h', hardware.cpu.registers.a, hardware.cpu.registers),\n    LoadRegHB: hardware => writeToRegister('h', hardware.cpu.registers.b, hardware.cpu.registers),\n    LoadRegHC: hardware => writeToRegister('h', hardware.cpu.registers.c, hardware.cpu.registers),\n    LoadRegHD: hardware => writeToRegister('h', hardware.cpu.registers.d, hardware.cpu.registers),\n    LoadRegHE: hardware => writeToRegister('h', hardware.cpu.registers.e, hardware.cpu.registers),\n    LoadRegHH: hardware => writeToRegister('h', hardware.cpu.registers.h, hardware.cpu.registers),\n    LoadRegHL: hardware => writeToRegister('h', hardware.cpu.registers.l, hardware.cpu.registers),\n    LoadRegLA: hardware => writeToRegister('l', hardware.cpu.registers.a, hardware.cpu.registers),\n    LoadRegLB: hardware => writeToRegister('l', hardware.cpu.registers.b, hardware.cpu.registers),\n    LoadRegLC: hardware => writeToRegister('l', hardware.cpu.registers.c, hardware.cpu.registers),\n    LoadRegLD: hardware => writeToRegister('l', hardware.cpu.registers.d, hardware.cpu.registers),\n    LoadRegLE: hardware => writeToRegister('l', hardware.cpu.registers.e, hardware.cpu.registers),\n    LoadRegLH: hardware => writeToRegister('l', hardware.cpu.registers.h, hardware.cpu.registers),\n    LoadRegLL: hardware => writeToRegister('l', hardware.cpu.registers.l, hardware.cpu.registers),\n};\n\n\n//# sourceURL=webpack:///./src/Emulator/CPU/Operations/LoadStore/RegisterToRegister.ts?");

/***/ }),

/***/ "./src/Emulator/CPU/Operations/LoadStore/Swap.ts":
/*!*******************************************************!*\
  !*** ./src/Emulator/CPU/Operations/LoadStore/Swap.ts ***!
  \*******************************************************/
/*! exports provided: SwapOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SwapOperators\", function() { return SwapOperators; });\nconst swap = (register, registers) => {\n    const value = registers[register];\n    registers[register] = ((value & 0xF) << 4) | ((value & 0xF0) >> 4);\n};\nconst SwapOperators = {\n    SwapNibblesA: hardware => swap('a', hardware.cpu.registers),\n    SwapNibblesB: hardware => swap('b', hardware.cpu.registers),\n    SwapNibblesC: hardware => swap('c', hardware.cpu.registers),\n    SwapNibblesD: hardware => swap('d', hardware.cpu.registers),\n    SwapNibblesE: hardware => swap('e', hardware.cpu.registers),\n    SwapNibblesH: hardware => swap('h', hardware.cpu.registers),\n    SwapNibblesL: hardware => swap('l', hardware.cpu.registers),\n};\n\n\n//# sourceURL=webpack:///./src/Emulator/CPU/Operations/LoadStore/Swap.ts?");

/***/ }),

/***/ "./src/Emulator/CPU/Operations/Stack.ts":
/*!**********************************************!*\
  !*** ./src/Emulator/CPU/Operations/Stack.ts ***!
  \**********************************************/
/*! exports provided: StackOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"StackOperators\", function() { return StackOperators; });\nconst StackOperators = {\n    PushBC: hardware => {\n        const memory = hardware.memory;\n        const registers = hardware.cpu.registers;\n        memory.writeByte(--registers.stackPointer, registers.b);\n        memory.writeByte(--registers.stackPointer, registers.c);\n        registers.m = 3;\n    },\n    PopHL: hardware => {\n        const memory = hardware.memory;\n        const registers = hardware.cpu.registers;\n        registers.l = memory.readByte(registers.stackPointer++);\n        registers.h = memory.readByte(registers.stackPointer++);\n        registers.m = 3;\n    },\n};\n\n\n//# sourceURL=webpack:///./src/Emulator/CPU/Operations/Stack.ts?");

/***/ }),

/***/ "./src/Emulator/CPU/Operations/mappings.ts":
/*!*************************************************!*\
  !*** ./src/Emulator/CPU/Operations/mappings.ts ***!
  \*************************************************/
/*! exports provided: toOpcodeMap, toCbcodeMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toOpcodeMap\", function() { return toOpcodeMap; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toCbcodeMap\", function() { return toCbcodeMap; });\nconst toOpcodeMap = (operators) => [\n    // 0x00\n    operators.Noop, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    // 0x10\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    // 0x30\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    // 0x40\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    // 0x50\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    // 0x60\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    // 0x70\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    // 0x80\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    // 0x90\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    // 0xA0\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    // 0xB0\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    // 0xC0\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    // 0xD0\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    // 0xE0\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    // 0xF0\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n];\nconst toCbcodeMap = (operators) => [\n    // CB 0x00\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    // CB 0x10\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    // CB 0x30\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    // CB 0x40\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    // CB 0x50\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    // CB 0x60\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    // CB 0x70\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    // CB 0x80\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    // CB 0x90\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    // CB 0xA0\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    // CB 0xB0\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    // CB 0xC0\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    // CB 0xD0\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    // CB 0xE0\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    // CB 0xF0\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n    operators.NoImpl, operators.NoImpl, operators.NoImpl, operators.NoImpl,\n];\n\n\n//# sourceURL=webpack:///./src/Emulator/CPU/Operations/mappings.ts?");

/***/ }),

/***/ "./src/Emulator/CPU/Registers.ts":
/*!***************************************!*\
  !*** ./src/Emulator/CPU/Registers.ts ***!
  \***************************************/
/*! exports provided: RegisterFlag, RegisterSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RegisterFlag\", function() { return RegisterFlag; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RegisterSet\", function() { return RegisterSet; });\n/* harmony import */ var _Clock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Clock */ \"./src/Emulator/CPU/Clock.ts\");\n\nvar RegisterFlag;\n(function (RegisterFlag) {\n    RegisterFlag[RegisterFlag[\"CARRY\"] = 16] = \"CARRY\";\n    RegisterFlag[RegisterFlag[\"HALF_CARRY\"] = 32] = \"HALF_CARRY\";\n    RegisterFlag[RegisterFlag[\"OPERATION\"] = 64] = \"OPERATION\";\n    RegisterFlag[RegisterFlag[\"ZERO\"] = 128] = \"ZERO\";\n})(RegisterFlag || (RegisterFlag = {}));\nclass RegisterSet {\n    constructor(clock) {\n        this.clock = clock || new _Clock__WEBPACK_IMPORTED_MODULE_0__[\"Clock\"]();\n        this.reset();\n    }\n    reset() {\n        this.a = 0;\n        this.b = 0;\n        this.c = 0;\n        this.d = 0;\n        this.e = 0;\n        this.h = 0;\n        this.l = 0;\n        this.flags = 0;\n        this.stackPointer = 0;\n        this.programCount = 0;\n        this.clock.reset();\n    }\n    get m() {\n        return this.clock.m;\n    }\n    set m(value) {\n        this.clock.m = value;\n    }\n    get t() {\n        return this.clock.t;\n    }\n    set t(value) {\n        this.clock.t = value;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/Emulator/CPU/Registers.ts?");

/***/ }),

/***/ "./src/Emulator/CPU/index.ts":
/*!***********************************!*\
  !*** ./src/Emulator/CPU/index.ts ***!
  \***********************************/
/*! exports provided: Cpu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Cpu\", function() { return Cpu; });\n/* harmony import */ var _Clock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Clock */ \"./src/Emulator/CPU/Clock.ts\");\n/* harmony import */ var _Operations_Add__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Operations/Add */ \"./src/Emulator/CPU/Operations/Add.ts\");\n/* harmony import */ var _Operations_Compare__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Operations/Compare */ \"./src/Emulator/CPU/Operations/Compare.ts\");\n/* harmony import */ var _Operations_Extra__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Operations/Extra */ \"./src/Emulator/CPU/Operations/Extra.ts\");\n/* harmony import */ var _Operations_LoadStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Operations/LoadStore */ \"./src/Emulator/CPU/Operations/LoadStore.ts\");\n/* harmony import */ var _Operations_mappings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Operations/mappings */ \"./src/Emulator/CPU/Operations/mappings.ts\");\n/* harmony import */ var _Operations_Stack__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Operations/Stack */ \"./src/Emulator/CPU/Operations/Stack.ts\");\n/* harmony import */ var _Registers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Registers */ \"./src/Emulator/CPU/Registers.ts\");\n\n\n\n\n\n\n\n\nclass Cpu {\n    constructor() {\n        this.halt = false;\n        this.stop = false;\n        this.hardware = null;\n        this.clock = new _Clock__WEBPACK_IMPORTED_MODULE_0__[\"Clock\"]();\n        this.registers = new _Registers__WEBPACK_IMPORTED_MODULE_7__[\"RegisterSet\"]();\n        this.operators = Object.assign({}, _Operations_Add__WEBPACK_IMPORTED_MODULE_1__[\"AddOperators\"], _Operations_Compare__WEBPACK_IMPORTED_MODULE_2__[\"CompareOperators\"], _Operations_Extra__WEBPACK_IMPORTED_MODULE_3__[\"ExtraOperators\"], _Operations_LoadStore__WEBPACK_IMPORTED_MODULE_4__[\"LoadStoreOperators\"], _Operations_Stack__WEBPACK_IMPORTED_MODULE_6__[\"StackOperators\"]);\n        this.opcodes = Object(_Operations_mappings__WEBPACK_IMPORTED_MODULE_5__[\"toOpcodeMap\"])(this.operators);\n        this.cbcodes = Object(_Operations_mappings__WEBPACK_IMPORTED_MODULE_5__[\"toCbcodeMap\"])(this.operators);\n    }\n    setHardwareBus(hardware) {\n        this.hardware = hardware;\n    }\n    step() {\n        const op = this.hardware.memory.readByte(this.registers.programCount++);\n        this.opcodes[op](this.hardware);\n        this.registers.programCount &= 65535;\n        this.clock.m += this.registers.m;\n        this.clock.t += this.registers.t;\n        this.hardware.gpu.step();\n    }\n    exec() {\n        this.halt = false;\n        this.stop = false;\n        while (!this.halt && !this.stop)\n            this.step();\n    }\n    reset() {\n        this.clock.reset();\n        this.registers.reset();\n        this.halt = true;\n        this.stop = false;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/Emulator/CPU/index.ts?");

/***/ }),

/***/ "./src/Emulator/GPU/Color.ts":
/*!***********************************!*\
  !*** ./src/Emulator/GPU/Color.ts ***!
  \***********************************/
/*! exports provided: Color, Palette */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Color\", function() { return Color; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Palette\", function() { return Palette; });\nclass Color {\n    constructor(data) {\n        this.data = data;\n    }\n    get r() {\n        return this.data[0];\n    }\n    set r(value) {\n        this.data[0] = value;\n    }\n    get g() {\n        return this.data[1];\n    }\n    set g(value) {\n        this.data[1] = value;\n    }\n    get b() {\n        return this.data[2];\n    }\n    set b(value) {\n        this.data[2] = value;\n    }\n    get a() {\n        return this.data[3];\n    }\n    set a(value) {\n        this.data[3] = value;\n    }\n    static fromRGB(r, g, b, a) {\n        return new Color([r, g, b, a]);\n    }\n}\nclass Palette {\n    constructor() {\n        this.reset();\n    }\n    get(index) {\n        if (index < 0 || index > this.colors.length)\n            throw new Error(`Invalid palette index: ${index}`);\n        return this.colors[index];\n    }\n    reset() {\n        this.colors = [\n            Color.fromRGB(255, 255, 255, 255),\n            Color.fromRGB(192, 192, 192, 255),\n            Color.fromRGB(96, 96, 96, 255),\n            Color.fromRGB(0, 0, 0, 255),\n        ];\n    }\n}\n\n\n//# sourceURL=webpack:///./src/Emulator/GPU/Color.ts?");

/***/ }),

/***/ "./src/Emulator/GPU/index.ts":
/*!***********************************!*\
  !*** ./src/Emulator/GPU/index.ts ***!
  \***********************************/
/*! exports provided: RenderingMode, Gpu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RenderingMode\", function() { return RenderingMode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Gpu\", function() { return Gpu; });\n/* harmony import */ var _Color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Color */ \"./src/Emulator/GPU/Color.ts\");\n\n/**\n * OAM_READ: 80 ticks\n * VRAM_READ: 172 ticks\n * HBLANK: 204 ticks\n *\n * Full line = OAM_READ + VRAM_READ + HBLANK = 456 ticks\n */\nvar RenderingMode;\n(function (RenderingMode) {\n    RenderingMode[RenderingMode[\"HBLANK\"] = 0] = \"HBLANK\";\n    RenderingMode[RenderingMode[\"VBLANK\"] = 1] = \"VBLANK\";\n    RenderingMode[RenderingMode[\"OAM_READ\"] = 2] = \"OAM_READ\";\n    RenderingMode[RenderingMode[\"VRAM_READ\"] = 3] = \"VRAM_READ\";\n})(RenderingMode || (RenderingMode = {}));\nclass Gpu {\n    constructor(canvas) {\n        this.scrollX = 0;\n        this.scrollY = 0;\n        this.bgMap = false;\n        this.bgTile = 0;\n        this.mode = RenderingMode.HBLANK;\n        this.modeClock = 0;\n        this.line = 0;\n        this.hardware = null;\n        this.canvas = canvas;\n        this.palette = new _Color__WEBPACK_IMPORTED_MODULE_0__[\"Palette\"]();\n        this.reset();\n    }\n    updateTile(address, value) {\n        address &= 0x1FFE;\n        const tile = (address >> 4) & 511;\n        const y = (address >> 1) & 7;\n        let sx;\n        for (let x = 0; x < 8; x++) {\n            sx = 1 << (7 - x);\n            this.tileset[tile][y][x] = (this.vram[address] & sx ? 1 : 0) + (this.vram[address] & sx ? 2 : 0);\n        }\n    }\n    updateOAM(address, value) {\n    }\n    load(file) {\n        const reader = new FileReader();\n        return new Promise((resolve, reject) => {\n            reader.addEventListener('load', () => resolve(reader));\n            reader.addEventListener('error', () => reject(reader.error));\n            reader.addEventListener('abort', () => reject(null));\n            reader.readAsArrayBuffer(file);\n        });\n    }\n    step() {\n        this.modeClock += this.hardware.cpu.registers.t;\n        switch (this.mode) {\n            case RenderingMode.OAM_READ:\n                if (this.modeClock >= 80) {\n                    this.modeClock = 0;\n                    this.mode = RenderingMode.VRAM_READ;\n                }\n                break;\n            case RenderingMode.VRAM_READ:\n                if (this.modeClock >= 172) {\n                    this.modeClock = 0;\n                    this.mode = RenderingMode.HBLANK;\n                    this.render();\n                }\n                break;\n            case RenderingMode.HBLANK:\n                if (this.modeClock >= 204) {\n                    this.modeClock = 0;\n                    if (++this.line === 143) {\n                        this.mode = RenderingMode.VBLANK;\n                        this.context.putImageData(this.screen, 0, 0);\n                    }\n                    else\n                        this.mode = RenderingMode.OAM_READ;\n                }\n                break;\n            case RenderingMode.VBLANK:\n                if (this.modeClock >= 456) {\n                    this.modeClock = 0;\n                    if (++this.line > 153) {\n                        this.mode = RenderingMode.OAM_READ;\n                        this.line = 0;\n                    }\n                }\n                break;\n        }\n    }\n    reset() {\n        this.palette.reset();\n        this.vram = new Int16Array(1 << 13); // 8k\n        this.oam = new Int16Array(160);\n        this.context = this.canvas.getContext('2d');\n        this.screen = this.context.createImageData(160, 144);\n        this.context.putImageData(this.screen, 0, 0);\n        this.tileset = [];\n        for (let i = 0; i < 384; i++) {\n            this.tileset.push([]);\n            for (let j = 0; j < 8; j++)\n                this.tileset[i].push((new Array(8).fill(0)));\n        }\n    }\n    setHardwareBus(hardware) {\n        this.hardware = hardware;\n    }\n    render() {\n        let mapOffset = this.bgMap ? 0x1C00 : 0x1800;\n        mapOffset += ((this.line + this.scrollY) & 255) >> 3;\n        let lineOffset = this.scrollX >> 3;\n        let y = (this.line + this.scrollY) & 7;\n        let x = this.scrollX & 7;\n        let canvasOffset = this.line * 160 * 4;\n        let tile = this.vram[mapOffset + lineOffset];\n        if (this.bgTile === 1 && tile < 128)\n            tile += 256;\n        for (let i = 0; i < 160; i++) {\n            let color = this.palette.get(this.tileset[tile][y][x]);\n            this.screen.data[canvasOffset++] = color.r;\n            this.screen.data[canvasOffset++] = color.g;\n            this.screen.data[canvasOffset++] = color.b;\n            this.screen.data[canvasOffset++] = color.a;\n            if (++x === 8) {\n                x = 0;\n                lineOffset = (lineOffset + 1) & 31;\n                tile = this.vram[mapOffset + lineOffset];\n                if (this.bgTile === 1 && tile < 128)\n                    tile += 256;\n            }\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./src/Emulator/GPU/index.ts?");

/***/ }),

/***/ "./src/Emulator/Hardware.ts":
/*!**********************************!*\
  !*** ./src/Emulator/Hardware.ts ***!
  \**********************************/
/*! exports provided: HardwareBus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"HardwareBus\", function() { return HardwareBus; });\nclass HardwareBus {\n    constructor(cpu, memory, gpu) {\n        this.cpu = cpu;\n        this.memory = memory;\n        this.gpu = gpu;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/Emulator/Hardware.ts?");

/***/ }),

/***/ "./src/Emulator/Memory/Bios.ts":
/*!*************************************!*\
  !*** ./src/Emulator/Memory/Bios.ts ***!
  \*************************************/
/*! exports provided: bios */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"bios\", function() { return bios; });\nconst bios = Int16Array.from([\n    0x31, 0xFE, 0xFF, 0xAF, 0x21, 0xFF, 0x9F, 0x32, 0xCB, 0x7C, 0x20, 0xFB, 0x21, 0x26, 0xFF, 0x0E,\n    0x11, 0x3E, 0x80, 0x32, 0xE2, 0x0C, 0x3E, 0xF3, 0xE2, 0x32, 0x3E, 0x77, 0x77, 0x3E, 0xFC, 0xE0,\n    0x47, 0x11, 0x04, 0x01, 0x21, 0x10, 0x80, 0x1A, 0xCD, 0x95, 0x00, 0xCD, 0x96, 0x00, 0x13, 0x7B,\n    0xFE, 0x34, 0x20, 0xF3, 0x11, 0xD8, 0x00, 0x06, 0x08, 0x1A, 0x13, 0x22, 0x23, 0x05, 0x20, 0xF9,\n    0x3E, 0x19, 0xEA, 0x10, 0x99, 0x21, 0x2F, 0x99, 0x0E, 0x0C, 0x3D, 0x28, 0x08, 0x32, 0x0D, 0x20,\n    0xF9, 0x2E, 0x0F, 0x18, 0xF3, 0x67, 0x3E, 0x64, 0x57, 0xE0, 0x42, 0x3E, 0x91, 0xE0, 0x40, 0x04,\n    0x1E, 0x02, 0x0E, 0x0C, 0xF0, 0x44, 0xFE, 0x90, 0x20, 0xFA, 0x0D, 0x20, 0xF7, 0x1D, 0x20, 0xF2,\n    0x0E, 0x13, 0x24, 0x7C, 0x1E, 0x83, 0xFE, 0x62, 0x28, 0x06, 0x1E, 0xC1, 0xFE, 0x64, 0x20, 0x06,\n    0x7B, 0xE2, 0x0C, 0x3E, 0x87, 0xF2, 0xF0, 0x42, 0x90, 0xE0, 0x42, 0x15, 0x20, 0xD2, 0x05, 0x20,\n    0x4F, 0x16, 0x20, 0x18, 0xCB, 0x4F, 0x06, 0x04, 0xC5, 0xCB, 0x11, 0x17, 0xC1, 0xCB, 0x11, 0x17,\n    0x05, 0x20, 0xF5, 0x22, 0x23, 0x22, 0x23, 0xC9, 0xCE, 0xED, 0x66, 0x66, 0xCC, 0x0D, 0x00, 0x0B,\n    0x03, 0x73, 0x00, 0x83, 0x00, 0x0C, 0x00, 0x0D, 0x00, 0x08, 0x11, 0x1F, 0x88, 0x89, 0x00, 0x0E,\n    0xDC, 0xCC, 0x6E, 0xE6, 0xDD, 0xDD, 0xD9, 0x99, 0xBB, 0xBB, 0x67, 0x63, 0x6E, 0x0E, 0xEC, 0xCC,\n    0xDD, 0xDC, 0x99, 0x9F, 0xBB, 0xB9, 0x33, 0x3E, 0x3c, 0x42, 0xB9, 0xA5, 0xB9, 0xA5, 0x42, 0x4C,\n    0x21, 0x04, 0x01, 0x11, 0xA8, 0x00, 0x1A, 0x13, 0xBE, 0x20, 0xFE, 0x23, 0x7D, 0xFE, 0x34, 0x20,\n    0xF5, 0x06, 0x19, 0x78, 0x86, 0x23, 0x05, 0x20, 0xFB, 0x86, 0x20, 0xFE, 0x3E, 0x01, 0xE0, 0x50,\n]);\n\n\n//# sourceURL=webpack:///./src/Emulator/Memory/Bios.ts?");

/***/ }),

/***/ "./src/Emulator/Memory/index.ts":
/*!**************************************!*\
  !*** ./src/Emulator/Memory/index.ts ***!
  \**************************************/
/*! exports provided: Memory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Memory\", function() { return Memory; });\n/* harmony import */ var _Bios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bios */ \"./src/Emulator/Memory/Bios.ts\");\n\nclass Memory {\n    constructor() {\n        this.inBios = true;\n        this.hardware = null;\n        this.bios = _Bios__WEBPACK_IMPORTED_MODULE_0__[\"bios\"];\n        this.reset();\n    }\n    readByte(address) {\n        const masked = address & 0xF000;\n        if (masked === 0x0000) { // BIOS / High ROM0\n            if (this.inBios) {\n                if (address < 0x0100)\n                    return this.bios[address];\n                else if (this.hardware.cpu.registers.programCount === 0x0100)\n                    this.inBios = false;\n            }\n            return this.rom[address];\n        }\n        else if (masked <= 0x7000) // ROM0 / ROM1 (unbanked)\n            return this.rom[address];\n        else if (masked <= 0x9000) // Video RAM\n            return this.hardware.gpu.vram[address & 0x1FFF];\n        else if (masked <= 0xB000) // External RAM\n            return this.eram[address & 0x1FFF];\n        else if (masked <= 0xFD00) // Working RAM and WRAM shadow\n            return this.wram[address & 0x1FFF];\n        else {\n            const lowMasked = address & 0x0F00;\n            if (lowMasked === 0xE00) { // Graphics object attribute memory (OAM)\n                if (address < 0xFEA0)\n                    return this.hardware.gpu.oam[address & 0xFF];\n                else\n                    return 0;\n            }\n            else if (lowMasked === 0xF00) { // Zero-page RAM\n                if (address >= 0xFF80)\n                    return this.zram[address & 0x7F];\n                else\n                    return 0;\n            }\n        }\n    }\n    readWord(address) {\n        return this.readByte(address) + (this.readByte(address + 1) << 8);\n    }\n    writeByte(address, value) {\n        const masked = address & 0xF000;\n        if (masked <= 0x7000) // ROM is not writable\n            return;\n        else if (masked <= 0x9000) { // Video RAM\n            const mapped = address & 0x1FFF;\n            this.hardware.gpu.vram[mapped] = value;\n            this.hardware.gpu.updateTile(mapped, value); // TODO this may need to be the full address, not the mapped one\n        }\n        else if (masked <= 0xB000) // External RAM\n            this.eram[address & 0x1FFF] = value;\n        else if (masked <= 0xFD000) // Working RAM / WRAM shadow\n            this.wram[address & 0x1FFF] = value;\n        else {\n            const lowMasked = address & 0x0F00;\n            if (lowMasked === 0xE00) {\n                const mapped = address & 0xFF;\n                if (mapped < 0xA0)\n                    return;\n                this.hardware.gpu.updateOAM(mapped, value);\n            }\n            else if (lowMasked === 0xF00 && address >= 0xFF80)\n                this.zram[address & 0x7F] = value;\n        }\n    }\n    writeWord(address, value) {\n        this.writeByte(address, value & 255);\n        this.writeByte(address + 1, value >> 8);\n    }\n    setHardwareBus(hardware) {\n        this.hardware = hardware;\n    }\n    load(file) {\n        const reader = new FileReader();\n        return new Promise((resolve, reject) => {\n            reader.addEventListener('load', () => {\n                this.rom = new Int16Array(reader.result);\n                resolve(reader);\n            });\n            reader.addEventListener('error', () => reject(reader.error));\n            reader.addEventListener('abort', () => reject(null));\n            reader.readAsArrayBuffer(file);\n        });\n    }\n    reset() {\n        this.inBios = true;\n        this.rom = new Int16Array(1 << 15); // 32k\n        this.eram = new Int16Array(1 << 13); // 8k\n        this.wram = new Int16Array(1 << 13); // 8k\n        this.zram = new Int16Array(128); // 128b\n    }\n}\n\n\n//# sourceURL=webpack:///./src/Emulator/Memory/index.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Emulator_CPU_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Emulator/CPU/index */ \"./src/Emulator/CPU/index.ts\");\n/* harmony import */ var _Emulator_GPU_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Emulator/GPU/index */ \"./src/Emulator/GPU/index.ts\");\n/* harmony import */ var _Emulator_Hardware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Emulator/Hardware */ \"./src/Emulator/Hardware.ts\");\n/* harmony import */ var _Emulator_Memory_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Emulator/Memory/index */ \"./src/Emulator/Memory/index.ts\");\n\n\n\n\nconst cpu = new _Emulator_CPU_index__WEBPACK_IMPORTED_MODULE_0__[\"Cpu\"]();\nconst memory = new _Emulator_Memory_index__WEBPACK_IMPORTED_MODULE_3__[\"Memory\"]();\nconst gpu = new _Emulator_GPU_index__WEBPACK_IMPORTED_MODULE_1__[\"Gpu\"](document.getElementById('screen'));\nconst hardware = new _Emulator_Hardware__WEBPACK_IMPORTED_MODULE_2__[\"HardwareBus\"](cpu, memory, gpu);\ncpu.setHardwareBus(hardware);\nmemory.setHardwareBus(hardware);\ngpu.setHardwareBus(hardware);\nconst romLoader = document.getElementById('rom-loader');\nromLoader.addEventListener('change', () => {\n    gpu.reset();\n    memory.reset();\n    cpu.reset();\n    cpu.halt = true;\n    if (!romLoader.files.length)\n        return;\n    gpu.load(romLoader.files[0]);\n    cpu.exec();\n});\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });