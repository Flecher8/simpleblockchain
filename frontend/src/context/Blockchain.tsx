import { Block } from "./Block";
import { Transaction } from "./Transaction";

export interface Blockchain {
	chain: Block[];
	difficulty: number;
	pendingTransactions: Transaction[];
	miningReward: number;
}
