import express from "express";
import { Blockchain, Transaction } from "./blockchain.js";
const myCoin = new Blockchain();

export { myCoin, Transaction };

import cors from "cors";
import router from "./router.js";

const PORT = 3000;
const app = express();
// Разрешить все источники на сервере
app.use(cors());
app.use(express.json());
app.use("/api", router);

async function startApp() {
	try {
		app.listen(PORT, () => console.log("Server started"));
	} catch (e) {
		console.error(e);
	}
}

startApp();
