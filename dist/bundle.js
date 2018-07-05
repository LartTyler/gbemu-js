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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Clock = /** @class */ (function () {
    function Clock() {
        this.t = 0;
        this._m = 0;
    }
    Object.defineProperty(Clock.prototype, "m", {
        get: function () {
            return this._m;
        },
        set: function (value) {
            this._m = value;
            this.t = value * 4;
        },
        enumerable: true,
        configurable: true
    });
    Clock.prototype.reset = function () {
        this.m = 0;
    };
    return Clock;
}());
exports.Clock = Clock;


/***/ }),

/***/ "./src/Emulator/CPU/InstructionSet/Operators/Load.ts":
/*!***********************************************************!*\
  !*** ./src/Emulator/CPU/InstructionSet/Operators/Load.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(/*! ../index */ "./src/Emulator/CPU/InstructionSet/index.ts");
var loadRegisterIntoRegister = function (source, destination, hardware) {
    var registers = hardware.registers;
    registers[destination] = registers[source];
    registers.m = 1;
};
var loadByteIntoRegister = function (address, destination, hardware) {
    var memory = hardware.memory, registers = hardware.registers;
    registers[destination] = memory.readByte(address);
    registers.m = 2;
};
exports.LoadOperators = [
    new index_1.Operator('LoadRegisterBIntoA', 0x78, function (hardware) { return loadRegisterIntoRegister('b', 'a', hardware); }),
    new index_1.Operator('LoadRegisterCIntoA', 0x79, function (hardware) { return loadRegisterIntoRegister('c', 'a', hardware); }),
    new index_1.Operator('LoadRegisterDIntoA', 0x7A, function (hardware) { return loadRegisterIntoRegister('d', 'a', hardware); }),
    new index_1.Operator('LoadRegisterEIntoA', 0x7B, function (hardware) { return loadRegisterIntoRegister('e', 'a', hardware); }),
    new index_1.Operator('LoadRegisterHIntoA', 0x7C, function (hardware) { return loadRegisterIntoRegister('h', 'a', hardware); }),
    new index_1.Operator('LoadRegisterLIntoA', 0x7D, function (hardware) { return loadRegisterIntoRegister('l', 'a', hardware); }),
    new index_1.Operator('LoadRegisterAIntoA', 0x7F, function (hardware) { return loadRegisterIntoRegister('a', 'a', hardware); }),
];


/***/ }),

/***/ "./src/Emulator/CPU/InstructionSet/index.ts":
/*!**************************************************!*\
  !*** ./src/Emulator/CPU/InstructionSet/index.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Load_1 = __webpack_require__(/*! ./Operators/Load */ "./src/Emulator/CPU/InstructionSet/Operators/Load.ts");
var Operator = /** @class */ (function () {
    function Operator(name, opcode, callback) {
        this.name = name;
        this.opcode = opcode;
        this.callback = callback;
    }
    Operator.prototype.invoke = function (hardware) {
        this.callback(hardware);
    };
    return Operator;
}());
exports.Operator = Operator;
var Manager = /** @class */ (function () {
    /**
     * Manager constructor.
     */
    function Manager() {
        this.operators = {};
        this.opcodes = [];
        this.opcodes = new Array(256);
    }
    /**
     * @param {string} name
     * @return {OperatorInterface | null}
     */
    Manager.prototype.getByName = function (name) {
        return this.operators[name] || null;
    };
    /**
     * @param {number} opcode
     * @return {OperatorInterface | null}
     */
    Manager.prototype.getByCode = function (opcode) {
        return this.opcodes[opcode] || null;
    };
    /**
     * @param {OperatorInterface} operator
     * @return {Manager}
     */
    Manager.prototype.register = function (operator) {
        this.operators[operator.name] = operator;
        this.operators[operator.opcode] = operator;
        return this;
    };
    /**
     * @param {OperatorInterface[]} operators
     * @return {Manager}
     */
    Manager.prototype.registerAll = function (operators) {
        operators.forEach(this.register);
        return this;
    };
    /**
     * @param {OperatorInterface} operator
     * @return {Manager}
     */
    Manager.prototype.deregister = function (operator) {
        delete this.operators[operator.name];
        delete this.opcodes[operator.opcode];
        return this;
    };
    return Manager;
}());
exports.PrimaryInstructions = new Manager();
exports.BitInstructions = new Manager();
exports.PrimaryInstructions.registerAll(Load_1.LoadOperators.slice());


/***/ }),

/***/ "./src/Emulator/CPU/Registers.ts":
/*!***************************************!*\
  !*** ./src/Emulator/CPU/Registers.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Clock_1 = __webpack_require__(/*! ./Clock */ "./src/Emulator/CPU/Clock.ts");
var RegisterFlag;
(function (RegisterFlag) {
    RegisterFlag[RegisterFlag["CARRY"] = 16] = "CARRY";
    RegisterFlag[RegisterFlag["HALF_CARRY"] = 32] = "HALF_CARRY";
    RegisterFlag[RegisterFlag["OPERATION"] = 64] = "OPERATION";
    RegisterFlag[RegisterFlag["ZERO"] = 128] = "ZERO";
})(RegisterFlag = exports.RegisterFlag || (exports.RegisterFlag = {}));
var RegisterSet = /** @class */ (function () {
    function RegisterSet(clock) {
        this.clock = clock || new Clock_1.Clock();
        this.reset();
    }
    RegisterSet.prototype.reset = function () {
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
    };
    Object.defineProperty(RegisterSet.prototype, "m", {
        get: function () {
            return this.clock.m;
        },
        set: function (value) {
            this.clock.m = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterSet.prototype, "t", {
        get: function () {
            return this.clock.t;
        },
        set: function (value) {
            this.clock.t = value;
        },
        enumerable: true,
        configurable: true
    });
    return RegisterSet;
}());
exports.RegisterSet = RegisterSet;


/***/ }),

/***/ "./src/Emulator/CPU/index.ts":
/*!***********************************!*\
  !*** ./src/Emulator/CPU/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(/*! ../util */ "./src/Emulator/util.ts");
var Clock_1 = __webpack_require__(/*! ./Clock */ "./src/Emulator/CPU/Clock.ts");
var InstructionSet_1 = __webpack_require__(/*! ./InstructionSet */ "./src/Emulator/CPU/InstructionSet/index.ts");
var Registers_1 = __webpack_require__(/*! ./Registers */ "./src/Emulator/CPU/Registers.ts");
var Cpu = /** @class */ (function () {
    function Cpu() {
        this.halt = false;
        this.stop = false;
        this.allowInterrupts = true;
        this.hardware = null;
        this.tickIntervalId = null;
        this.clock = new Clock_1.Clock();
        this.registers = new Registers_1.RegisterSet();
    }
    Cpu.prototype.setHardwareBus = function (hardware) {
        this.hardware = hardware;
    };
    Cpu.prototype.step = function () {
        var opcode = this.hardware.memory.readByte(this.registers.programCount++);
        var operator = InstructionSet_1.PrimaryInstructions.getByCode(opcode);
        this.registers.programCount &= 65535;
        if (!operator)
            throw new Error("Instruction " + util_1.toHex(opcode) + " is not implemented (at " + ((this.registers.programCount - 1) & 65535));
        operator.invoke(this.hardware);
        this.clock.m += this.registers.m;
        this.hardware.gpu.step();
        var memory = this.hardware.memory;
        if (this.allowInterrupts && memory.interruptsEnabled && memory.interruptFlags) {
            this.halt = false;
            this.allowInterrupts = false;
            // const interrupts = memory.interruptsEnabled & memory.interruptFlags;
            var fired = false;
            // TODO Add interrupt handling
            if (!fired)
                this.allowInterrupts = true;
        }
    };
    Cpu.prototype.exec = function () {
        var _this = this;
        this.halt = false;
        this.stop = false;
        this.tickIntervalId = setInterval(function () {
            var frameClock = _this.clock.m + 17556;
            do {
                _this.step();
                if (_this.halt || _this.stop) {
                    clearInterval(_this.tickIntervalId);
                    _this.tickIntervalId = null;
                }
            } while (_this.clock.m < frameClock);
        }, 1);
    };
    Cpu.prototype.reset = function () {
        this.clock.reset();
        this.registers.reset();
        this.halt = true;
        this.stop = false;
    };
    return Cpu;
}());
exports.Cpu = Cpu;


/***/ }),

/***/ "./src/Emulator/GPU/Color.ts":
/*!***********************************!*\
  !*** ./src/Emulator/GPU/Color.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Color = /** @class */ (function () {
    function Color(data) {
        this.data = data;
    }
    Object.defineProperty(Color.prototype, "r", {
        get: function () {
            return this.data[0];
        },
        set: function (value) {
            this.data[0] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "g", {
        get: function () {
            return this.data[1];
        },
        set: function (value) {
            this.data[1] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "b", {
        get: function () {
            return this.data[2];
        },
        set: function (value) {
            this.data[2] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "a", {
        get: function () {
            return this.data[3];
        },
        set: function (value) {
            this.data[3] = value;
        },
        enumerable: true,
        configurable: true
    });
    Color.fromRGB = function (r, g, b, a) {
        return new Color([r, g, b, a]);
    };
    return Color;
}());
exports.Color = Color;
var Palette = /** @class */ (function () {
    function Palette() {
        this.reset();
    }
    Palette.prototype.get = function (index) {
        if (index < 0 || index > this.colors.length)
            throw new Error("Invalid palette index: " + index);
        return this.colors[index];
    };
    Palette.prototype.reset = function () {
        this.colors = [
            Color.fromRGB(255, 255, 255, 255),
            Color.fromRGB(192, 192, 192, 255),
            Color.fromRGB(96, 96, 96, 255),
            Color.fromRGB(0, 0, 0, 255),
        ];
    };
    return Palette;
}());
exports.Palette = Palette;


/***/ }),

/***/ "./src/Emulator/GPU/index.ts":
/*!***********************************!*\
  !*** ./src/Emulator/GPU/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Color_1 = __webpack_require__(/*! ./Color */ "./src/Emulator/GPU/Color.ts");
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
})(RenderingMode = exports.RenderingMode || (exports.RenderingMode = {}));
var Gpu = /** @class */ (function () {
    function Gpu(canvas) {
        this.scrollX = 0;
        this.scrollY = 0;
        this.bgMap = false;
        this.bgTile = 0;
        this.mode = RenderingMode.HBLANK;
        this.modeClock = 0;
        this.line = 0;
        this.hardware = null;
        this.canvas = canvas;
        this.palette = new Color_1.Palette();
        this.reset();
    }
    Gpu.prototype.updateTile = function (address, value) {
        address &= 0x1FFE;
        var tile = (address >> 4) & 511;
        var y = (address >> 1) & 7;
        var sx;
        for (var x = 0; x < 8; x++) {
            sx = 1 << (7 - x);
            this.tileset[tile][y][x] = (this.vram[address] & sx ? 1 : 0) | (this.vram[address + 1] & sx ? 2 : 0);
        }
    };
    Gpu.prototype.updateOAM = function (address, value) {
    };
    Gpu.prototype.step = function () {
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
    };
    Gpu.prototype.reset = function () {
        this.palette.reset();
        this.vram = new Int16Array(1 << 13); // 8k
        this.oam = new Int16Array(160);
        this.context = this.canvas.getContext('2d');
        this.screen = this.context.createImageData(160, 144);
        this.context.putImageData(this.screen, 0, 0);
        this.tileset = [];
        for (var i = 0; i < 512; i++) {
            this.tileset.push([]);
            for (var j = 0; j < 8; j++)
                this.tileset[i].push((new Array(8).fill(0)));
        }
    };
    Gpu.prototype.readByte = function (address) {
        console.log(address - 0xFF40);
        return 0;
    };
    Gpu.prototype.writeByte = function (address, value) {
        console.log(address - 0xFF40);
    };
    Gpu.prototype.setHardwareBus = function (hardware) {
        this.hardware = hardware;
    };
    Gpu.prototype.render = function () {
        var mapOffset = this.bgMap ? 0x1C00 : 0x1800;
        mapOffset += ((this.line + this.scrollY) & 255) >> 3;
        var lineOffset = this.scrollX >> 3;
        var y = (this.line + this.scrollY) & 7;
        var x = this.scrollX & 7;
        var canvasOffset = this.line * 160 * 4;
        var tile = this.vram[mapOffset + lineOffset];
        if (this.bgTile === 1 && tile < 128)
            tile += 256;
        for (var i = 0; i < 160; i++) {
            var color = this.palette.get(this.tileset[tile][y][x]);
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
    };
    return Gpu;
}());
exports.Gpu = Gpu;


/***/ }),

/***/ "./src/Emulator/Hardware.ts":
/*!**********************************!*\
  !*** ./src/Emulator/Hardware.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HardwareBus = /** @class */ (function () {
    function HardwareBus(cpu, memory, gpu) {
        this.cpu = cpu;
        this.memory = memory;
        this.gpu = gpu;
    }
    Object.defineProperty(HardwareBus.prototype, "registers", {
        get: function () {
            return this.cpu.registers;
        },
        enumerable: true,
        configurable: true
    });
    return HardwareBus;
}());
exports.HardwareBus = HardwareBus;


/***/ }),

/***/ "./src/Emulator/Memory/Bios.ts":
/*!*************************************!*\
  !*** ./src/Emulator/Memory/Bios.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.bios = [
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Bios_1 = __webpack_require__(/*! ./Bios */ "./src/Emulator/Memory/Bios.ts");
var Memory = /** @class */ (function () {
    function Memory() {
        this.inBios = true;
        this.hardware = null;
        this.bios = Bios_1.bios;
        this.reset();
    }
    Memory.prototype.readByte = function (address) {
        var masked = address & 0xF000;
        if (masked === 0x0000) { // BIOS / High ROM0
            if (this.inBios) {
                if (address < 0x0100)
                    return this.bios[address];
                else if (this.hardware.cpu.registers.programCount >= 0x0100)
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
            var lowMasked = address & 0x0F00;
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
                    var ioMasked = address & 0xF0;
                    if (ioMasked === 0x00) {
                        var handlerMask = ioMasked & 0xF;
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
    };
    Memory.prototype.readWord = function (address) {
        return this.readByte(address) + (this.readByte(address + 1) << 8);
    };
    Memory.prototype.writeByte = function (address, value) {
        var masked = address & 0xF000;
        if (masked <= 0x7000) // BIOS and ROM are not writable
            throw new Error("Tried to write BIOS or ROM (0x" + address.toString(16).toUpperCase() + ")");
        else if (masked <= 0x9000) { // Video RAM
            var mapped = address & 0x1FFF;
            this.hardware.gpu.vram[mapped] = value;
            this.hardware.gpu.updateTile(mapped, value); // TODO this may need to be the full address, not the mapped one
        }
        else if (masked <= 0xB000) // External RAM
            this.eram[address & 0x1FFF] = value;
        else if (masked <= 0xFD000) // Working RAM / WRAM shadow
            this.wram[address & 0x1FFF] = value;
        else {
            var lowMasked = address & 0x0F00;
            if (lowMasked === 0xE00) {
                var mapped = address & 0xFF;
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
                    var ioMasked = address & 0xF0;
                    if (ioMasked === 0x00) {
                        var handlerMask = ioMasked & 0xF;
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
    };
    Memory.prototype.writeWord = function (address, value) {
        this.writeByte(address, value & 255);
        this.writeByte(address + 1, value >> 8);
    };
    Memory.prototype.setHardwareBus = function (hardware) {
        this.hardware = hardware;
    };
    Memory.prototype.load = function (file) {
        var _this = this;
        var reader = new FileReader();
        return new Promise(function (resolve, reject) {
            reader.addEventListener('load', function () {
                _this.rom = reader.result.split('').map(function (char) { return char.charCodeAt(0); });
                resolve(reader);
            });
            reader.addEventListener('error', function () { return reject(reader.error); });
            reader.addEventListener('abort', function () { return reject(null); });
            reader.readAsBinaryString(file);
        });
    };
    Memory.prototype.reset = function () {
        this.inBios = true;
        this.rom = (new Array(1 << 15)).fill(0); // 32k
        this.eram = (new Array(1 << 13)).fill(0); // 8k
        this.wram = (new Array(1 << 13)).fill(0); // 8k
        this.zram = (new Array(128)).fill(0); // 128b
        this.interruptsEnabled = 0;
        this.interruptFlags = 0;
    };
    return Memory;
}());
exports.Memory = Memory;


/***/ }),

/***/ "./src/Emulator/util.ts":
/*!******************************!*\
  !*** ./src/Emulator/util.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.toBinary = function (value) {
    return value.toString(2);
};
exports.toHex = function (value) {
    return value.toString(16).toUpperCase();
};


/***/ }),

/***/ "./src/Monitor.ts":
/*!************************!*\
  !*** ./src/Monitor.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var registerKeys = ['a', 'b', 'c', 'd', 'e', 'h', 'l', 'flags', 'programCount', 'stackPointer', 'm', 't'];
var RegisterMonitor = /** @class */ (function () {
    function RegisterMonitor() {
    }
    RegisterMonitor.update = function () {
        var _this = this;
        if (!this.attached)
            return;
        Object.keys(this.elements).forEach(function (key) {
            if (!_this.elements[key])
                return;
            var value = _this.registers[key].toString(16);
            if (value.length < 2)
                value = "0" + value;
            _this.elements[key].textContent = '0x' + value;
        });
    };
    RegisterMonitor.attach = function (root, registers) {
        var _this = this;
        registerKeys.forEach(function (key) {
            _this.elements[key] = root.querySelector("#register-" + key);
        });
        this.attached = true;
        this.registers = registers;
    };
    RegisterMonitor.attached = false;
    RegisterMonitor.registers = null;
    RegisterMonitor.elements = {};
    return RegisterMonitor;
}());
var Monitor = /** @class */ (function () {
    function Monitor() {
    }
    Monitor.attach = function (root, hardware) {
        RegisterMonitor.attach(root.querySelector('#registers'), hardware.registers);
        this.updateIntervalId = setInterval(function () {
            RegisterMonitor.update();
        });
    };
    Monitor.updateIntervalId = null;
    return Monitor;
}());
exports.default = Monitor;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(/*! ./Emulator/CPU/index */ "./src/Emulator/CPU/index.ts");
var index_2 = __webpack_require__(/*! ./Emulator/GPU/index */ "./src/Emulator/GPU/index.ts");
var Hardware_1 = __webpack_require__(/*! ./Emulator/Hardware */ "./src/Emulator/Hardware.ts");
var index_3 = __webpack_require__(/*! ./Emulator/Memory/index */ "./src/Emulator/Memory/index.ts");
var Monitor_1 = __webpack_require__(/*! ./Monitor */ "./src/Monitor.ts");
var cpu = new index_1.Cpu();
var memory = new index_3.Memory();
var gpu = new index_2.Gpu(document.getElementById('screen'));
var hardware = new Hardware_1.HardwareBus(cpu, memory, gpu);
cpu.setHardwareBus(hardware);
memory.setHardwareBus(hardware);
gpu.setHardwareBus(hardware);
Monitor_1.default.attach(document.querySelector('#monitor'), hardware);
var romLoader = document.getElementById('rom-loader');
romLoader.addEventListener('change', function () {
    gpu.reset();
    memory.reset();
    cpu.reset();
    cpu.halt = true;
    if (!romLoader.files.length)
        return;
    memory.load(romLoader.files[0]).then(function () { return cpu.exec(); });
});


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map