import { Transaction } from "./Transaction";

export interface Block {
	index: number;
	timestamp: Date;
	transactions: Transaction[];
	previousHash: string;
	hash: string;
	nonce: number;
}
