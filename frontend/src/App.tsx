import { FC } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Menu from "./components/Menu/Menu";
import WalletPage from "./components/WalletPage/WalletPage";
import Blockchain from "./components/BlockchainPage/BlockchainPage";
import TransactionPage from "./components/TransactionPage/TransactionPage";
import MineBlockPage from "./components/MineBlockPage/MineBlockPage";
import CreateWalletPage from "./components/CreateWalletPage/CreateWalletPage";
import PendingTransactionsPage from "./components/PendingTransactionsPage/PendingTransactionsPage";

const App: FC = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<Menu />
				<Routes>
					<Route path="/Wallet" element={<WalletPage />} />
					<Route path="/Blockchain" element={<Blockchain />} />
					<Route path="/Transaction" element={<TransactionPage />} />
					<Route path="/Mine" element={<MineBlockPage />} />
					<Route path="/CreateWallet" element={<CreateWalletPage />} />
					<Route path="/PendingTransactions" element={<PendingTransactionsPage />} />
					{/* Default Router */}
					<Route path="/" element={<Navigate to="/Blockchain" />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;

