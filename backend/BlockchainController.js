import { myCoin } from "./index.js";
import { Blockchain, Transaction, ec } from "./blockchain.js";

class BlockchainController {
	async getBlockchain(req, res) {
		try {
			const blockchain = myCoin;
			return res.json(blockchain);
		} catch (e) {
			console.error(e.toString());
			res.status(400).json(e.toString());
		}
	}

	async getLastBlock(req, res) {
		try {
			const block = myCoin.getLastBlock();
			return res.json(block);
		} catch (e) {
			console.error(e.toString());
			res.status(400).json(e.toString());
		}
	}

	async createTransaction(req, res) {
		try {
			const { privateKey, toAddress, amount } = req.body;

			const key = ec.keyFromPrivate(privateKey, "hex");
			const fromAddress = key.getPublic("hex");

			const newTransaction = new Transaction(fromAddress, toAddress, amount);
			newTransaction.signTransaction(key);
			myCoin.addTransaction(newTransaction);

			return res.json({ fromAddress, toAddress, amount, privateKey });
		} catch (e) {
			console.error(e.toString());
			return res.status(400).json(e.toString());
		}
	}

	async mineBlock(req, res) {
		try {
			const { miningRewardAddress } = req.body;
			myCoin.minePendingTransactions(miningRewardAddress);
			return res.status(200).json();
		} catch (e) {
			console.error(e.toString());
			res.status(400).json(e.toString());
		}
	}

	async getAddressBalance(req, res) {
		try {
			const { address } = req.body;
			const balance = myCoin.getBalanceOfAddress(address);
			return res.status(200).json({ balance: balance });
		} catch (e) {
			console.error(e.toString());
			res.status(400).json(e.toString());
		}
	}

	async createWallet(req, res) {
		try {
			const key = ec.genKeyPair();
			const publicKey = key.getPublic("hex");
			const privateKey = key.getPrivate("hex");
			return res.status(200).json({ publicKey: publicKey, privateKey: privateKey });
		} catch (e) {
			console.error(e.toString());
			res.status(400).json(e.toString());
		}
	}
}

export default new BlockchainController();
