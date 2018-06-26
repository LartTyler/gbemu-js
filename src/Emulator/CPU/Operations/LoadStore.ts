import {OperatorSet} from './index';
import {MemoryToMemoryOperators, MemoryToMemoryOperatorSet} from './LoadStore/MemoryToMemory';
import {MemoryToRegisterOperators, MemoryToRegisterOperatorSet} from './LoadStore/MemoryToRegister';
import {ProgramCountOperators, ProgramCountOperatorSet} from './LoadStore/ProgramCount';
import {RegisterToMemoryOperators, RegisterToMemoryOperatorSet} from './LoadStore/RegisterToMemory';
import {RegisterToRegisterOperators, RegisterToRegisterOperatorSet} from './LoadStore/RegisterToRegister';
import {SwapOperators, SwapOperatorSet} from './LoadStore/Swap';

export interface LoadStoreOperatorSet extends OperatorSet,
	MemoryToMemoryOperatorSet,
	MemoryToRegisterOperatorSet,
	ProgramCountOperatorSet,
	RegisterToMemoryOperatorSet,
	RegisterToRegisterOperatorSet,
	SwapOperatorSet {
}

export const LoadStoreOperators: LoadStoreOperatorSet = {
	...MemoryToMemoryOperators,
	...MemoryToRegisterOperators,
	...ProgramCountOperators,
	...RegisterToMemoryOperators,
	...RegisterToRegisterOperators,
	...SwapOperators,
};
