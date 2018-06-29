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
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Clock", function() { return Clock; });
class Clock {
    constructor() {
        this.t = 0;
        this._m = 0;
    }
    get m() {
        return this._m;
    }
    set m(value) {
        this._m = value;
        this.t = value * 4;
    }
    reset() {
        this.m = 0;
    }
}


/***/ }),

/***/ "./src/Emulator/CPU/Operations/Add.ts":
/*!********************************************!*\
  !*** ./src/Emulator/CPU/Operations/Add.ts ***!
  \********************************************/
/*! exports provided: AddOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddOperators", function() { return AddOperators; });
/* harmony import */ var _Registers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Registers */ "./src/Emulator/CPU/Registers.ts");

const registerAdd = (value, registers) => {
    registers.a += value;
    registers.flags = 0;
    if (!(registers.a & 255))
        registers.flags |= _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].ZERO;
    if (registers.a > 255)
        registers.flags |= _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].CARRY;
    registers.a &= 255;
    registers.m = 1;
};
const registerAdd16 = (value, registers) => {
    value += (registers.h << 8) + registers.l;
    if (value > 65535)
        registers.flags |= _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].CARRY;
    else
        registers.flags &= 0xEF;
    registers.h = (value >> 8) & 255;
    registers.l = value & 255;
    registers.m = 3;
};
const registerAdd16FromAddress = (sourceHigh, sourceLow, registers) => {
    registerAdd16((registers[sourceHigh] << 8) + registers[sourceLow], registers);
};
const addFromAddress = (address, memory, registers) => {
    const a = registers.a;
    const m = memory.readByte(address);
    registers.a += m;
    registers.flags = registers.a > 255 ? _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].CARRY : 0;
    registers.a &= 255;
    if (!registers.a)
        registers.flags |= _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].ZERO;
    if ((registers.a ^ a ^ m) & 0x10)
        registers.flags |= _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].HALF_CARRY;
    registers.m = 2;
};
const addWithCarry = (value, registers) => {
    const a = registers.a;
    registers.a += value;
    registers.a += registers.flags & _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].CARRY ? 1 : 0;
    registers.flags = (registers.a > 255) ? _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].CARRY : 0;
    registers.a &= 255;
    if (registers.a)
        registers.flags |= _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].ZERO;
    if ((registers.a ^ value ^ a) & 0x10)
        registers.flags |= _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].HALF_CARRY;
    registers.m = 1;
};
const addFromAddressWithCarry = (address, memory, registers) => {
    const a = registers.a;
    const m = memory.readByte(address);
    registers.a += m;
    registers.a += registers.flags & _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].CARRY ? 1 : 0;
    registers.flags = registers.a > 255 ? _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].CARRY : 0;
    registers.a &= 255;
    if (!registers.a)
        registers.flags |= _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].ZERO;
    if ((registers.a ^ m ^ a) & 0x10)
        registers.flags |= _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].HALF_CARRY;
    registers.m = 2;
};
const AddOperators = {
    AddA: hardware => registerAdd(hardware.cpu.registers.a, hardware.cpu.registers),
    AddB: hardware => registerAdd(hardware.cpu.registers.b, hardware.cpu.registers),
    AddC: hardware => registerAdd(hardware.cpu.registers.c, hardware.cpu.registers),
    AddD: hardware => registerAdd(hardware.cpu.registers.d, hardware.cpu.registers),
    AddE: hardware => registerAdd(hardware.cpu.registers.e, hardware.cpu.registers),
    AddH: hardware => registerAdd(hardware.cpu.registers.h, hardware.cpu.registers),
    AddL: hardware => registerAdd(hardware.cpu.registers.l, hardware.cpu.registers),
    AddPCAddress: hardware => addFromAddress(hardware.cpu.registers.programCount, hardware.memory, hardware.cpu.registers),
    AddHLAddress: hardware => {
        const registers = hardware.cpu.registers;
        addFromAddress((registers.h << 8) + registers.l, hardware.memory, registers);
    },
    AddBCToHL: hardware => registerAdd16FromAddress('b', 'c', hardware.cpu.registers),
    AddDEToHL: hardware => registerAdd16FromAddress('d', 'e', hardware.cpu.registers),
    AddHLToHL: hardware => registerAdd16FromAddress('h', 'l', hardware.cpu.registers),
    AddSPToHL: hardware => registerAdd16(hardware.cpu.registers.stackPointer, hardware.cpu.registers),
    AddPCAddressToSP: hardware => {
        const memory = hardware.memory;
        const registers = hardware.cpu.registers;
        let i = memory.readByte(registers.programCount++);
        if (i > 127)
            i = -((~i + 1) & 255);
        registers.stackPointer += i;
        registers.m = 4;
    },
    AddAWithCarry: hardware => addWithCarry(hardware.cpu.registers.a, hardware.cpu.registers),
    AddBWithCarry: hardware => addWithCarry(hardware.cpu.registers.b, hardware.cpu.registers),
    AddCWithCarry: hardware => addWithCarry(hardware.cpu.registers.c, hardware.cpu.registers),
    AddDWithCarry: hardware => addWithCarry(hardware.cpu.registers.d, hardware.cpu.registers),
    AddEWithCarry: hardware => addWithCarry(hardware.cpu.registers.e, hardware.cpu.registers),
    AddHWithCarry: hardware => addWithCarry(hardware.cpu.registers.h, hardware.cpu.registers),
    AddLWithCarry: hardware => addWithCarry(hardware.cpu.registers.l, hardware.cpu.registers),
    AddPCAddressWithCarry: hardware => addFromAddressWithCarry(hardware.cpu.registers.programCount, hardware.memory, hardware.cpu.registers),
    AddHLAddressWithCarry: hardware => {
        const registers = hardware.cpu.registers;
        addFromAddressWithCarry((registers.h << 8) + registers.l, hardware.memory, registers);
    },
};


/***/ }),

/***/ "./src/Emulator/CPU/Operations/BitManipulation.ts":
/*!********************************************************!*\
  !*** ./src/Emulator/CPU/Operations/BitManipulation.ts ***!
  \********************************************************/
/*! exports provided: BitManipulationOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BitManipulationOperators", function() { return BitManipulationOperators; });
/* harmony import */ var _BitManipulation_Extra__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BitManipulation/Extra */ "./src/Emulator/CPU/Operations/BitManipulation/Extra.ts");
/* harmony import */ var _BitManipulation_Reset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BitManipulation/Reset */ "./src/Emulator/CPU/Operations/BitManipulation/Reset.ts");
/* harmony import */ var _BitManipulation_RotateLeft__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BitManipulation/RotateLeft */ "./src/Emulator/CPU/Operations/BitManipulation/RotateLeft.ts");
/* harmony import */ var _BitManipulation_RotateRight__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BitManipulation/RotateRight */ "./src/Emulator/CPU/Operations/BitManipulation/RotateRight.ts");
/* harmony import */ var _BitManipulation_Set__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BitManipulation/Set */ "./src/Emulator/CPU/Operations/BitManipulation/Set.ts");
/* harmony import */ var _BitManipulation_ShiftLeft__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BitManipulation/ShiftLeft */ "./src/Emulator/CPU/Operations/BitManipulation/ShiftLeft.ts");
/* harmony import */ var _BitManipulation_ShiftRight__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./BitManipulation/ShiftRight */ "./src/Emulator/CPU/Operations/BitManipulation/ShiftRight.ts");
/* harmony import */ var _BitManipulation_Test__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./BitManipulation/Test */ "./src/Emulator/CPU/Operations/BitManipulation/Test.ts");








const BitManipulationOperators = Object.assign({}, _BitManipulation_Extra__WEBPACK_IMPORTED_MODULE_0__["ExtraBitManipOperatos"], _BitManipulation_Reset__WEBPACK_IMPORTED_MODULE_1__["ResetOperators"], _BitManipulation_RotateLeft__WEBPACK_IMPORTED_MODULE_2__["RotateLeftOperators"], _BitManipulation_RotateRight__WEBPACK_IMPORTED_MODULE_3__["RotateRightOperators"], _BitManipulation_Test__WEBPACK_IMPORTED_MODULE_7__["TestOperators"], _BitManipulation_Set__WEBPACK_IMPORTED_MODULE_4__["SetOperators"], _BitManipulation_ShiftLeft__WEBPACK_IMPORTED_MODULE_5__["ShiftLeftOperators"], _BitManipulation_ShiftRight__WEBPACK_IMPORTED_MODULE_6__["ShiftRightOperators"]);


/***/ }),

/***/ "./src/Emulator/CPU/Operations/BitManipulation/Extra.ts":
/*!**************************************************************!*\
  !*** ./src/Emulator/CPU/Operations/BitManipulation/Extra.ts ***!
  \**************************************************************/
/*! exports provided: ExtraBitManipOperatos */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExtraBitManipOperatos", function() { return ExtraBitManipOperatos; });
/* harmony import */ var _Registers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Registers */ "./src/Emulator/CPU/Registers.ts");

const ExtraBitManipOperatos = {
    InvertA: hardware => {
        const registers = hardware.cpu.registers;
        registers.a ^= 255;
        registers.flags = registers.a ? 0 : _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].ZERO;
        registers.m = 1;
    },
    NegateA: hardware => {
        const registers = hardware.cpu.registers;
        registers.a = -registers.a;
        registers.flags = registers.a < 0 ? _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].CARRY : 0;
        registers.a &= 255;
        if (!registers.a)
            registers.flags |= _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].ZERO;
        registers.m = 2;
    },
    InvertCarryFlag: hardware => {
        const registers = hardware.cpu.registers;
        const ci = registers.flags & _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].CARRY ? 0 : 0x10;
        registers.flags = (registers.flags & 0xEF) + ci;
        registers.m = 1;
    },
    SetCarryFlag: hardware => {
        hardware.cpu.registers.flags |= _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].CARRY;
        hardware.cpu.registers.m = 1;
    },
};


/***/ }),

/***/ "./src/Emulator/CPU/Operations/BitManipulation/Reset.ts":
/*!**************************************************************!*\
  !*** ./src/Emulator/CPU/Operations/BitManipulation/Reset.ts ***!
  \**************************************************************/
/*! exports provided: ResetOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetOperators", function() { return ResetOperators; });
const reset = (name, mask, registers) => {
    registers[name] &= mask;
    registers.m = 2;
};
const resetAddress = (mask, hardware) => {
    const memory = hardware.memory;
    const registers = hardware.cpu.registers;
    const address = (registers.h << 8) + registers.l;
    memory.writeByte(address, memory.readByte(address) & mask);
    registers.m = 4;
};
const operators = {};
['a', 'b', 'c', 'd', 'e', 'h', 'l', 'm'].forEach((name) => {
    let mask = 0xFE;
    for (let i = 0; i <= 7; i++) {
        let key;
        let callable;
        if (name === 'm') {
            key = `ResetHLAddressBit${i}`;
            callable = (hardware) => resetAddress(mask, hardware);
        }
        else {
            key = `Reset${name.toUpperCase()}Bit${i}`;
            callable = (hardware) => reset(name, mask, hardware.cpu.registers);
        }
        operators[key] = callable;
        if (i === 0)
            mask -= 1;
        else
            mask -= Math.pow(2, i);
    }
});
const ResetOperators = operators;


/***/ }),

/***/ "./src/Emulator/CPU/Operations/BitManipulation/RotateLeft.ts":
/*!*******************************************************************!*\
  !*** ./src/Emulator/CPU/Operations/BitManipulation/RotateLeft.ts ***!
  \*******************************************************************/
/*! exports provided: RotateLeftOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RotateLeftOperators", function() { return RotateLeftOperators; });
const rotateLeft = (name, carry, registers) => {
    const flagMask = carry ? 0x80 : 0x10;
    const ci = registers.flags & flagMask ? 1 : 0;
    const co = registers[name] & 0x80 ? 0x10 : 0;
    registers[name] = ((registers[name] << 1) + ci) & 255;
    registers.flags = (registers.flags & 0xEF) + co;
    registers.m = name === 'a' ? 1 : 2;
};
const rotateLeftAddress = (carry, hardware) => {
    const memory = hardware.memory;
    const registers = hardware.cpu.registers;
    const flagMask = carry ? 0x80 : 0x10;
    const address = (registers.h << 8) + registers.l;
    let i = memory.readByte(address);
    const ci = registers.flags & flagMask ? 1 : 0;
    const co = i & 0x80 ? 0x10 : 0;
    i = ((i << 1) + ci) & 255;
    registers.flags = i ? 0 : 0x80;
    memory.writeByte(address, i);
    registers.flags = (registers.flags & 0xEF) + co;
    registers.m = 4;
};
const RotateLeftOperators = {
    RotateLeftA: hardware => rotateLeft('a', false, hardware.cpu.registers),
    RotateLeftB: hardware => rotateLeft('b', false, hardware.cpu.registers),
    RotateLeftC: hardware => rotateLeft('c', false, hardware.cpu.registers),
    RotateLeftD: hardware => rotateLeft('d', false, hardware.cpu.registers),
    RotateLeftE: hardware => rotateLeft('e', false, hardware.cpu.registers),
    RotateLeftH: hardware => rotateLeft('h', false, hardware.cpu.registers),
    RotateLeftL: hardware => rotateLeft('l', false, hardware.cpu.registers),
    RotateLeftHLAddress: hardware => rotateLeftAddress(false, hardware),
    RotateLeftAWithCarry: hardware => rotateLeft('a', true, hardware.cpu.registers),
    RotateLeftBWithCarry: hardware => rotateLeft('b', true, hardware.cpu.registers),
    RotateLeftCWithCarry: hardware => rotateLeft('c', true, hardware.cpu.registers),
    RotateLeftDWithCarry: hardware => rotateLeft('d', true, hardware.cpu.registers),
    RotateLeftEWithCarry: hardware => rotateLeft('e', true, hardware.cpu.registers),
    RotateLeftHWithCarry: hardware => rotateLeft('h', true, hardware.cpu.registers),
    RotateLeftLWithCarry: hardware => rotateLeft('l', true, hardware.cpu.registers),
    RotateLeftHLAddressWithCarry: hardware => rotateLeftAddress(true, hardware),
};


/***/ }),

/***/ "./src/Emulator/CPU/Operations/BitManipulation/RotateRight.ts":
/*!********************************************************************!*\
  !*** ./src/Emulator/CPU/Operations/BitManipulation/RotateRight.ts ***!
  \********************************************************************/
/*! exports provided: RotateRightOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RotateRightOperators", function() { return RotateRightOperators; });
const rotateRight = (name, carry, registers) => {
    const flagMask = carry ? 1 : 0x10;
    const ci = registers.flags & flagMask ? 0x80 : 0;
    const co = registers[name] & 1 ? 0x10 : 0;
    registers[name] = ((registers[name] >> 1) + ci) & 255;
    registers.flags = (registers.flags & 0xEF) + co;
    registers.m = name === 'a' ? 1 : 2;
};
const rotateRightAddress = (carry, hardware) => {
    const memory = hardware.memory;
    const registers = hardware.cpu.registers;
    const flagMask = carry ? 1 : 0x10;
    const address = (registers.h << 8) + registers.l;
    let i = memory.readByte(address);
    const ci = registers.flags & flagMask ? 0x80 : 0;
    const co = i & 1 ? 0x10 : 0;
    i = ((i >> 1) + ci) & 255;
    memory.writeByte(address, i);
    registers.flags = i ? 0 : 0x80;
    registers.flags = (registers.flags & 0xEF) + co;
    registers.m = 4;
};
const RotateRightOperators = {
    RotateRightA: hardware => rotateRight('a', false, hardware.cpu.registers),
    RotateRightB: hardware => rotateRight('b', false, hardware.cpu.registers),
    RotateRightC: hardware => rotateRight('c', false, hardware.cpu.registers),
    RotateRightD: hardware => rotateRight('d', false, hardware.cpu.registers),
    RotateRightE: hardware => rotateRight('e', false, hardware.cpu.registers),
    RotateRightH: hardware => rotateRight('h', false, hardware.cpu.registers),
    RotateRightL: hardware => rotateRight('l', false, hardware.cpu.registers),
    RotateRightHLAddress: hardware => rotateRightAddress(false, hardware),
    RotateRightAWithCarry: hardware => rotateRight('a', true, hardware.cpu.registers),
    RotateRightBWithCarry: hardware => rotateRight('b', true, hardware.cpu.registers),
    RotateRightCWithCarry: hardware => rotateRight('c', true, hardware.cpu.registers),
    RotateRightDWithCarry: hardware => rotateRight('d', true, hardware.cpu.registers),
    RotateRightEWithCarry: hardware => rotateRight('e', true, hardware.cpu.registers),
    RotateRightHWithCarry: hardware => rotateRight('h', true, hardware.cpu.registers),
    RotateRightLWithCarry: hardware => rotateRight('l', true, hardware.cpu.registers),
    RotateRightHLAddressWithCarry: hardware => rotateRightAddress(true, hardware),
};


/***/ }),

/***/ "./src/Emulator/CPU/Operations/BitManipulation/Set.ts":
/*!************************************************************!*\
  !*** ./src/Emulator/CPU/Operations/BitManipulation/Set.ts ***!
  \************************************************************/
/*! exports provided: SetOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetOperators", function() { return SetOperators; });
const set = (name, mask, registers) => {
    registers[name] = registers[name] & mask;
    registers.m = 2;
};
const setAddress = (mask, hardware) => {
    const memory = hardware.memory;
    const registers = hardware.cpu.registers;
    const address = (registers.h << 8) + registers.l;
    memory.writeByte(address, memory.readByte(address) & mask);
    registers.m = 4;
};
const operators = {};
['a', 'b', 'c', 'd', 'e', 'h', 'l', 'm'].forEach((name) => {
    let mask = 0x01;
    for (let i = 0; i <= 7; i++) {
        let key;
        let callable;
        if (name === 'm') {
            key = `SetHLAddressBit${i}`;
            callable = (hardware) => setAddress(mask, hardware);
        }
        else {
            key = `Set${name.toUpperCase()}Bit${i}`;
            callable = (hardware) => set(name, mask, hardware.cpu.registers);
        }
        operators[key] = callable;
        mask *= 2;
    }
});
const SetOperators = operators;


/***/ }),

/***/ "./src/Emulator/CPU/Operations/BitManipulation/ShiftLeft.ts":
/*!******************************************************************!*\
  !*** ./src/Emulator/CPU/Operations/BitManipulation/ShiftLeft.ts ***!
  \******************************************************************/
/*! exports provided: ShiftLeftOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShiftLeftOperators", function() { return ShiftLeftOperators; });
const shiftLeft = (name, registers, extra = 0) => {
    const co = registers[name] & 0x80 ? 0x10 : 0;
    registers[name] = (registers[name] << 1) & 255 + extra;
    registers.flags = registers[name] ? 0 : 0x80;
    registers.flags = (registers.flags & 0xEF) + co;
    registers.m = 2;
};
const shiftLeftLogical = (name, registers) => {
    shiftLeft(name, registers, 1);
};
const ShiftLeftOperators = {
    ShiftLeftAArithmetic: hardware => shiftLeft('a', hardware.cpu.registers),
    ShiftLeftBArithmetic: hardware => shiftLeft('b', hardware.cpu.registers),
    ShiftLeftCArithmetic: hardware => shiftLeft('c', hardware.cpu.registers),
    ShiftLeftDArithmetic: hardware => shiftLeft('d', hardware.cpu.registers),
    ShiftLeftEArithmetic: hardware => shiftLeft('e', hardware.cpu.registers),
    ShiftLeftHArithmetic: hardware => shiftLeft('h', hardware.cpu.registers),
    ShiftLeftLArithmetic: hardware => shiftLeft('l', hardware.cpu.registers),
    ShiftLeftALogical: hardware => shiftLeftLogical('a', hardware.cpu.registers),
    ShiftLeftBLogical: hardware => shiftLeftLogical('b', hardware.cpu.registers),
    ShiftLeftCLogical: hardware => shiftLeftLogical('c', hardware.cpu.registers),
    ShiftLeftDLogical: hardware => shiftLeftLogical('d', hardware.cpu.registers),
    ShiftLeftELogical: hardware => shiftLeftLogical('e', hardware.cpu.registers),
    ShiftLeftHLogical: hardware => shiftLeftLogical('h', hardware.cpu.registers),
    ShiftLeftLLogical: hardware => shiftLeftLogical('l', hardware.cpu.registers),
};


/***/ }),

/***/ "./src/Emulator/CPU/Operations/BitManipulation/ShiftRight.ts":
/*!*******************************************************************!*\
  !*** ./src/Emulator/CPU/Operations/BitManipulation/ShiftRight.ts ***!
  \*******************************************************************/
/*! exports provided: ShiftRightOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShiftRightOperators", function() { return ShiftRightOperators; });
const shiftRight = (name, registers) => {
    const ci = registers[name] & 0x80;
    const co = registers[name] & 1 ? 0x10 : 0;
    registers[name] = ((registers[name] >> 1) + ci) & 255;
    registers.flags = registers[name] ? 0 : 0x80;
    registers.flags = (registers.flags & 0xEF) + co;
    registers.m = 2;
};
const shiftRightLogical = (name, registers) => {
    const co = registers[name] & 1 ? 0x10 : 0;
    registers[name] = (registers[name] >> 1) & 255;
    registers.flags = registers[name] ? 0 : 0x80;
    registers.flags = (registers.flags & 0xEF) + co;
    registers.m = 2;
};
const ShiftRightOperators = {
    ShiftRightAArithmetic: hardware => shiftRight('a', hardware.cpu.registers),
    ShiftRightBArithmetic: hardware => shiftRight('b', hardware.cpu.registers),
    ShiftRightCArithmetic: hardware => shiftRight('c', hardware.cpu.registers),
    ShiftRightDArithmetic: hardware => shiftRight('d', hardware.cpu.registers),
    ShiftRightEArithmetic: hardware => shiftRight('e', hardware.cpu.registers),
    ShiftRightHArithmetic: hardware => shiftRight('h', hardware.cpu.registers),
    ShiftRightLArithmetic: hardware => shiftRight('l', hardware.cpu.registers),
    ShiftRightALogical: hardware => shiftRightLogical('a', hardware.cpu.registers),
    ShiftRightBLogical: hardware => shiftRightLogical('b', hardware.cpu.registers),
    ShiftRightCLogical: hardware => shiftRightLogical('c', hardware.cpu.registers),
    ShiftRightDLogical: hardware => shiftRightLogical('d', hardware.cpu.registers),
    ShiftRightELogical: hardware => shiftRightLogical('e', hardware.cpu.registers),
    ShiftRightHLogical: hardware => shiftRightLogical('h', hardware.cpu.registers),
    ShiftRightLLogical: hardware => shiftRightLogical('l', hardware.cpu.registers),
};


/***/ }),

/***/ "./src/Emulator/CPU/Operations/BitManipulation/Test.ts":
/*!*************************************************************!*\
  !*** ./src/Emulator/CPU/Operations/BitManipulation/Test.ts ***!
  \*************************************************************/
/*! exports provided: TestOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestOperators", function() { return TestOperators; });
/* harmony import */ var _Registers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Registers */ "./src/Emulator/CPU/Registers.ts");

const test = (name, mask, registers) => {
    registers.flags = registers[name] & mask ? 0 : _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].ZERO;
    registers.m = 2;
};
const testAddress = (mask, hardware) => {
    const registers = hardware.cpu.registers;
    registers.flags = hardware.memory.readByte((registers.h << 8) + registers.l) & mask ? 0 : _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].ZERO;
    registers.m = 3;
};
const operators = {};
['a', 'b', 'c', 'd', 'e', 'h', 'l', 'm'].forEach((name) => {
    let mask = 0x01;
    for (let i = 0; i <= 7; i++) {
        let key;
        let callable;
        if (name === 'm') {
            key = `TestHLAddressBit${i}`;
            callable = (hardware) => testAddress(mask, hardware);
        }
        else {
            key = `Test${name.toUpperCase()}Bit${i}`;
            callable = (hardware) => test(name, mask, hardware.cpu.registers);
        }
        operators[key] = callable;
        mask *= 2;
    }
});
const TestOperators = operators;


/***/ }),

/***/ "./src/Emulator/CPU/Operations/Bitwise.ts":
/*!************************************************!*\
  !*** ./src/Emulator/CPU/Operations/Bitwise.ts ***!
  \************************************************/
/*! exports provided: BitwiseOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BitwiseOperators", function() { return BitwiseOperators; });
/* harmony import */ var _Bitwise_And__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bitwise/And */ "./src/Emulator/CPU/Operations/Bitwise/And.ts");
/* harmony import */ var _Bitwise_Or__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Bitwise/Or */ "./src/Emulator/CPU/Operations/Bitwise/Or.ts");
/* harmony import */ var _Bitwise_Xor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Bitwise/Xor */ "./src/Emulator/CPU/Operations/Bitwise/Xor.ts");



const BitwiseOperators = Object.assign({}, _Bitwise_And__WEBPACK_IMPORTED_MODULE_0__["BitAndOperators"], _Bitwise_Or__WEBPACK_IMPORTED_MODULE_1__["BitOrOperators"], _Bitwise_Xor__WEBPACK_IMPORTED_MODULE_2__["BitXorOperators"]);


/***/ }),

/***/ "./src/Emulator/CPU/Operations/Bitwise/And.ts":
/*!****************************************************!*\
  !*** ./src/Emulator/CPU/Operations/Bitwise/And.ts ***!
  \****************************************************/
/*! exports provided: BitAndOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BitAndOperators", function() { return BitAndOperators; });
/* harmony import */ var _Registers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Registers */ "./src/Emulator/CPU/Registers.ts");

const and = (value, registers) => {
    registers.a &= value;
    registers.a &= 255;
    registers.flags = registers.a ? 0 : _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].ZERO;
    registers.m = 1;
};
const andAddress = (address, hardware) => {
    const registers = hardware.cpu.registers;
    and(hardware.memory.readByte(address), registers);
    registers.m = 2;
};
const BitAndOperators = {
    BitAndA: hardware => and(hardware.cpu.registers.a, hardware.cpu.registers),
    BitAndB: hardware => and(hardware.cpu.registers.a, hardware.cpu.registers),
    BitAndC: hardware => and(hardware.cpu.registers.a, hardware.cpu.registers),
    BitAndD: hardware => and(hardware.cpu.registers.a, hardware.cpu.registers),
    BitAndE: hardware => and(hardware.cpu.registers.a, hardware.cpu.registers),
    BitAndH: hardware => and(hardware.cpu.registers.a, hardware.cpu.registers),
    BitAndL: hardware => and(hardware.cpu.registers.a, hardware.cpu.registers),
    BitAndHLAddress: hardware => {
        const registers = hardware.cpu.registers;
        andAddress((registers.h << 8) + registers.l, hardware);
    },
    BitAndPCAddress: hardware => {
        const registers = hardware.cpu.registers;
        andAddress(registers.programCount++, hardware);
    },
};


/***/ }),

/***/ "./src/Emulator/CPU/Operations/Bitwise/Or.ts":
/*!***************************************************!*\
  !*** ./src/Emulator/CPU/Operations/Bitwise/Or.ts ***!
  \***************************************************/
/*! exports provided: BitOrOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BitOrOperators", function() { return BitOrOperators; });
/* harmony import */ var _Registers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Registers */ "./src/Emulator/CPU/Registers.ts");

const or = (value, registers) => {
    registers.a |= value;
    registers.a &= 255;
    registers.flags = registers.a ? 0 : _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].ZERO;
    registers.m = 1;
};
const orAddress = (address, hardware) => {
    const registers = hardware.cpu.registers;
    or(hardware.memory.readByte(address), registers);
    registers.m = 2;
};
const BitOrOperators = {
    BitOrA: hardware => or(hardware.cpu.registers.a, hardware.cpu.registers),
    BitOrB: hardware => or(hardware.cpu.registers.b, hardware.cpu.registers),
    BitOrC: hardware => or(hardware.cpu.registers.c, hardware.cpu.registers),
    BitOrD: hardware => or(hardware.cpu.registers.d, hardware.cpu.registers),
    BitOrE: hardware => or(hardware.cpu.registers.e, hardware.cpu.registers),
    BitOrH: hardware => or(hardware.cpu.registers.h, hardware.cpu.registers),
    BitOrL: hardware => or(hardware.cpu.registers.l, hardware.cpu.registers),
    BitOrHLAddress: hardware => {
        const registers = hardware.cpu.registers;
        orAddress((registers.h << 8) + registers.l, hardware);
    },
    BitOrPCAddress: hardware => {
        const registers = hardware.cpu.registers;
        orAddress(registers.programCount++, hardware);
    },
};


/***/ }),

/***/ "./src/Emulator/CPU/Operations/Bitwise/Xor.ts":
/*!****************************************************!*\
  !*** ./src/Emulator/CPU/Operations/Bitwise/Xor.ts ***!
  \****************************************************/
/*! exports provided: BitXorOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BitXorOperators", function() { return BitXorOperators; });
/* harmony import */ var _Registers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Registers */ "./src/Emulator/CPU/Registers.ts");

const xor = (value, registers) => {
    registers.a ^= value;
    registers.a &= 255;
    registers.flags = registers.a ? 0 : _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].ZERO;
    registers.m = 1;
};
const xorAddress = (address, hardware) => {
    xor(hardware.memory.readByte(address), hardware.cpu.registers);
    hardware.cpu.registers.m = 2;
};
const BitXorOperators = {
    BitXorA: hardware => xor(hardware.cpu.registers.a, hardware.cpu.registers),
    BitXorB: hardware => xor(hardware.cpu.registers.b, hardware.cpu.registers),
    BitXorC: hardware => xor(hardware.cpu.registers.c, hardware.cpu.registers),
    BitXorD: hardware => xor(hardware.cpu.registers.d, hardware.cpu.registers),
    BitXorE: hardware => xor(hardware.cpu.registers.e, hardware.cpu.registers),
    BitXorH: hardware => xor(hardware.cpu.registers.h, hardware.cpu.registers),
    BitXorL: hardware => xor(hardware.cpu.registers.l, hardware.cpu.registers),
    BitXorHLAddress: hardware => {
        const registers = hardware.cpu.registers;
        xorAddress((registers.h << 8) + registers.l, hardware);
    },
    BitXorPCAddress: hardware => xorAddress(hardware.cpu.registers.programCount++, hardware),
};


/***/ }),

/***/ "./src/Emulator/CPU/Operations/Compare.ts":
/*!************************************************!*\
  !*** ./src/Emulator/CPU/Operations/Compare.ts ***!
  \************************************************/
/*! exports provided: CompareOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompareOperators", function() { return CompareOperators; });
/* harmony import */ var _Registers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Registers */ "./src/Emulator/CPU/Registers.ts");

const registerCompare = (value, registers) => {
    const i = registers.a - value;
    registers.flags |= _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].OPERATION;
    if (!(i & 255))
        registers.flags |= _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].ZERO;
    if (i < 255)
        registers.flags |= _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].CARRY;
    registers.m = 1;
};
const CompareOperators = {
    Compare_RegisterA: hardware => registerCompare(hardware.cpu.registers.a, hardware.cpu.registers),
    Compare_RegisterB: hardware => registerCompare(hardware.cpu.registers.b, hardware.cpu.registers),
    Compare_RegisterC: hardware => registerCompare(hardware.cpu.registers.c, hardware.cpu.registers),
    Compare_RegisterD: hardware => registerCompare(hardware.cpu.registers.d, hardware.cpu.registers),
    Compare_RegisterE: hardware => registerCompare(hardware.cpu.registers.e, hardware.cpu.registers),
    Compare_RegisterH: hardware => registerCompare(hardware.cpu.registers.h, hardware.cpu.registers),
    Compare_RegisterL: hardware => registerCompare(hardware.cpu.registers.l, hardware.cpu.registers),
};


/***/ }),

/***/ "./src/Emulator/CPU/Operations/Decrement.ts":
/*!**************************************************!*\
  !*** ./src/Emulator/CPU/Operations/Decrement.ts ***!
  \**************************************************/
/*! exports provided: DecrementOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DecrementOperators", function() { return DecrementOperators; });
/* harmony import */ var _Registers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Registers */ "./src/Emulator/CPU/Registers.ts");

const decrement = (name, registers) => {
    registers[name] = (registers[name] - 1) & 255;
    registers.flags = registers[name] ? 0 : _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].ZERO;
    registers.m = 1;
};
const decrementAddress = (address, hardware) => {
    const memory = hardware.memory;
    const value = (memory.readByte(address) - 1) & 255;
    memory.writeByte(address, value);
    hardware.cpu.registers.flags = value ? 0 : _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].ZERO;
    hardware.cpu.registers.m = 3;
};
const decrement16 = (highReg, lowReg, registers) => {
    registers[lowReg] = (registers[lowReg] - 1) & 255;
    if (!registers[lowReg])
        registers[highReg] = (registers[highReg] - 1) & 255;
    registers.m = 1;
};
const DecrementOperators = {
    DecrementA: hardware => decrement('a', hardware.cpu.registers),
    DecrementB: hardware => decrement('b', hardware.cpu.registers),
    DecrementC: hardware => decrement('c', hardware.cpu.registers),
    DecrementD: hardware => decrement('d', hardware.cpu.registers),
    DecrementE: hardware => decrement('e', hardware.cpu.registers),
    DecrementH: hardware => decrement('h', hardware.cpu.registers),
    DecrementL: hardware => decrement('l', hardware.cpu.registers),
    DecrementHLAddress: hardware => {
        const registers = hardware.cpu.registers;
        decrementAddress((registers.h << 8) + registers.l, hardware);
    },
    DecrementBC: hardware => decrement16('b', 'c', hardware.cpu.registers),
    DecrementDE: hardware => decrement16('d', 'e', hardware.cpu.registers),
    DecrementHL: hardware => decrement16('h', 'l', hardware.cpu.registers),
    DecrementSP: hardware => {
        const registers = hardware.cpu.registers;
        registers.stackPointer = (registers.stackPointer - 1) & 65535;
        registers.m = 1;
    },
};


/***/ }),

/***/ "./src/Emulator/CPU/Operations/Extra.ts":
/*!**********************************************!*\
  !*** ./src/Emulator/CPU/Operations/Extra.ts ***!
  \**********************************************/
/*! exports provided: ExtraOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExtraOperators", function() { return ExtraOperators; });
/* harmony import */ var _Registers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Registers */ "./src/Emulator/CPU/Registers.ts");

const ExtraOperators = {
    BCDCorrect: hardware => {
        const registers = hardware.cpu.registers;
        const original = registers.a;
        if ((registers.flags & _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].HALF_CARRY) || (registers.a & 15) > 9)
            registers.a += 6;
        registers.flags &= 0xEF;
        if ((registers.flags & _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].HALF_CARRY) || original > 0x99) {
            registers.a += 0x60;
            registers.flags |= _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].CARRY;
        }
        registers.m = 1;
    },
    ExtraOperators: hardware => {
        const registers = hardware.registers;
        const i = hardware.memory.readByte(registers.programCount++);
        registers.programCount &= 65535;
        if (hardware.cpu.cbcodes[i])
            hardware.cpu.cbcodes[i](hardware);
        else
            hardware.cpu.operators.NoImplExtra(hardware);
    },
    Halt: hardware => {
        hardware.cpu.halt = true;
        hardware.registers.m = 1;
    },
    NoImpl: hardware => {
        const offset = hardware.cpu.registers.programCount - 1;
        const opcode = hardware.memory.readByte(offset);
        console.error(`Unimplemented instruction 0x${opcode.toString(16).toUpperCase()} at offset 0x${offset.toString(16).toUpperCase()}, stopping`);
        hardware.cpu.stop = true;
    },
    NoImplExtra: hardware => {
        const offset = hardware.cpu.registers.programCount - 1;
        const opcode = hardware.memory.readByte(offset);
        console.error(`Unimplemented extra instruction 0x${opcode.toString(16).toUpperCase()} at offset 0x${offset.toString(16).toUpperCase()}, stopping`);
        hardware.cpu.stop = true;
    },
    Noop: hardware => {
        hardware.cpu.registers.m = 1;
    },
};


/***/ }),

/***/ "./src/Emulator/CPU/Operations/Increment.ts":
/*!**************************************************!*\
  !*** ./src/Emulator/CPU/Operations/Increment.ts ***!
  \**************************************************/
/*! exports provided: IncrementOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IncrementOperators", function() { return IncrementOperators; });
/* harmony import */ var _Registers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Registers */ "./src/Emulator/CPU/Registers.ts");

const increment = (name, registers) => {
    registers[name] = (registers[name] + 1) & 255;
    registers.flags = registers[name] ? 0 : _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].ZERO;
    registers.m = 1;
};
const incrementAddress = (address, hardware) => {
    const memory = hardware.memory;
    const value = (memory.readByte(address) + 1) & 255;
    memory.writeByte(address, value);
    hardware.cpu.registers.flags = value ? 0 : _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].ZERO;
    hardware.cpu.registers.m = 3;
};
const increment16 = (highReg, lowReg, registers) => {
    registers[lowReg] = (registers[lowReg] + 1) & 255;
    if (!registers[lowReg])
        registers[highReg] = (registers[highReg] + 1) & 255;
    registers.m = 1;
};
const IncrementOperators = {
    IncrementA: hardware => increment('a', hardware.cpu.registers),
    IncrementB: hardware => increment('b', hardware.cpu.registers),
    IncrementC: hardware => increment('c', hardware.cpu.registers),
    IncrementD: hardware => increment('d', hardware.cpu.registers),
    IncrementE: hardware => increment('e', hardware.cpu.registers),
    IncrementH: hardware => increment('h', hardware.cpu.registers),
    IncrementL: hardware => increment('l', hardware.cpu.registers),
    IncrementHLAddress: hardware => {
        const registers = hardware.cpu.registers;
        incrementAddress((registers.h << 8) + registers.l, hardware);
    },
    IncrementBC: hardware => increment16('b', 'c', hardware.cpu.registers),
    IncrementDE: hardware => increment16('d', 'e', hardware.cpu.registers),
    IncrementHL: hardware => increment16('h', 'l', hardware.cpu.registers),
    IncrementSP: hardware => {
        const registers = hardware.cpu.registers;
        registers.stackPointer = (registers.stackPointer + 1) & 65535;
        registers.m = 1;
    },
};


/***/ }),

/***/ "./src/Emulator/CPU/Operations/Interrupt.ts":
/*!**************************************************!*\
  !*** ./src/Emulator/CPU/Operations/Interrupt.ts ***!
  \**************************************************/
/*! exports provided: Interrupt, InterruptOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Interrupt", function() { return Interrupt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InterruptOperators", function() { return InterruptOperators; });
const registerKeys = ['a', 'b', 'c', 'd', 'e', 'h', 'l'];
class RegisterStorage {
    static save(registers) {
        registerKeys.forEach(key => this.registers[key] = registers[key]);
    }
    static restore(registers) {
        registerKeys.forEach(key => registers[key] = this.registers[key]);
    }
}
RegisterStorage.registers = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    h: 0,
    l: 0,
};
const interrupt = (value, hardware) => {
    const registers = hardware.registers;
    RegisterStorage.save(registers);
    registers.stackPointer -= 2;
    hardware.memory.writeWord(registers.stackPointer, registers.programCount);
    registers.programCount = value;
    registers.m = 3;
};
var Interrupt;
(function (Interrupt) {
    Interrupt[Interrupt["VBLANK"] = 1] = "VBLANK";
    Interrupt[Interrupt["LCD_STAT"] = 2] = "LCD_STAT";
    Interrupt[Interrupt["TIMER"] = 4] = "TIMER";
    Interrupt[Interrupt["SERIAL"] = 8] = "SERIAL";
    Interrupt[Interrupt["JOYPAD"] = 16] = "JOYPAD";
})(Interrupt || (Interrupt = {}));
const InterruptOperators = {
    InterruptEnable: hardware => {
        hardware.cpu.allowInterrupts = true;
        hardware.registers.m = 1;
    },
    InterruptDisable: hardware => {
        hardware.cpu.allowInterrupts = false;
        hardware.registers.m = 1;
    },
    InterruptReturn: hardware => {
        const registers = hardware.registers;
        hardware.cpu.allowInterrupts = true;
        RegisterStorage.restore(registers);
        registers.programCount = hardware.memory.readWord(registers.stackPointer);
        registers.stackPointer += 2;
        registers.m = 3;
    },
    Interrupt00: hardware => interrupt(0x00, hardware),
    Interrupt08: hardware => interrupt(0x08, hardware),
    Interrupt10: hardware => interrupt(0x10, hardware),
    Interrupt18: hardware => interrupt(0x18, hardware),
    Interrupt20: hardware => interrupt(0x20, hardware),
    Interrupt28: hardware => interrupt(0x28, hardware),
    Interrupt30: hardware => interrupt(0x30, hardware),
    Interrupt38: hardware => interrupt(0x38, hardware),
    Interrupt40: hardware => interrupt(0x40, hardware),
    Interrupt48: hardware => interrupt(0x48, hardware),
    Interrupt50: hardware => interrupt(0x50, hardware),
    Interrupt58: hardware => interrupt(0x58, hardware),
    Interrupt60: hardware => interrupt(0x60, hardware),
};


/***/ }),

/***/ "./src/Emulator/CPU/Operations/Jump.ts":
/*!*********************************************!*\
  !*** ./src/Emulator/CPU/Operations/Jump.ts ***!
  \*********************************************/
/*! exports provided: JumpOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JumpOperators", function() { return JumpOperators; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/Emulator/CPU/Operations/index.ts");

const absJumpIf = (test, hardware) => {
    const { memory, registers } = hardware;
    registers.m = 3;
    if (test) {
        registers.programCount = memory.readWord(registers.programCount);
        ++registers.m;
    }
    else
        registers.programCount += 2;
};
const relJumpIf = (test, hardware) => {
    const { memory, registers } = hardware;
    let offset = memory.readByte(registers.programCount++);
    if (offset > 127)
        offset = -((~offset + 1) & 255);
    registers.m = 2;
    if (test) {
        registers.programCount += offset;
        ++registers.m;
    }
};
const labelJumpIf = (test, hardware) => {
    const { memory, registers } = hardware;
    registers.m = 3;
    if (test) {
        registers.stackPointer -= 2;
        memory.writeWord(registers.stackPointer, registers.programCount + 2);
        registers.programCount = memory.readWord(registers.programCount);
        registers.m += 2;
    }
    else
        registers.programCount += 2;
};
const JumpOperators = {
    AbsoluteJumpToPCAddress: hardware => {
        const registers = hardware.registers;
        registers.programCount = hardware.memory.readWord(registers.programCount);
        registers.m = 3;
    },
    AbsoluteJumpToHLAddress: hardware => {
        const registers = hardware.registers;
        registers.programCount = (registers.h << 8) + registers.l;
        registers.m = 1;
    },
    AbsoluteJumpToPCAddressIfZero: hardware => absJumpIf(Object(_index__WEBPACK_IMPORTED_MODULE_0__["testZero"])(hardware), hardware),
    AbsoluteJumpToPCAddressIfNotZero: hardware => absJumpIf(!Object(_index__WEBPACK_IMPORTED_MODULE_0__["testZero"])(hardware), hardware),
    AbsoluteJumpToPCAddressIfCarry: hardware => absJumpIf(Object(_index__WEBPACK_IMPORTED_MODULE_0__["testCarry"])(hardware), hardware),
    AbsoluteJumpToPCAddressIfNotCarry: hardware => absJumpIf(!Object(_index__WEBPACK_IMPORTED_MODULE_0__["testCarry"])(hardware), hardware),
    RelativeJumpToPCAddress: hardware => relJumpIf(true, hardware),
    RelativeJumpToPCAddressIfCarry: hardware => relJumpIf(Object(_index__WEBPACK_IMPORTED_MODULE_0__["testCarry"])(hardware), hardware),
    RelativeJumpToPCAddressIfNotCarry: hardware => relJumpIf(!Object(_index__WEBPACK_IMPORTED_MODULE_0__["testCarry"])(hardware), hardware),
    RelativeJumpToPCAddressIfZero: hardware => relJumpIf(Object(_index__WEBPACK_IMPORTED_MODULE_0__["testZero"])(hardware), hardware),
    RelativeJumpToPCAddressIfNotZero: hardware => relJumpIf(!Object(_index__WEBPACK_IMPORTED_MODULE_0__["testZero"])(hardware), hardware),
    RelativeJumpToPCAddressDecrementB: hardware => relJumpIf(--hardware.registers.b !== 0, hardware),
    LabelJumpPCAddress: hardware => labelJumpIf(true, hardware),
    LabelJumpPCAddressIfCarry: hardware => labelJumpIf(Object(_index__WEBPACK_IMPORTED_MODULE_0__["testCarry"])(hardware), hardware),
    LabelJumpPCAddressIfNotCarry: hardware => labelJumpIf(!Object(_index__WEBPACK_IMPORTED_MODULE_0__["testCarry"])(hardware), hardware),
    LabelJumpPCAddressIfZero: hardware => labelJumpIf(Object(_index__WEBPACK_IMPORTED_MODULE_0__["testZero"])(hardware), hardware),
    LabelJumpPCAddressIfNotZero: hardware => labelJumpIf(!Object(_index__WEBPACK_IMPORTED_MODULE_0__["testZero"])(hardware), hardware),
};


/***/ }),

/***/ "./src/Emulator/CPU/Operations/LoadStore.ts":
/*!**************************************************!*\
  !*** ./src/Emulator/CPU/Operations/LoadStore.ts ***!
  \**************************************************/
/*! exports provided: LoadStoreOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadStoreOperators", function() { return LoadStoreOperators; });
/* harmony import */ var _LoadStore_MemoryToMemory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LoadStore/MemoryToMemory */ "./src/Emulator/CPU/Operations/LoadStore/MemoryToMemory.ts");
/* harmony import */ var _LoadStore_MemoryToRegister__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LoadStore/MemoryToRegister */ "./src/Emulator/CPU/Operations/LoadStore/MemoryToRegister.ts");
/* harmony import */ var _LoadStore_ProgramCount__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LoadStore/ProgramCount */ "./src/Emulator/CPU/Operations/LoadStore/ProgramCount.ts");
/* harmony import */ var _LoadStore_RegisterToMemory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LoadStore/RegisterToMemory */ "./src/Emulator/CPU/Operations/LoadStore/RegisterToMemory.ts");
/* harmony import */ var _LoadStore_RegisterToRegister__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./LoadStore/RegisterToRegister */ "./src/Emulator/CPU/Operations/LoadStore/RegisterToRegister.ts");
/* harmony import */ var _LoadStore_Swap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./LoadStore/Swap */ "./src/Emulator/CPU/Operations/LoadStore/Swap.ts");






const LoadStoreOperators = Object.assign({}, _LoadStore_MemoryToMemory__WEBPACK_IMPORTED_MODULE_0__["MemoryToMemoryOperators"], _LoadStore_MemoryToRegister__WEBPACK_IMPORTED_MODULE_1__["MemoryToRegisterOperators"], _LoadStore_ProgramCount__WEBPACK_IMPORTED_MODULE_2__["ProgramCountOperators"], _LoadStore_RegisterToMemory__WEBPACK_IMPORTED_MODULE_3__["RegisterToMemoryOperators"], _LoadStore_RegisterToRegister__WEBPACK_IMPORTED_MODULE_4__["RegisterToRegisterOperators"], _LoadStore_Swap__WEBPACK_IMPORTED_MODULE_5__["SwapOperators"]);


/***/ }),

/***/ "./src/Emulator/CPU/Operations/LoadStore/MemoryToMemory.ts":
/*!*****************************************************************!*\
  !*** ./src/Emulator/CPU/Operations/LoadStore/MemoryToMemory.ts ***!
  \*****************************************************************/
/*! exports provided: MemoryToMemoryOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MemoryToMemoryOperators", function() { return MemoryToMemoryOperators; });
const MemoryToMemoryOperators = {
    LoadPCIntoHLAddress: hardware => {
        const memory = hardware.memory;
        const registers = hardware.cpu.registers;
        memory.writeByte((registers.h << 8) + registers.l, memory.readByte(registers.programCount++));
        registers.m = 3;
    },
};


/***/ }),

/***/ "./src/Emulator/CPU/Operations/LoadStore/MemoryToRegister.ts":
/*!*******************************************************************!*\
  !*** ./src/Emulator/CPU/Operations/LoadStore/MemoryToRegister.ts ***!
  \*******************************************************************/
/*! exports provided: MemoryToRegisterOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MemoryToRegisterOperators", function() { return MemoryToRegisterOperators; });
const loadMemoryToRegister = (destination, highReg, lowReg, hardware) => {
    const memory = hardware.memory;
    const registers = hardware.cpu.registers;
    const high = registers[highReg];
    const low = registers[lowReg];
    registers[destination] = memory.readByte((high << 8) + low);
    registers.m = 2;
};
const loadHLMemoryToRegister = (destination, hardware) => {
    loadMemoryToRegister(destination, 'h', 'l', hardware);
};
const loadPCAndNextIntoRegister = (destinationA, destinationB, hardware) => {
    const memory = hardware.memory;
    const registers = hardware.cpu.registers;
    registers[destinationA] = memory.readByte(registers.programCount++);
    registers[destinationB] = memory.readByte(registers.programCount++);
    registers.m = 3;
};
const MemoryToRegisterOperators = {
    LoadHLAddressIntoA: hardware => loadHLMemoryToRegister('a', hardware),
    LoadHLAddressIntoB: hardware => loadHLMemoryToRegister('b', hardware),
    LoadHLAddressIntoC: hardware => loadHLMemoryToRegister('c', hardware),
    LoadHLAddressIntoD: hardware => loadHLMemoryToRegister('d', hardware),
    LoadHLAddressIntoE: hardware => loadHLMemoryToRegister('e', hardware),
    LoadHLAddressIntoH: hardware => loadHLMemoryToRegister('h', hardware),
    LoadHLAddressIntoL: hardware => loadHLMemoryToRegister('l', hardware),
    LoadBCAddressIntoA: hardware => loadMemoryToRegister('a', 'b', 'c', hardware),
    LoadDEAddressIntoA: hardware => loadMemoryToRegister('a', 'd', 'e', hardware),
    LoadPCAndNextIntoBC: hardware => loadPCAndNextIntoRegister('b', 'c', hardware),
    LoadPCAndNextIntoDE: hardware => loadPCAndNextIntoRegister('d', 'e', hardware),
    LoadPCAndNextIntoHL: hardware => loadPCAndNextIntoRegister('h', 'l', hardware),
    LoadPCAndNextIntoSP: hardware => {
        const registers = hardware.cpu.registers;
        registers.stackPointer = hardware.memory.readWord(registers.programCount);
        registers.programCount += 2;
        registers.m = 3;
    },
    LoadPCWordIntoLH: hardware => {
        const memory = hardware.memory;
        const registers = hardware.cpu.registers;
        const index = memory.readWord(registers.programCount);
        registers.programCount += 2;
        // TODO Should this be reversed?
        registers.l = memory.readByte(index);
        registers.h = memory.readByte(index + 1);
        registers.m = 5;
    },
    LoadHLAddressIntoAAndIncrement: hardware => {
        const memory = hardware.memory;
        const registers = hardware.cpu.registers;
        registers.a = memory.readByte((registers.h << 8) + registers.l);
        registers.l = (registers.l + 1) & 255;
        if (!registers.l)
            registers.h = (registers.h + 1) & 255;
        registers.m = 2;
    },
    LoadHLAddressIntoAAndDecrement: hardware => {
        const memory = hardware.memory;
        const registers = hardware.cpu.registers;
        registers.a = memory.readByte((registers.h << 8) + registers.l);
        registers.l = (registers.l - 1) & 255;
        if (registers.l === 255)
            registers.h = (registers.h - 1) & 255;
        registers.m = 2;
    },
    LoadPCWithMagicIntoA: hardware => {
        const memory = hardware.memory;
        const registers = hardware.cpu.registers;
        registers.a = memory.readByte(0xFF00 + memory.readByte(registers.programCount++));
        registers.m = 3;
    },
    LoadCWithMagicAddressIntoA: hardware => {
        const memory = hardware.memory;
        const registers = hardware.cpu.registers;
        registers.a = memory.readByte(0xFF00 + registers.c);
        registers.m = 2;
    },
};


/***/ }),

/***/ "./src/Emulator/CPU/Operations/LoadStore/ProgramCount.ts":
/*!***************************************************************!*\
  !*** ./src/Emulator/CPU/Operations/LoadStore/ProgramCount.ts ***!
  \***************************************************************/
/*! exports provided: ProgramCountOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgramCountOperators", function() { return ProgramCountOperators; });
const pcToRegisterAndAdvance = (destination, memory, registers) => {
    registers[destination] = memory.readByte(registers.programCount++);
};
const ProgramCountOperators = {
    LoadPCToA_Advance: hardware => pcToRegisterAndAdvance('a', hardware.memory, hardware.cpu.registers),
    LoadPCToB_Advance: hardware => pcToRegisterAndAdvance('b', hardware.memory, hardware.cpu.registers),
    LoadPCToC_Advance: hardware => pcToRegisterAndAdvance('c', hardware.memory, hardware.cpu.registers),
    LoadPCToD_Advance: hardware => pcToRegisterAndAdvance('d', hardware.memory, hardware.cpu.registers),
    LoadPCToE_Advance: hardware => pcToRegisterAndAdvance('e', hardware.memory, hardware.cpu.registers),
    LoadPCToH_Advance: hardware => pcToRegisterAndAdvance('h', hardware.memory, hardware.cpu.registers),
    LoadPCToL_Advance: hardware => pcToRegisterAndAdvance('l', hardware.memory, hardware.cpu.registers),
    LoadPCWordIntoA: hardware => {
        const memory = hardware.memory;
        const registers = hardware.cpu.registers;
        registers.a = memory.readByte(memory.readWord(registers.programCount));
        registers.programCount += 2;
        registers.m = 4;
    },
    LoadPCWordIntoHL: hardware => {
        const memory = hardware.memory;
        const registers = hardware.cpu.registers;
        const index = memory.readWord(registers.programCount);
        registers.programCount += 2;
        memory.writeWord(index, (registers.h << 8) + registers.l);
        registers.m = 5;
    },
    SomeCrazyShitWithHLAndSP: hardware => {
        const memory = hardware.memory;
        const registers = hardware.cpu.registers;
        let i = memory.readByte(registers.programCount++);
        if (i > 127)
            i = -((~i + 1) & 255);
        i += registers.stackPointer;
        registers.h = (i >> 8) & 255;
        registers.l = i & 255;
        registers.m = 3;
    },
};


/***/ }),

/***/ "./src/Emulator/CPU/Operations/LoadStore/RegisterToMemory.ts":
/*!*******************************************************************!*\
  !*** ./src/Emulator/CPU/Operations/LoadStore/RegisterToMemory.ts ***!
  \*******************************************************************/
/*! exports provided: RegisterToMemoryOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterToMemoryOperators", function() { return RegisterToMemoryOperators; });
const loadRegisterToMemory = (source, highReg, lowReg, hardware) => {
    const memory = hardware.memory;
    const registers = hardware.cpu.registers;
    const high = registers[highReg];
    const low = registers[lowReg];
    memory.writeByte((high << 8) + low, registers[source]);
    registers.m = 2;
};
const loadRegisterToHLMemory = (source, hardware) => {
    loadRegisterToMemory(source, 'h', 'l', hardware);
};
const RegisterToMemoryOperators = {
    LoadAIntoHLAddress: hardware => loadRegisterToHLMemory('a', hardware),
    LoadBIntoHLAddress: hardware => loadRegisterToHLMemory('b', hardware),
    LoadCIntoHLAddress: hardware => loadRegisterToHLMemory('c', hardware),
    LoadDIntoHLAddress: hardware => loadRegisterToHLMemory('d', hardware),
    LoadEIntoHLAddress: hardware => loadRegisterToHLMemory('e', hardware),
    LoadHIntoHLAddress: hardware => loadRegisterToHLMemory('h', hardware),
    LoadLIntoHLAddress: hardware => loadRegisterToHLMemory('l', hardware),
    LoadAIntoBCAddress: hardware => loadRegisterToMemory('a', 'b', 'c', hardware),
    LoadAIntoDEAddress: hardware => loadRegisterToMemory('a', 'd', 'e', hardware),
    LoadAIntoPCAddress: hardware => {
        const memory = hardware.memory;
        const registers = hardware.cpu.registers;
        memory.writeByte(memory.readWord(registers.programCount), registers.a);
        registers.programCount += 2;
        registers.m = 4;
    },
    LoadAIntoHLAddressAndIncrement: hardware => {
        const memory = hardware.memory;
        const registers = hardware.cpu.registers;
        memory.writeByte((registers.h << 8) + registers.l, registers.a);
        registers.l = (registers.l + 1) & 255;
        if (!registers.l)
            registers.h = (registers.h + 1) & 255;
        registers.m = 2;
    },
    LoadAIntoHLAddressAndDecrement: hardware => {
        const memory = hardware.memory;
        const registers = hardware.cpu.registers;
        memory.writeByte((registers.h << 8) + registers.l, registers.a);
        registers.l = (registers.l - 1) & 255;
        if (registers.l === 255)
            registers.h = (registers.h - 1) & 255;
        registers.m = 2;
    },
    LoadAIntoPCWithMagicAddress: hardware => {
        const memory = hardware.memory;
        const registers = hardware.cpu.registers;
        memory.writeByte(0xFF00 + memory.readByte(registers.programCount++), registers.a);
        registers.m = 3;
    },
    LoadAIntoCWithMagicAddress: hardware => {
        const memory = hardware.memory;
        const registers = hardware.cpu.registers;
        memory.writeByte(0xFF00 + registers.c, registers.a);
        registers.m = 2;
    },
};


/***/ }),

/***/ "./src/Emulator/CPU/Operations/LoadStore/RegisterToRegister.ts":
/*!*********************************************************************!*\
  !*** ./src/Emulator/CPU/Operations/LoadStore/RegisterToRegister.ts ***!
  \*********************************************************************/
/*! exports provided: RegisterToRegisterOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterToRegisterOperators", function() { return RegisterToRegisterOperators; });
const writeToRegister = (destination, source, registers) => {
    registers[destination] = source;
    registers.m = 1;
};
const RegisterToRegisterOperators = {
    LoadRegAA: hardware => writeToRegister('a', hardware.cpu.registers.a, hardware.cpu.registers),
    LoadRegAB: hardware => writeToRegister('a', hardware.cpu.registers.b, hardware.cpu.registers),
    LoadRegAC: hardware => writeToRegister('a', hardware.cpu.registers.c, hardware.cpu.registers),
    LoadRegAD: hardware => writeToRegister('a', hardware.cpu.registers.d, hardware.cpu.registers),
    LoadRegAE: hardware => writeToRegister('a', hardware.cpu.registers.e, hardware.cpu.registers),
    LoadRegAH: hardware => writeToRegister('a', hardware.cpu.registers.h, hardware.cpu.registers),
    LoadRegAL: hardware => writeToRegister('a', hardware.cpu.registers.l, hardware.cpu.registers),
    LoadRegBA: hardware => writeToRegister('b', hardware.cpu.registers.a, hardware.cpu.registers),
    LoadRegBB: hardware => writeToRegister('b', hardware.cpu.registers.b, hardware.cpu.registers),
    LoadRegBC: hardware => writeToRegister('b', hardware.cpu.registers.c, hardware.cpu.registers),
    LoadRegBD: hardware => writeToRegister('b', hardware.cpu.registers.d, hardware.cpu.registers),
    LoadRegBE: hardware => writeToRegister('b', hardware.cpu.registers.e, hardware.cpu.registers),
    LoadRegBH: hardware => writeToRegister('b', hardware.cpu.registers.h, hardware.cpu.registers),
    LoadRegBL: hardware => writeToRegister('b', hardware.cpu.registers.l, hardware.cpu.registers),
    LoadRegCA: hardware => writeToRegister('c', hardware.cpu.registers.a, hardware.cpu.registers),
    LoadRegCB: hardware => writeToRegister('c', hardware.cpu.registers.b, hardware.cpu.registers),
    LoadRegCC: hardware => writeToRegister('c', hardware.cpu.registers.c, hardware.cpu.registers),
    LoadRegCD: hardware => writeToRegister('c', hardware.cpu.registers.d, hardware.cpu.registers),
    LoadRegCE: hardware => writeToRegister('c', hardware.cpu.registers.e, hardware.cpu.registers),
    LoadRegCH: hardware => writeToRegister('c', hardware.cpu.registers.h, hardware.cpu.registers),
    LoadRegCL: hardware => writeToRegister('c', hardware.cpu.registers.l, hardware.cpu.registers),
    LoadRegDA: hardware => writeToRegister('d', hardware.cpu.registers.a, hardware.cpu.registers),
    LoadRegDB: hardware => writeToRegister('d', hardware.cpu.registers.b, hardware.cpu.registers),
    LoadRegDC: hardware => writeToRegister('d', hardware.cpu.registers.c, hardware.cpu.registers),
    LoadRegDD: hardware => writeToRegister('d', hardware.cpu.registers.d, hardware.cpu.registers),
    LoadRegDE: hardware => writeToRegister('d', hardware.cpu.registers.e, hardware.cpu.registers),
    LoadRegDH: hardware => writeToRegister('d', hardware.cpu.registers.h, hardware.cpu.registers),
    LoadRegDL: hardware => writeToRegister('d', hardware.cpu.registers.l, hardware.cpu.registers),
    LoadRegEA: hardware => writeToRegister('e', hardware.cpu.registers.a, hardware.cpu.registers),
    LoadRegEB: hardware => writeToRegister('e', hardware.cpu.registers.b, hardware.cpu.registers),
    LoadRegEC: hardware => writeToRegister('e', hardware.cpu.registers.c, hardware.cpu.registers),
    LoadRegED: hardware => writeToRegister('e', hardware.cpu.registers.d, hardware.cpu.registers),
    LoadRegEE: hardware => writeToRegister('e', hardware.cpu.registers.e, hardware.cpu.registers),
    LoadRegEH: hardware => writeToRegister('e', hardware.cpu.registers.h, hardware.cpu.registers),
    LoadRegEL: hardware => writeToRegister('e', hardware.cpu.registers.l, hardware.cpu.registers),
    LoadRegHA: hardware => writeToRegister('h', hardware.cpu.registers.a, hardware.cpu.registers),
    LoadRegHB: hardware => writeToRegister('h', hardware.cpu.registers.b, hardware.cpu.registers),
    LoadRegHC: hardware => writeToRegister('h', hardware.cpu.registers.c, hardware.cpu.registers),
    LoadRegHD: hardware => writeToRegister('h', hardware.cpu.registers.d, hardware.cpu.registers),
    LoadRegHE: hardware => writeToRegister('h', hardware.cpu.registers.e, hardware.cpu.registers),
    LoadRegHH: hardware => writeToRegister('h', hardware.cpu.registers.h, hardware.cpu.registers),
    LoadRegHL: hardware => writeToRegister('h', hardware.cpu.registers.l, hardware.cpu.registers),
    LoadRegLA: hardware => writeToRegister('l', hardware.cpu.registers.a, hardware.cpu.registers),
    LoadRegLB: hardware => writeToRegister('l', hardware.cpu.registers.b, hardware.cpu.registers),
    LoadRegLC: hardware => writeToRegister('l', hardware.cpu.registers.c, hardware.cpu.registers),
    LoadRegLD: hardware => writeToRegister('l', hardware.cpu.registers.d, hardware.cpu.registers),
    LoadRegLE: hardware => writeToRegister('l', hardware.cpu.registers.e, hardware.cpu.registers),
    LoadRegLH: hardware => writeToRegister('l', hardware.cpu.registers.h, hardware.cpu.registers),
    LoadRegLL: hardware => writeToRegister('l', hardware.cpu.registers.l, hardware.cpu.registers),
};


/***/ }),

/***/ "./src/Emulator/CPU/Operations/LoadStore/Swap.ts":
/*!*******************************************************!*\
  !*** ./src/Emulator/CPU/Operations/LoadStore/Swap.ts ***!
  \*******************************************************/
/*! exports provided: SwapOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SwapOperators", function() { return SwapOperators; });
const swap = (register, registers) => {
    const value = registers[register];
    registers[register] = ((value & 0xF) << 4) | ((value & 0xF0) >> 4);
};
const SwapOperators = {
    SwapNibblesA: hardware => swap('a', hardware.cpu.registers),
    SwapNibblesB: hardware => swap('b', hardware.cpu.registers),
    SwapNibblesC: hardware => swap('c', hardware.cpu.registers),
    SwapNibblesD: hardware => swap('d', hardware.cpu.registers),
    SwapNibblesE: hardware => swap('e', hardware.cpu.registers),
    SwapNibblesH: hardware => swap('h', hardware.cpu.registers),
    SwapNibblesL: hardware => swap('l', hardware.cpu.registers),
};


/***/ }),

/***/ "./src/Emulator/CPU/Operations/Return.ts":
/*!***********************************************!*\
  !*** ./src/Emulator/CPU/Operations/Return.ts ***!
  \***********************************************/
/*! exports provided: ReturnOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReturnOperators", function() { return ReturnOperators; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/Emulator/CPU/Operations/index.ts");

const returnIf = (test, hardware) => {
    const { memory, registers } = hardware;
    registers.m = 1;
    if (test) {
        registers.programCount = memory.readWord(registers.stackPointer);
        registers.stackPointer += 2;
        registers.m += 2;
    }
};
const ReturnOperators = {
    Return: hardware => returnIf(true, hardware),
    ReturnIfCarry: hardware => returnIf(Object(_index__WEBPACK_IMPORTED_MODULE_0__["testCarry"])(hardware), hardware),
    ReturnIfNotCarry: hardware => returnIf(!Object(_index__WEBPACK_IMPORTED_MODULE_0__["testCarry"])(hardware), hardware),
    ReturnIfZero: hardware => returnIf(Object(_index__WEBPACK_IMPORTED_MODULE_0__["testZero"])(hardware), hardware),
    ReturnIfNotZero: hardware => returnIf(!Object(_index__WEBPACK_IMPORTED_MODULE_0__["testZero"])(hardware), hardware),
};


/***/ }),

/***/ "./src/Emulator/CPU/Operations/Stack.ts":
/*!**********************************************!*\
  !*** ./src/Emulator/CPU/Operations/Stack.ts ***!
  \**********************************************/
/*! exports provided: StackOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StackOperators", function() { return StackOperators; });
const push = (highReg, lowReg, hardware) => {
    const { memory, registers } = hardware;
    memory.writeByte(--registers.stackPointer, registers[highReg]);
    memory.writeByte(--registers.stackPointer, registers[lowReg]);
    registers.m = 3;
};
const pop = (highReg, lowReg, hardware) => {
    const { memory, registers } = hardware;
    registers[lowReg] = memory.readByte(registers.stackPointer++);
    registers[highReg] = memory.readByte(registers.stackPointer++);
    registers.m = 3;
};
const StackOperators = {
    PushBC: hardware => push('b', 'c', hardware),
    PushDE: hardware => push('d', 'e', hardware),
    PushHL: hardware => push('h', 'l', hardware),
    PopBC: hardware => pop('b', 'c', hardware),
    PopDE: hardware => pop('d', 'e', hardware),
    PopHL: hardware => pop('h', 'l', hardware),
    PopAF: hardware => pop('a', 'flags', hardware),
};


/***/ }),

/***/ "./src/Emulator/CPU/Operations/Subtract.ts":
/*!*************************************************!*\
  !*** ./src/Emulator/CPU/Operations/Subtract.ts ***!
  \*************************************************/
/*! exports provided: SubtractOperators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubtractOperators", function() { return SubtractOperators; });
/* harmony import */ var _Registers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Registers */ "./src/Emulator/CPU/Registers.ts");

const setFlags = (result, value, original, registers) => {
    registers.flags = _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].OPERATION;
    if (result < 0)
        registers.flags |= _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].CARRY;
    result &= 255;
    if (!result)
        registers.flags |= _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].ZERO;
    if (result ^ value ^ original)
        registers.flags |= _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].HALF_CARRY;
};
const finalize = (value, original, registers) => {
    setFlags(registers.a, value, original, registers);
    registers.a &= 255;
};
const subtract = (value, registers) => {
    const original = registers.a;
    registers.a -= value;
    finalize(value, original, registers);
    registers.m = 1;
};
const subtractAddress = (address, hardware) => {
    const memory = hardware.memory;
    const registers = hardware.cpu.registers;
    const original = registers.a;
    const value = memory.readByte(address);
    registers.a -= value;
    finalize(value, original, registers);
    registers.m = 2;
};
const subtractWithCarry = (value, registers) => {
    const original = registers.a;
    registers.a -= value;
    registers.a -= registers.flags & _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].CARRY ? 1 : 0;
    finalize(value, original, registers);
    registers.m = 1;
};
const subtractAddressWithCarry = (address, hardware) => {
    const registers = hardware.cpu.registers;
    const original = registers.a;
    const value = hardware.memory.readByte(address);
    registers.a -= value;
    registers.a -= registers.flags & _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].CARRY ? 1 : 0;
    finalize(value, original, registers);
    registers.m = 2;
};
const setSubtractFlags = (value, hardware) => {
    const registers = hardware.cpu.registers;
    const original = registers.a;
    setFlags(original - value, value, original, registers);
    registers.m = 1;
};
const setSubtractAddressFlags = (address, hardware) => {
    const registers = hardware.cpu.registers;
    const original = registers.a;
    const value = hardware.memory.readByte(address);
    setFlags(original - value, value, original, registers);
    registers.m = 2;
};
const SubtractOperators = {
    SubtractA: hardware => subtract(hardware.cpu.registers.a, hardware.cpu.registers),
    SubtractB: hardware => subtract(hardware.cpu.registers.b, hardware.cpu.registers),
    SubtractC: hardware => subtract(hardware.cpu.registers.c, hardware.cpu.registers),
    SubtractD: hardware => subtract(hardware.cpu.registers.d, hardware.cpu.registers),
    SubtractE: hardware => subtract(hardware.cpu.registers.e, hardware.cpu.registers),
    SubtractH: hardware => subtract(hardware.cpu.registers.h, hardware.cpu.registers),
    SubtractL: hardware => subtract(hardware.cpu.registers.l, hardware.cpu.registers),
    SubtractHLAddress: hardware => {
        const registers = hardware.cpu.registers;
        subtractAddress((registers.h << 8) + registers.l, hardware);
    },
    SubtractPCAddress: hardware => {
        const registers = hardware.cpu.registers;
        subtractAddress(registers.programCount++, hardware);
    },
    SubtractAWithCarry: hardware => subtractWithCarry(hardware.cpu.registers.a, hardware.cpu.registers),
    SubtractBWithCarry: hardware => subtractWithCarry(hardware.cpu.registers.b, hardware.cpu.registers),
    SubtractCWithCarry: hardware => subtractWithCarry(hardware.cpu.registers.c, hardware.cpu.registers),
    SubtractDWithCarry: hardware => subtractWithCarry(hardware.cpu.registers.d, hardware.cpu.registers),
    SubtractEWithCarry: hardware => subtractWithCarry(hardware.cpu.registers.e, hardware.cpu.registers),
    SubtractHWithCarry: hardware => subtractWithCarry(hardware.cpu.registers.h, hardware.cpu.registers),
    SubtractLWithCarry: hardware => subtractWithCarry(hardware.cpu.registers.l, hardware.cpu.registers),
    SubtractHLAddressWithCarry: hardware => {
        const registers = hardware.cpu.registers;
        subtractAddressWithCarry((registers.h << 8) + registers.l, hardware);
    },
    SubtractPCAddressWithCarry: hardware => {
        const registers = hardware.cpu.registers;
        subtractAddressWithCarry(registers.programCount++, hardware);
    },
    SetSubtractAFlags: hardware => setSubtractFlags(hardware.cpu.registers.a, hardware),
    SetSubtractBFlags: hardware => setSubtractFlags(hardware.cpu.registers.b, hardware),
    SetSubtractCFlags: hardware => setSubtractFlags(hardware.cpu.registers.c, hardware),
    SetSubtractDFlags: hardware => setSubtractFlags(hardware.cpu.registers.d, hardware),
    SetSubtractEFlags: hardware => setSubtractFlags(hardware.cpu.registers.e, hardware),
    SetSubtractHFlags: hardware => setSubtractFlags(hardware.cpu.registers.h, hardware),
    SetSubtractLFlags: hardware => setSubtractFlags(hardware.cpu.registers.l, hardware),
    SetSubtractHLAddressFlags: hardware => {
        const registers = hardware.cpu.registers;
        setSubtractAddressFlags((registers.h << 8) + registers.l, hardware);
    },
    SetSubtractPCAddressFlags: hardware => {
        const registers = hardware.cpu.registers;
        setSubtractAddressFlags(registers.programCount++, hardware);
    },
};


/***/ }),

/***/ "./src/Emulator/CPU/Operations/index.ts":
/*!**********************************************!*\
  !*** ./src/Emulator/CPU/Operations/index.ts ***!
  \**********************************************/
/*! exports provided: testMask, testZero, testCarry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testMask", function() { return testMask; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testZero", function() { return testZero; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testCarry", function() { return testCarry; });
/* harmony import */ var _Registers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Registers */ "./src/Emulator/CPU/Registers.ts");

const testMask = (value, mask) => (value & mask) !== 0;
const testZero = (hardware) => testMask(hardware.registers.flags, _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].ZERO);
const testCarry = (hardware) => testMask(hardware.registers.flags, _Registers__WEBPACK_IMPORTED_MODULE_0__["RegisterFlag"].CARRY);


/***/ }),

/***/ "./src/Emulator/CPU/Operations/mappings.ts":
/*!*************************************************!*\
  !*** ./src/Emulator/CPU/Operations/mappings.ts ***!
  \*************************************************/
/*! exports provided: toOpcodeMap, toCbcodeMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toOpcodeMap", function() { return toOpcodeMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toCbcodeMap", function() { return toCbcodeMap; });
const toOpcodeMap = (operators) => [
    // 0x00
    operators.Noop, operators.LoadPCAndNextIntoBC, operators.LoadAIntoBCAddress, operators.IncrementBC,
    operators.IncrementB, operators.DecrementB, operators.LoadPCToB_Advance, operators.RotateLeftAWithCarry,
    operators.LoadPCAndNextIntoSP, operators.AddBCToHL, operators.LoadBCAddressIntoA, operators.DecrementBC,
    operators.IncrementC, operators.DecrementC, operators.LoadPCToC_Advance, operators.RotateRightAWithCarry,
    // 0x10
    operators.RelativeJumpToPCAddressDecrementB, operators.LoadPCAndNextIntoDE, operators.LoadDEAddressIntoA, operators.IncrementDE,
    operators.IncrementD, operators.DecrementH, operators.LoadPCToD_Advance, operators.RotateLeftA,
    operators.RelativeJumpToPCAddress, operators.AddDEToHL, operators.LoadDEAddressIntoA, operators.DecrementDE,
    operators.IncrementE, operators.DecrementE, operators.LoadPCToE_Advance, operators.RotateRightA,
    // 0x20
    operators.RelativeJumpToPCAddressIfNotZero, operators.LoadPCAndNextIntoHL, operators.LoadAIntoHLAddressAndIncrement, operators.IncrementHL,
    operators.IncrementH, operators.DecrementH, operators.LoadPCToH_Advance, operators.BCDCorrect,
    operators.RelativeJumpToPCAddressIfZero, operators.AddHLToHL, operators.LoadHLAddressIntoAAndIncrement, operators.DecrementHL,
    operators.IncrementL, operators.DecrementL, operators.LoadPCToL_Advance, operators.InvertA,
    // 0x30
    operators.RelativeJumpToPCAddressIfNotCarry, operators.LoadPCAndNextIntoSP, operators.LoadAIntoHLAddressAndDecrement, operators.IncrementSP,
    operators.IncrementHLAddress, operators.DecrementHLAddress, operators.LoadPCIntoHLAddress, operators.SetCarryFlag,
    operators.RelativeJumpToPCAddressIfCarry, operators.AddSPToHL, operators.LoadHLAddressIntoAAndDecrement, operators.DecrementSP,
    operators.IncrementA, operators.DecrementA, operators.LoadPCToA_Advance, operators.InvertCarryFlag,
    // 0x40
    operators.LoadRegBB, operators.LoadRegBC, operators.LoadRegBD, operators.LoadRegBE,
    operators.LoadRegBH, operators.LoadRegBL, operators.LoadHLAddressIntoB, operators.LoadRegBA,
    operators.LoadRegCB, operators.LoadRegCC, operators.LoadRegCD, operators.LoadRegCE,
    operators.LoadRegCH, operators.LoadRegCL, operators.LoadHLAddressIntoC, operators.LoadRegCA,
    // 0x50
    operators.LoadRegDB, operators.LoadRegDC, operators.LoadRegDD, operators.LoadRegDE,
    operators.LoadRegDH, operators.LoadRegDL, operators.LoadHLAddressIntoD, operators.LoadRegDA,
    operators.LoadRegEB, operators.LoadRegEC, operators.LoadRegED, operators.LoadRegEE,
    operators.LoadRegEH, operators.LoadRegEL, operators.LoadHLAddressIntoE, operators.LoadRegEA,
    // 0x60
    operators.LoadRegHB, operators.LoadRegHC, operators.LoadRegHD, operators.LoadRegHE,
    operators.LoadRegHH, operators.LoadRegHL, operators.LoadHLAddressIntoH, operators.LoadRegHA,
    operators.LoadRegLB, operators.LoadRegLC, operators.LoadRegLD, operators.LoadRegLE,
    operators.LoadRegLH, operators.LoadRegLL, operators.LoadHLAddressIntoL, operators.LoadRegLA,
    // 0x70
    operators.LoadBIntoHLAddress, operators.LoadCIntoHLAddress, operators.LoadDIntoHLAddress, operators.LoadEIntoHLAddress,
    operators.LoadHIntoHLAddress, operators.LoadLIntoHLAddress, operators.Halt, operators.LoadAIntoHLAddress,
    operators.LoadRegAB, operators.LoadRegAC, operators.LoadRegAD, operators.LoadRegAE,
    operators.LoadRegAH, operators.LoadRegAL, operators.LoadHLAddressIntoA, operators.LoadRegAA,
    // 0x80
    operators.AddB, operators.AddC, operators.AddD, operators.AddE,
    operators.AddH, operators.AddL, operators.AddHLAddress, operators.AddA,
    operators.AddBWithCarry, operators.AddCWithCarry, operators.AddDWithCarry, operators.AddEWithCarry,
    operators.AddHWithCarry, operators.AddLWithCarry, operators.AddHLAddressWithCarry, operators.AddAWithCarry,
    // 0x90
    operators.SubtractB, operators.SubtractC, operators.SubtractD, operators.SubtractE,
    operators.SubtractH, operators.SubtractL, operators.SubtractHLAddress, operators.SubtractA,
    operators.SubtractBWithCarry, operators.SubtractCWithCarry, operators.SubtractDWithCarry, operators.SubtractEWithCarry,
    operators.SubtractHWithCarry, operators.SubtractLWithCarry, operators.SubtractHLAddressWithCarry, operators.SubtractAWithCarry,
    // 0xA0
    operators.BitAndB, operators.BitAndC, operators.BitAndD, operators.BitAndE,
    operators.BitAndH, operators.BitAndL, operators.BitAndHLAddress, operators.BitAndA,
    operators.BitXorB, operators.BitXorC, operators.BitXorD, operators.BitXorE,
    operators.BitXorH, operators.BitXorL, operators.BitXorHLAddress, operators.BitXorA,
    // 0xB0
    operators.BitOrB, operators.BitOrC, operators.BitOrD, operators.BitOrD,
    operators.BitOrH, operators.BitOrL, operators.BitOrHLAddress, operators.BitOrA,
    operators.SetSubtractBFlags, operators.SetSubtractCFlags, operators.SetSubtractDFlags, operators.SetSubtractEFlags,
    operators.SetSubtractHFlags, operators.SetSubtractLFlags, operators.SetSubtractHLAddressFlags, operators.SetSubtractAFlags,
    // 0xC0
    operators.ReturnIfNotZero, operators.PopBC, operators.AbsoluteJumpToPCAddressIfNotZero, operators.AbsoluteJumpToPCAddress,
    operators.LabelJumpPCAddressIfNotZero, operators.PushBC, operators.AddPCAddress, operators.Interrupt00,
    operators.ReturnIfZero, operators.Return, operators.AbsoluteJumpToPCAddressIfZero, operators.ExtraOperators,
    operators.LabelJumpPCAddressIfZero, operators.LabelJumpPCAddress, operators.AddPCAddressWithCarry, operators.Interrupt08,
    // 0xD0
    operators.ReturnIfNotCarry, operators.PopDE, operators.AbsoluteJumpToPCAddressIfNotCarry, operators.NoImpl,
    operators.LabelJumpPCAddressIfNotCarry, operators.PishDE, operators.SubtractPCAddress, operators.Interrupt10,
    operators.ReturnIfCarry, operators.InterruptReturn, operators.AbsoluteJumpToPCAddressIfCarry, operators.NoImpl,
    operators.LabelJumpPCAddressIfCarry, operators.NoImpl, operators.SubtractPCAddressWithCarry, operators.Interrupt18,
    // 0xE0
    operators.LoadAIntoPCWithMagicAddress, operators.PopHL, operators.LoadAIntoCWithMagicAddress, operators.NoImpl,
    operators.NoImpl, operators.PushHL, operators.BitAndPCAddress, operators.Interrupt20,
    operators.AddPCAddressToSP, operators.AbsoluteJumpToHLAddress, operators.LoadAIntoPCAddress, operators.NoImpl,
    operators.NoImpl, operators.NoImpl, operators.BitXorPCAddress, operators.Interrupt28,
    // 0xF0
    operators.LoadPCWithMagicIntoA, operators.PopAF, operators.LoadCWithMagicAddressIntoA, operators.InterruptDisable,
    operators.NoImpl, operators.PushAF, operators.BitOrPCAddress, operators.Interrupt30,
    operators.SomeCrazyShitWithHLAndSP, operators.NoImpl, operators.LoadPCWordIntoA, operators.InterruptEnable,
    operators.NoImpl, operators.NoImpl, operators.SetSubtractPCAddressFlags, operators.Interrupt38,
];
const toCbcodeMap = (operators) => [
    // CB 0x00
    operators.RotateLeftBWithCarry, operators.RotateLeftCWithCarry, operators.RotateLeftDWithCarry, operators.RotateLeftEWithCarry,
    operators.RotateLeftHWithCarry, operators.RotateLeftLWithCarry, operators.RotateLeftHLAddressWithCarry, operators.RotateLeftHLAddressWithCarry,
    operators.RotateRightBWithCarry, operators.RotateRightCWithCarry, operators.RotateRightDWithCarry, operators.RotateRightEWithCarry,
    operators.RotateRightHLAddressWithCarry, operators.RotateRightLWithCarry, operators.RotateRightHLAddressWithCarry, operators.RotateRightAWithCarry,
    // CB 0x10
    operators.RotateLeftB, operators.RotateLeftC, operators.RotateLeftD, operators.RotateLeftE,
    operators.RotateLeftH, operators.RotateLeftL, operators.RotateLeftHLAddress, operators.RotateLeftA,
    operators.RotateRightB, operators.RotateRightC, operators.RotateRightD, operators.RotateRightE,
    operators.RotateRightH, operators.RotateRightL, operators.RotateRightHLAddress, operators.RotateRightA,
    // CB 0x20
    operators.ShiftLeftBArithmetic, operators.ShiftLeftCArithmetic, operators.ShiftLeftDArithmetic, operators.ShiftLeftEArithmetic,
    operators.ShiftLeftHArithmetic, operators.ShiftLeftLArithmetic, operators.NoImplExtra, operators.ShiftLeftAArithmetic,
    operators.ShiftRightBArithmetic, operators.ShiftRightCArithmetic, operators.ShiftRightDArithmetic, operators.ShiftRightEArithmetic,
    operators.ShiftRightHArithmetic, operators.ShiftRightLArithmetic, operators.NoImplExtra, operators.ShiftRightAArithmetic,
    // CB 0x30
    operators.SwapNibblesB, operators.SwapNibblesC, operators.SwapNibblesD, operators.SwapNibblesE,
    operators.SwapNibblesH, operators.SwapNibblesL, operators.NoImplExtra, operators.SwapNibblesA,
    operators.ShiftRightBLogical, operators.ShiftRightCLogical, operators.ShiftRightDLogical, operators.ShiftRightELogical,
    operators.ShiftRightHLogical, operators.ShiftRightLLogical, operators.NoImplExtra, operators.ShiftRightALogical,
    // CB 0x40
    operators.TestBBit0, operators.TestCBit0, operators.TestDBit0, operators.TestEBit0,
    operators.TestHBit0, operators.TestLBit0, operators.TestHLAddressBit0, operators.TestABit0,
    operators.TestBBit1, operators.TestCBit1, operators.TestDBit1, operators.TestEBit1,
    operators.TestHBit1, operators.TestLBit1, operators.TestHLAddressBit1, operators.TestABit1,
    // CB 0x50
    operators.TestBBit2, operators.TestCBit2, operators.TestDBit2, operators.TestEBit2,
    operators.TestHBit2, operators.TestLBit2, operators.TestHLAddressBit2, operators.TestABit2,
    operators.TestBBit3, operators.TestCBit3, operators.TestDBit3, operators.TestEBit3,
    operators.TestHBit3, operators.TestLBit3, operators.TestHLAddressBit3, operators.TestABit3,
    // CB 0x60
    operators.TestBBit4, operators.TestCBit4, operators.TestDBit4, operators.TestEBit4,
    operators.TestHBit4, operators.TestLBit4, operators.TestHLAddressBit4, operators.TestABit4,
    operators.TestBBit5, operators.TestCBit5, operators.TestDBit5, operators.TestEBit5,
    operators.TestHBit5, operators.TestLBit5, operators.TestHLAddressBit5, operators.TestABit5,
    // CB 0x70
    operators.TestBBit6, operators.TestCBit6, operators.TestDBit6, operators.TestEBit6,
    operators.TestHBit6, operators.TestLBit6, operators.TestHLAddressBit6, operators.TestABit6,
    operators.TestBBit7, operators.TestCBit7, operators.TestDBit7, operators.TestEBit7,
    operators.TestHBit7, operators.TestLBit7, operators.TestHLAddressBit7, operators.TestABit7,
    // CB 0x80
    operators.ResetBBit0, operators.ResetCBit0, operators.ResetDBit0, operators.ResetEBit0,
    operators.ResetHBit0, operators.ResetLBit0, operators.ResetHLAddressBit0, operators.ResetABit0,
    operators.ResetBBit1, operators.ResetCBit1, operators.ResetDBit1, operators.ResetEBit1,
    operators.ResetHBit1, operators.ResetLBit1, operators.ResetHLAddressBit1, operators.ResetABit1,
    // CB 0x90
    operators.ResetBBit2, operators.ResetCBit2, operators.ResetDBit2, operators.ResetEBit2,
    operators.ResetHBit2, operators.ResetLBit2, operators.ResetHLAddressBit2, operators.ResetABit2,
    operators.ResetBBit3, operators.ResetCBit3, operators.ResetDBit3, operators.ResetEBit3,
    operators.ResetHBit3, operators.ResetLBit3, operators.ResetHLAddressBit3, operators.ResetABit3,
    // CB 0xA0
    operators.ResetBBit4, operators.ResetCBit4, operators.ResetDBit4, operators.ResetEBit4,
    operators.ResetHBit4, operators.ResetLBit4, operators.ResetHLAddressBit4, operators.ResetABit4,
    operators.ResetBBit5, operators.ResetCBit5, operators.ResetDBit5, operators.ResetEBit5,
    operators.ResetHBit5, operators.ResetLBit5, operators.ResetHLAddressBit5, operators.ResetABit5,
    // CB 0xB0
    operators.ResetBBit6, operators.ResetCBit6, operators.ResetDBit6, operators.ResetEBit6,
    operators.ResetHBit6, operators.ResetLBit6, operators.ResetHLAddressBit6, operators.ResetABit6,
    operators.ResetBBit7, operators.ResetCBit7, operators.ResetDBit7, operators.ResetEBit7,
    operators.ResetHBit7, operators.ResetLBit7, operators.ResetHLAddressBit7, operators.ResetABit7,
    // CB 0xC0
    operators.SetBBit0, operators.SetCBit0, operators.SetDBit0, operators.SetEBit0,
    operators.SetHBit0, operators.SetLBit0, operators.SetHLAddressBit0, operators.SetABit0,
    operators.SetBBit1, operators.SetCBit1, operators.SetDBit1, operators.SetEBit1,
    operators.SetHBit1, operators.SetLBit1, operators.SetHLAddressBit1, operators.SetABit1,
    // CB 0xD0
    operators.SetBBit2, operators.SetCBit2, operators.SetDBit2, operators.SetEBit2,
    operators.SetHBit2, operators.SetLBit2, operators.SetHLAddressBit2, operators.SetABit2,
    operators.SetBBit3, operators.SetCBit3, operators.SetDBit3, operators.SetEBit3,
    operators.SetHBit3, operators.SetLBit3, operators.SetHLAddressBit3, operators.SetABit3,
    // CB 0xE0
    operators.SetBBit4, operators.SetCBit4, operators.SetDBit4, operators.SetEBit4,
    operators.SetHBit4, operators.SetLBit4, operators.SetHLAddressBit4, operators.SetABit4,
    operators.SetBBit5, operators.SetCBit5, operators.SetDBit5, operators.SetEBit5,
    operators.SetHBit5, operators.SetLBit5, operators.SetHLAddressBit5, operators.SetABit5,
    // CB 0xF0
    operators.SetBBit6, operators.SetCBit6, operators.SetDBit6, operators.SetEBit6,
    operators.SetHBit6, operators.SetLBit6, operators.SetHLAddressBit6, operators.SetABit6,
    operators.SetBBit7, operators.SetCBit7, operators.SetDBit7, operators.SetEBit7,
    operators.SetHBit7, operators.SetLBit7, operators.SetHLAddressBit7, operators.SetABit7,
];


/***/ }),

/***/ "./src/Emulator/CPU/Registers.ts":
/*!***************************************!*\
  !*** ./src/Emulator/CPU/Registers.ts ***!
  \***************************************/
/*! exports provided: RegisterFlag, RegisterSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterFlag", function() { return RegisterFlag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterSet", function() { return RegisterSet; });
/* harmony import */ var _Clock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Clock */ "./src/Emulator/CPU/Clock.ts");

var RegisterFlag;
(function (RegisterFlag) {
    RegisterFlag[RegisterFlag["CARRY"] = 16] = "CARRY";
    RegisterFlag[RegisterFlag["HALF_CARRY"] = 32] = "HALF_CARRY";
    RegisterFlag[RegisterFlag["OPERATION"] = 64] = "OPERATION";
    RegisterFlag[RegisterFlag["ZERO"] = 128] = "ZERO";
})(RegisterFlag || (RegisterFlag = {}));
class RegisterSet {
    constructor(clock) {
        this.clock = clock || new _Clock__WEBPACK_IMPORTED_MODULE_0__["Clock"]();
        this.reset();
    }
    reset() {
        this.a = 0;
        this.b = 0;
        this.c = 0;
        this.d = 0;
        this.e = 0;
        this.h = 0;
        this.l = 0;
        this.flags = 0;
        this.stackPointer = 0;
        this.programCount = 0;
        this.clock.reset();
    }
    get m() {
        return this.clock.m;
    }
    set m(value) {
        this.clock.m = value;
    }
    get t() {
        return this.clock.t;
    }
    set t(value) {
        this.clock.t = value;
    }
}


/***/ }),

/***/ "./src/Emulator/CPU/index.ts":
/*!***********************************!*\
  !*** ./src/Emulator/CPU/index.ts ***!
  \***********************************/
/*! exports provided: Cpu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cpu", function() { return Cpu; });
/* harmony import */ var _Clock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Clock */ "./src/Emulator/CPU/Clock.ts");
/* harmony import */ var _Operations_Add__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Operations/Add */ "./src/Emulator/CPU/Operations/Add.ts");
/* harmony import */ var _Operations_BitManipulation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Operations/BitManipulation */ "./src/Emulator/CPU/Operations/BitManipulation.ts");
/* harmony import */ var _Operations_Bitwise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Operations/Bitwise */ "./src/Emulator/CPU/Operations/Bitwise.ts");
/* harmony import */ var _Operations_Compare__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Operations/Compare */ "./src/Emulator/CPU/Operations/Compare.ts");
/* harmony import */ var _Operations_Decrement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Operations/Decrement */ "./src/Emulator/CPU/Operations/Decrement.ts");
/* harmony import */ var _Operations_Extra__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Operations/Extra */ "./src/Emulator/CPU/Operations/Extra.ts");
/* harmony import */ var _Operations_Increment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Operations/Increment */ "./src/Emulator/CPU/Operations/Increment.ts");
/* harmony import */ var _Operations_Interrupt__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Operations/Interrupt */ "./src/Emulator/CPU/Operations/Interrupt.ts");
/* harmony import */ var _Operations_Jump__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Operations/Jump */ "./src/Emulator/CPU/Operations/Jump.ts");
/* harmony import */ var _Operations_LoadStore__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Operations/LoadStore */ "./src/Emulator/CPU/Operations/LoadStore.ts");
/* harmony import */ var _Operations_mappings__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Operations/mappings */ "./src/Emulator/CPU/Operations/mappings.ts");
/* harmony import */ var _Operations_Return__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Operations/Return */ "./src/Emulator/CPU/Operations/Return.ts");
/* harmony import */ var _Operations_Stack__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Operations/Stack */ "./src/Emulator/CPU/Operations/Stack.ts");
/* harmony import */ var _Operations_Subtract__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Operations/Subtract */ "./src/Emulator/CPU/Operations/Subtract.ts");
/* harmony import */ var _Registers__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Registers */ "./src/Emulator/CPU/Registers.ts");
















class Cpu {
    constructor() {
        this.halt = false;
        this.stop = false;
        this.allowInterrupts = true;
        this.hardware = null;
        this.tickIntervalId = null;
        this.clock = new _Clock__WEBPACK_IMPORTED_MODULE_0__["Clock"]();
        this.registers = new _Registers__WEBPACK_IMPORTED_MODULE_15__["RegisterSet"]();
        this.operators = Object.assign({}, _Operations_Add__WEBPACK_IMPORTED_MODULE_1__["AddOperators"], _Operations_BitManipulation__WEBPACK_IMPORTED_MODULE_2__["BitManipulationOperators"], _Operations_Bitwise__WEBPACK_IMPORTED_MODULE_3__["BitwiseOperators"], _Operations_Compare__WEBPACK_IMPORTED_MODULE_4__["CompareOperators"], _Operations_Decrement__WEBPACK_IMPORTED_MODULE_5__["DecrementOperators"], _Operations_Extra__WEBPACK_IMPORTED_MODULE_6__["ExtraOperators"], _Operations_Increment__WEBPACK_IMPORTED_MODULE_7__["IncrementOperators"], _Operations_Interrupt__WEBPACK_IMPORTED_MODULE_8__["InterruptOperators"], _Operations_Jump__WEBPACK_IMPORTED_MODULE_9__["JumpOperators"], _Operations_LoadStore__WEBPACK_IMPORTED_MODULE_10__["LoadStoreOperators"], _Operations_Return__WEBPACK_IMPORTED_MODULE_12__["ReturnOperators"], _Operations_Stack__WEBPACK_IMPORTED_MODULE_13__["StackOperators"], _Operations_Subtract__WEBPACK_IMPORTED_MODULE_14__["SubtractOperators"]);
        this.interruptMap = {
            [_Operations_Interrupt__WEBPACK_IMPORTED_MODULE_8__["Interrupt"].VBLANK]: this.operators.Interrupt40,
            [_Operations_Interrupt__WEBPACK_IMPORTED_MODULE_8__["Interrupt"].LCD_STAT]: this.operators.Interrupt48,
            [_Operations_Interrupt__WEBPACK_IMPORTED_MODULE_8__["Interrupt"].TIMER]: this.operators.Interrupt50,
            [_Operations_Interrupt__WEBPACK_IMPORTED_MODULE_8__["Interrupt"].SERIAL]: this.operators.Interrupt58,
            [_Operations_Interrupt__WEBPACK_IMPORTED_MODULE_8__["Interrupt"].JOYPAD]: this.operators.Interrupt60,
        };
        this.opcodes = Object(_Operations_mappings__WEBPACK_IMPORTED_MODULE_11__["toOpcodeMap"])(this.operators);
        this.cbcodes = Object(_Operations_mappings__WEBPACK_IMPORTED_MODULE_11__["toCbcodeMap"])(this.operators);
    }
    setHardwareBus(hardware) {
        this.hardware = hardware;
    }
    step() {
        const op = this.hardware.memory.readByte(this.registers.programCount++);
        this.opcodes[op](this.hardware);
        this.registers.programCount &= 65535;
        this.clock.m += this.registers.m;
        this.hardware.gpu.step();
        const memory = this.hardware.memory;
        if (this.allowInterrupts && memory.interruptsEnabled && memory.interruptFlags) {
            this.halt = false;
            this.allowInterrupts = false;
            const interrupts = memory.interruptsEnabled & memory.interruptFlags;
            let fired = false;
            for (let key in this.interruptMap) {
                const mask = parseInt(key, 10);
                if (interrupts & mask) {
                    fired = true;
                    memory.interruptFlags ^= mask;
                    this.interruptMap[key](this.hardware);
                    break;
                }
            }
            if (!fired)
                this.allowInterrupts = true;
        }
    }
    exec() {
        this.halt = false;
        this.stop = false;
        this.tickIntervalId = setInterval(() => {
            const frameClock = this.clock.m + 17556;
            do {
                this.step();
                if (this.halt || this.stop) {
                    clearInterval(this.tickIntervalId);
                    this.tickIntervalId = null;
                }
            } while (this.clock.m < frameClock);
        }, 1);
    }
    reset() {
        this.clock.reset();
        this.registers.reset();
        this.halt = true;
        this.stop = false;
    }
}


/***/ }),

/***/ "./src/Emulator/GPU/Color.ts":
/*!***********************************!*\
  !*** ./src/Emulator/GPU/Color.ts ***!
  \***********************************/
/*! exports provided: Color, Palette */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return Color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Palette", function() { return Palette; });
class Color {
    constructor(data) {
        this.data = data;
    }
    get r() {
        return this.data[0];
    }
    set r(value) {
        this.data[0] = value;
    }
    get g() {
        return this.data[1];
    }
    set g(value) {
        this.data[1] = value;
    }
    get b() {
        return this.data[2];
    }
    set b(value) {
        this.data[2] = value;
    }
    get a() {
        return this.data[3];
    }
    set a(value) {
        this.data[3] = value;
    }
    static fromRGB(r, g, b, a) {
        return new Color([r, g, b, a]);
    }
}
class Palette {
    constructor() {
        this.reset();
    }
    get(index) {
        if (index < 0 || index > this.colors.length)
            throw new Error(`Invalid palette index: ${index}`);
        return this.colors[index];
    }
    reset() {
        this.colors = [
            Color.fromRGB(255, 255, 255, 255),
            Color.fromRGB(192, 192, 192, 255),
            Color.fromRGB(96, 96, 96, 255),
            Color.fromRGB(0, 0, 0, 255),
        ];
    }
}


/***/ }),

/***/ "./src/Emulator/GPU/index.ts":
/*!***********************************!*\
  !*** ./src/Emulator/GPU/index.ts ***!
  \***********************************/
/*! exports provided: RenderingMode, Gpu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderingMode", function() { return RenderingMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Gpu", function() { return Gpu; });
/* harmony import */ var _Color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Color */ "./src/Emulator/GPU/Color.ts");

/**
 * OAM_READ: 80 ticks
 * VRAM_READ: 172 ticks
 * HBLANK: 204 ticks
 *
 * Full line = OAM_READ + VRAM_READ + HBLANK = 456 ticks
 */
var RenderingMode;
(function (RenderingMode) {
    RenderingMode[RenderingMode["HBLANK"] = 0] = "HBLANK";
    RenderingMode[RenderingMode["VBLANK"] = 1] = "VBLANK";
    RenderingMode[RenderingMode["OAM_READ"] = 2] = "OAM_READ";
    RenderingMode[RenderingMode["VRAM_READ"] = 3] = "VRAM_READ";
})(RenderingMode || (RenderingMode = {}));
class Gpu {
    constructor(canvas) {
        this.scrollX = 0;
        this.scrollY = 0;
        this.bgMap = false;
        this.bgTile = 0;
        this.mode = RenderingMode.HBLANK;
        this.modeClock = 0;
        this.line = 0;
        this.hardware = null;
        this.canvas = canvas;
        this.palette = new _Color__WEBPACK_IMPORTED_MODULE_0__["Palette"]();
        this.reset();
    }
    updateTile(address, value) {
        address &= 0x1FFE;
        const tile = (address >> 4) & 511;
        const y = (address >> 1) & 7;
        let sx;
        for (let x = 0; x < 8; x++) {
            sx = 1 << (7 - x);
            this.tileset[tile][y][x] = (this.vram[address] & sx ? 1 : 0) | (this.vram[address + 1] & sx ? 2 : 0);
        }
    }
    updateOAM(address, value) {
    }
    step() {
        this.modeClock += this.hardware.cpu.registers.t;
        switch (this.mode) {
            case RenderingMode.OAM_READ:
                if (this.modeClock >= 80) {
                    this.modeClock = 0;
                    this.mode = RenderingMode.VRAM_READ;
                }
                break;
            case RenderingMode.VRAM_READ:
                if (this.modeClock >= 172) {
                    this.modeClock = 0;
                    this.mode = RenderingMode.HBLANK;
                    this.render();
                }
                break;
            case RenderingMode.HBLANK:
                if (this.modeClock >= 204) {
                    this.modeClock = 0;
                    if (++this.line === 143) {
                        this.mode = RenderingMode.VBLANK;
                        this.context.putImageData(this.screen, 0, 0);
                    }
                    else
                        this.mode = RenderingMode.OAM_READ;
                }
                break;
            case RenderingMode.VBLANK:
                if (this.modeClock >= 456) {
                    this.modeClock = 0;
                    if (++this.line > 153) {
                        this.mode = RenderingMode.OAM_READ;
                        this.line = 0;
                    }
                }
                break;
        }
    }
    reset() {
        this.palette.reset();
        this.vram = new Int16Array(1 << 13); // 8k
        this.oam = new Int16Array(160);
        this.context = this.canvas.getContext('2d');
        this.screen = this.context.createImageData(160, 144);
        this.context.putImageData(this.screen, 0, 0);
        this.tileset = [];
        for (let i = 0; i < 512; i++) {
            this.tileset.push([]);
            for (let j = 0; j < 8; j++)
                this.tileset[i].push((new Array(8).fill(0)));
        }
    }
    readByte(address) {
        console.log(address - 0xFF40);
        return 0;
    }
    writeByte(address, value) {
        console.log(address - 0xFF40);
    }
    setHardwareBus(hardware) {
        this.hardware = hardware;
    }
    render() {
        let mapOffset = this.bgMap ? 0x1C00 : 0x1800;
        mapOffset += ((this.line + this.scrollY) & 255) >> 3;
        let lineOffset = this.scrollX >> 3;
        let y = (this.line + this.scrollY) & 7;
        let x = this.scrollX & 7;
        let canvasOffset = this.line * 160 * 4;
        let tile = this.vram[mapOffset + lineOffset];
        if (this.bgTile === 1 && tile < 128)
            tile += 256;
        for (let i = 0; i < 160; i++) {
            let color = this.palette.get(this.tileset[tile][y][x]);
            this.screen.data[canvasOffset++] = color.r;
            this.screen.data[canvasOffset++] = color.g;
            this.screen.data[canvasOffset++] = color.b;
            this.screen.data[canvasOffset++] = color.a;
            if (++x === 8) {
                x = 0;
                lineOffset = (lineOffset + 1) & 31;
                tile = this.vram[mapOffset + lineOffset];
                if (this.bgTile === 1 && tile < 128)
                    tile += 256;
            }
        }
    }
}


/***/ }),

/***/ "./src/Emulator/Hardware.ts":
/*!**********************************!*\
  !*** ./src/Emulator/Hardware.ts ***!
  \**********************************/
/*! exports provided: HardwareBus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HardwareBus", function() { return HardwareBus; });
class HardwareBus {
    constructor(cpu, memory, gpu) {
        this.cpu = cpu;
        this.memory = memory;
        this.gpu = gpu;
    }
    get registers() {
        return this.cpu.registers;
    }
}


/***/ }),

/***/ "./src/Emulator/Memory/Bios.ts":
/*!*************************************!*\
  !*** ./src/Emulator/Memory/Bios.ts ***!
  \*************************************/
/*! exports provided: bios */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bios", function() { return bios; });
const bios = [
    0x31, 0xFE, 0xFF, 0xAF, 0x21, 0xFF, 0x9F, 0x32, 0xCB, 0x7C, 0x20, 0xFB, 0x21, 0x26, 0xFF, 0x0E,
    0x11, 0x3E, 0x80, 0x32, 0xE2, 0x0C, 0x3E, 0xF3, 0xE2, 0x32, 0x3E, 0x77, 0x77, 0x3E, 0xFC, 0xE0,
    0x47, 0x11, 0x04, 0x01, 0x21, 0x10, 0x80, 0x1A, 0xCD, 0x95, 0x00, 0xCD, 0x96, 0x00, 0x13, 0x7B,
    0xFE, 0x34, 0x20, 0xF3, 0x11, 0xD8, 0x00, 0x06, 0x08, 0x1A, 0x13, 0x22, 0x23, 0x05, 0x20, 0xF9,
    0x3E, 0x19, 0xEA, 0x10, 0x99, 0x21, 0x2F, 0x99, 0x0E, 0x0C, 0x3D, 0x28, 0x08, 0x32, 0x0D, 0x20,
    0xF9, 0x2E, 0x0F, 0x18, 0xF3, 0x67, 0x3E, 0x64, 0x57, 0xE0, 0x42, 0x3E, 0x91, 0xE0, 0x40, 0x04,
    0x1E, 0x02, 0x0E, 0x0C, 0xF0, 0x44, 0xFE, 0x90, 0x20, 0xFA, 0x0D, 0x20, 0xF7, 0x1D, 0x20, 0xF2,
    0x0E, 0x13, 0x24, 0x7C, 0x1E, 0x83, 0xFE, 0x62, 0x28, 0x06, 0x1E, 0xC1, 0xFE, 0x64, 0x20, 0x06,
    0x7B, 0xE2, 0x0C, 0x3E, 0x87, 0xF2, 0xF0, 0x42, 0x90, 0xE0, 0x42, 0x15, 0x20, 0xD2, 0x05, 0x20,
    0x4F, 0x16, 0x20, 0x18, 0xCB, 0x4F, 0x06, 0x04, 0xC5, 0xCB, 0x11, 0x17, 0xC1, 0xCB, 0x11, 0x17,
    0x05, 0x20, 0xF5, 0x22, 0x23, 0x22, 0x23, 0xC9, 0xCE, 0xED, 0x66, 0x66, 0xCC, 0x0D, 0x00, 0x0B,
    0x03, 0x73, 0x00, 0x83, 0x00, 0x0C, 0x00, 0x0D, 0x00, 0x08, 0x11, 0x1F, 0x88, 0x89, 0x00, 0x0E,
    0xDC, 0xCC, 0x6E, 0xE6, 0xDD, 0xDD, 0xD9, 0x99, 0xBB, 0xBB, 0x67, 0x63, 0x6E, 0x0E, 0xEC, 0xCC,
    0xDD, 0xDC, 0x99, 0x9F, 0xBB, 0xB9, 0x33, 0x3E, 0x3c, 0x42, 0xB9, 0xA5, 0xB9, 0xA5, 0x42, 0x4C,
    0x21, 0x04, 0x01, 0x11, 0xA8, 0x00, 0x1A, 0x13, 0xBE, 0x20, 0xFE, 0x23, 0x7D, 0xFE, 0x34, 0x20,
    0xF5, 0x06, 0x19, 0x78, 0x86, 0x23, 0x05, 0x20, 0xFB, 0x86, 0x20, 0xFE, 0x3E, 0x01, 0xE0, 0x50,
];


/***/ }),

/***/ "./src/Emulator/Memory/index.ts":
/*!**************************************!*\
  !*** ./src/Emulator/Memory/index.ts ***!
  \**************************************/
/*! exports provided: Memory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Memory", function() { return Memory; });
/* harmony import */ var _Bios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bios */ "./src/Emulator/Memory/Bios.ts");

class Memory {
    constructor() {
        this.inBios = true;
        this.hardware = null;
        this.bios = _Bios__WEBPACK_IMPORTED_MODULE_0__["bios"];
        this.reset();
    }
    readByte(address) {
        const masked = address & 0xF000;
        if (masked === 0x0000) { // BIOS / High ROM0
            if (this.inBios) {
                if (address < 0x0100)
                    return this.bios[address];
                else if (this.hardware.cpu.registers.programCount === 0x0100)
                    this.inBios = false;
            }
            return this.rom[address];
        }
        else if (masked <= 0x7000) // ROM0 / ROM1 (unbanked)
            return this.rom[address];
        else if (masked <= 0x9000) // Video RAM
            return this.hardware.gpu.vram[address & 0x1FFF];
        else if (masked <= 0xB000) // External RAM
            return this.eram[address & 0x1FFF];
        else if (masked <= 0xFD00) // Working RAM and WRAM shadow
            return this.wram[address & 0x1FFF];
        else {
            const lowMasked = address & 0x0F00;
            if (lowMasked === 0xE00) { // Graphics object attribute memory (OAM)
                if (address < 0xFEA0)
                    return this.hardware.gpu.oam[address & 0xFF];
                else
                    return 0;
            }
            else if (lowMasked === 0xF00) { // Zero-page RAM
                if (address === 0xFFFF)
                    return this.interruptsEnabled;
                if (address >= 0xFF80)
                    return this.zram[address & 0x7F];
                else {
                    const ioMasked = address & 0xF0;
                    if (ioMasked === 0x00) {
                        const handlerMask = ioMasked & 0xF;
                        if (handlerMask === 0)
                            throw new Error('KEY not yet implemented');
                        else if (handlerMask >= 4 && handlerMask <= 7)
                            throw new Error('TIMER not yet implemented');
                        else if (handlerMask === 15)
                            return this.interruptFlags;
                        else
                            return 0;
                    }
                    else if (ioMasked >= 0x40 && ioMasked <= 0x70)
                        return this.hardware.gpu.readByte(address);
                    else
                        return 0;
                }
            }
        }
    }
    readWord(address) {
        return this.readByte(address) + (this.readByte(address + 1) << 8);
    }
    writeByte(address, value) {
        const masked = address & 0xF000;
        if (masked <= 0x7000) // ROM is not writable
            return;
        else if (masked <= 0x9000) { // Video RAM
            const mapped = address & 0x1FFF;
            this.hardware.gpu.vram[mapped] = value;
            this.hardware.gpu.updateTile(mapped, value); // TODO this may need to be the full address, not the mapped one
        }
        else if (masked <= 0xB000) // External RAM
            this.eram[address & 0x1FFF] = value;
        else if (masked <= 0xFD000) // Working RAM / WRAM shadow
            this.wram[address & 0x1FFF] = value;
        else {
            const lowMasked = address & 0x0F00;
            if (lowMasked === 0xE00) {
                const mapped = address & 0xFF;
                if (mapped < 0xA0)
                    return;
                this.hardware.gpu.updateOAM(mapped, value);
            }
            else if (lowMasked === 0xF00) { // Zero-page RAM
                if (address === 0xFFFF)
                    this.interruptsEnabled = value;
                else if (address >= 0xFF80)
                    this.zram[address & 0x7F] = value;
                else {
                    const ioMasked = address & 0xF0;
                    if (ioMasked === 0x00) {
                        const handlerMask = ioMasked & 0xF;
                        if (handlerMask === 0)
                            throw new Error('KEY not yet implemented');
                        else if (handlerMask >= 4 && handlerMask <= 7)
                            throw new Error('TIMER not yet implemented');
                        else if (handlerMask === 15)
                            this.interruptFlags = value;
                    }
                    else if (ioMasked >= 0x40 && ioMasked <= 0x70)
                        this.hardware.gpu.writeByte(address, value);
                }
            }
        }
    }
    writeWord(address, value) {
        this.writeByte(address, value & 255);
        this.writeByte(address + 1, value >> 8);
    }
    setHardwareBus(hardware) {
        this.hardware = hardware;
    }
    load(file) {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.addEventListener('load', () => {
                this.rom = reader.result.split('').map((char) => char.charCodeAt(0));
                resolve(reader);
            });
            reader.addEventListener('error', () => reject(reader.error));
            reader.addEventListener('abort', () => reject(null));
            reader.readAsBinaryString(file);
        });
    }
    reset() {
        this.inBios = true;
        this.rom = (new Array(1 << 15)).fill(0); // 32k
        this.eram = (new Array(1 << 13)).fill(0); // 8k
        this.wram = (new Array(1 << 13)).fill(0); // 8k
        this.zram = (new Array(128)).fill(0); // 128b
        this.interruptsEnabled = 0;
        this.interruptFlags = 0;
    }
}


/***/ }),

/***/ "./src/Monitor.ts":
/*!************************!*\
  !*** ./src/Monitor.ts ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Monitor; });
const registerKeys = ['a', 'b', 'c', 'd', 'e', 'h', 'l', 'flags', 'programCount', 'stackPointer', 'm', 't'];
class RegisterMonitor {
    static update() {
        if (!this.attached)
            return;
        Object.keys(this.elements).forEach(key => {
            if (!this.elements[key])
                return;
            let value = this.registers[key].toString(16);
            if (value.length < 2)
                value = `0${value}`;
            this.elements[key].textContent = '0x' + value;
        });
    }
    static attach(root, registers) {
        registerKeys.forEach(key => {
            this.elements[key] = root.querySelector(`#register-${key}`);
        });
        this.attached = true;
        this.registers = registers;
    }
}
RegisterMonitor.attached = false;
RegisterMonitor.registers = null;
RegisterMonitor.elements = {};
class Monitor {
    static attach(root, hardware) {
        RegisterMonitor.attach(root.querySelector('#registers'), hardware.registers);
        this.updateIntervalId = setInterval(() => {
            RegisterMonitor.update();
        });
    }
}
Monitor.updateIntervalId = null;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Emulator_CPU_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Emulator/CPU/index */ "./src/Emulator/CPU/index.ts");
/* harmony import */ var _Emulator_GPU_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Emulator/GPU/index */ "./src/Emulator/GPU/index.ts");
/* harmony import */ var _Emulator_Hardware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Emulator/Hardware */ "./src/Emulator/Hardware.ts");
/* harmony import */ var _Emulator_Memory_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Emulator/Memory/index */ "./src/Emulator/Memory/index.ts");
/* harmony import */ var _Monitor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Monitor */ "./src/Monitor.ts");





const cpu = new _Emulator_CPU_index__WEBPACK_IMPORTED_MODULE_0__["Cpu"]();
const memory = new _Emulator_Memory_index__WEBPACK_IMPORTED_MODULE_3__["Memory"]();
const gpu = new _Emulator_GPU_index__WEBPACK_IMPORTED_MODULE_1__["Gpu"](document.getElementById('screen'));
const hardware = new _Emulator_Hardware__WEBPACK_IMPORTED_MODULE_2__["HardwareBus"](cpu, memory, gpu);
cpu.setHardwareBus(hardware);
memory.setHardwareBus(hardware);
gpu.setHardwareBus(hardware);
_Monitor__WEBPACK_IMPORTED_MODULE_4__["default"].attach(document.querySelector('#monitor'), hardware);
const romLoader = document.getElementById('rom-loader');
romLoader.addEventListener('change', () => {
    gpu.reset();
    memory.reset();
    cpu.reset();
    cpu.halt = true;
    if (!romLoader.files.length)
        return;
    memory.load(romLoader.files[0]).then(() => cpu.exec());
});


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map