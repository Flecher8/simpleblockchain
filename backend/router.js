import Router from "express";
import BlockchainController from "./BlockchainController.js";

const router = Router();

router.get("/blockchain/", BlockchainController.getBlockchain);
router.get("/blockchain/lastBlock", BlockchainController.getLastBlock);
router.post("/blockchain/transaction", BlockchainController.createTransaction);
router.post("/blockchain/mineBlock", BlockchainController.mineBlock);
router.post("/blockchain/balance", BlockchainController.getAddressBalance);
router.get("/blockchain/createWallet", BlockchainController.createWallet);

export default router;
