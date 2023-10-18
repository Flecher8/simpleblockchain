import { FC, useEffect, useState } from "react";
import axios from "axios";
import { Blockchain } from "../../context/Blockchain";
import { Container, Card } from "react-bootstrap";

const PendingTransactionsPage: FC = () => {
	const [blockchain, setBlockchain] = useState<Blockchain | null>(null);

	const getBlockchain = async () => {
		try {
			const response = await axios.get("http://localhost:3000/api/blockchain");

			// Данные успешно получены
			const output: Blockchain = response.data;
			console.log(output);
			setBlockchain(output); // Сохраните результат запроса в состоянии
		} catch (error: any) {
			// Обработка ошибки
			console.error("Ошибка при отправке POST-запроса", error);
			alert(error.response.data.toString());
		}
	};

	useEffect(() => {
		getBlockchain();
	}, []);
	return (
		<div>
			<Container>
				{blockchain && (
					<div>
						<h2>Список ожидающих транзакций:</h2>
						<div className="transactions">
							{blockchain.pendingTransactions.map((transaction, index) => (
								<div key={index} className="transaction mb-5">
									<p>
										<strong>From:</strong>
									</p>
									<p>{transaction.fromAddress || "N/A"}</p>
									<p>
										<strong>To:</strong>
									</p>
									<p>{transaction.toAddress}</p>
									<p>
										<strong>Amount:</strong> {transaction.amount}
									</p>
								</div>
							))}
						</div>
					</div>
				)}
			</Container>
		</div>
	);
};

export default PendingTransactionsPage;
