import SHA256 from "crypto-js/sha256.js";
import elliptic from "elliptic";
const EC = elliptic.ec;
export const ec = new EC("secp256k1");

export class Transaction {
	constructor(fromAddress, toAddress, amount) {
		this.fromAddress = fromAddress;
		this.toAddress = toAddress;
		this.amount = amount;
		// Создание комиссии для того, чтобы защититься от мошеничества путём
		// Перекидывания множества транзакций между кожельками
		this.fee = 1;
		this.signature = "";
	}

	calculateHash() {
		return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
	}

	signTransaction(signingKey) {
		if (signingKey.getPublic("hex") !== this.fromAddress) {
			throw new Error("You cannot sign transactions for other wallets");
		}

		const hashTransaction = this.calculateHash();
		const sign = signingKey.sign(hashTransaction, "base64");
		this.signature = sign.toDER("hex");
	}

	isAddressesValid() {
		// Проверьте, что fromAddress и toAddress соответствуют формату открытых ключей
		const isValidFromAddress = this.isValidPublicKey(this.fromAddress);
		const isValidToAddress = this.isValidPublicKey(this.toAddress);

		if (!isValidFromAddress || !isValidToAddress) {
			return false;
		}
		return true;
	}

	// Метод для проверки, что переданный адрес соответствует формату открытого ключа
	isValidPublicKey(address) {
		try {
			ec.keyFromPublic(address, "hex");
			return true;
		} catch (error) {
			return false;
		}
	}

	// Is transactions correctly signed
	isValid() {
		if (this.fromAddress === this.toAddress) {
			throw new Error("FROM address and TO address can't be the same");
		}

		if (this.fromAddress === null) {
			if (this.isValidPublicKey(this.toAddress)) {
				return true;
			}
			throw new Error("TO address must be valid pulic key");
		}

		if (!this.signature || this.signature.length === 0) {
			throw new Error("No signature in this transaction");
		}

		if (this.amount <= 0) {
			throw new Error("Amount must be > 0");
		}

		if (!this.isAddressesValid()) {
			throw new Error("Invalid sender or recipient address format");
		}

		// Is transaction signed with correct key
		const publicKey = ec.keyFromPublic(this.fromAddress, "hex");
		return publicKey.verify(this.calculateHash(), this.signature);
	}
}

class Block {
	constructor(index, timestamp, transactions, previousHash = "") {
		this.index = index;
		this.timestamp = timestamp;
		this.transactions = transactions;
		this.previousHash = previousHash;

		this.hash = this.calculateHash();

		this.nonce = 0;
	}

	calculateHash() {
		return SHA256(
			this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce
		).toString();
	}

	mineBlock(difficulty) {
		while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
			this.nonce++;
			this.hash = this.calculateHash();
		}
		console.log("Block mined: " + this.hash);
	}

	hasValidTransactions() {
		for (const transaction of this.transactions) {
			if (!transaction.isValid()) {
				return false;
			}
		}

		return true;
	}
}

export class Blockchain {
	constructor() {
		this.chain = [this.createGenisisBlock()];
		this.difficulty = 2;
		this.pendingTransactions = [];
		this.miningReward = 100000;
	}
	// initial (first) block
	createGenisisBlock() {
		return new Block(0, Date.now(), "Genesis block", "0");
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	countFeeOfTransactions(transactions) {
		let fee = 0;
		for (const trans of transactions) {
			fee += trans.fee;
		}
		return fee;
	}

	minePendingTransactions(miningRewardAddress) {
		const rewardTransaction = new Transaction(
			null,
			miningRewardAddress,
			this.miningReward + this.countFeeOfTransactions(this.pendingTransactions)
		);

		if (!rewardTransaction.isValid()) return;

		this.pendingTransactions.push(rewardTransaction);

		// In reality pendingTransactions can be a lot
		// So we need to choose which transactions to take
		let block = new Block(this.chain.length, Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
		block.mineBlock(this.difficulty);

		console.log("Block successfully mined!");
		this.chain.push(block);

		this.pendingTransactions = [];
	}

	isEnoughCoinsOnBalance(fromAddress, amount, fee) {
		// Получите баланс отправителя из блокчейна
		const senderBalance = this.getBalanceOfAddress(fromAddress);

		// Проверьте, есть ли у отправителя достаточно средств
		if (senderBalance < amount + fee) {
			return false;
		}

		return true;
	}

	addTransaction(transaction) {
		// Check for valid addresses
		if (!transaction.fromAddress || !transaction.toAddress) {
			throw new Error("Transaction must include from and to address");
		}
		// Transaction validation
		if (!transaction.isValid()) {
			throw new Error("Cannot add invalid transaction to chain");
		}
		// Balance check
		if (!this.isEnoughCoinsOnBalance(transaction.fromAddress, transaction.amount, transaction.fee)) {
			throw new Error("Not enough coins in the sender's account to complete the transaction");
		}

		this.pendingTransactions.push(transaction);
	}
	// In oreder to know your balance, you need to check all blockchain
	getBalanceOfAddress(address) {
		let balance = 0;
		// Check maim blockchain with already written transactions
		for (const block of this.chain) {
			for (const trans of block.transactions) {
				if (trans.fromAddress === address) {
					balance -= trans.amount + trans.fee;
				}

				if (trans.toAddress === address) {
					balance += trans.amount;
				}
			}
		}
		// Check for pending transactions
		for (const trans of this.pendingTransactions) {
			if (trans.fromAddress === address) {
				balance -= trans.amount + trans.fee;
			}
		}

		return balance;
	}

	isChainValid() {
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if (!currentBlock.hasValidTransactions()) {
				return false;
			}

			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}

			if (currentBlock.previousHash !== previousBlock.hash) {
				return false;
			}
		}

		return true;
	}
}

//module.exports = { Blockchain, Transaction };
