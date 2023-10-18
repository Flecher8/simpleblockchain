import axios from "axios";
import { FC, useState } from "react";
import { Container, Col, Form, Button, FormControl } from "react-bootstrap";

const TransactionPage: FC = () => {
	const [privateKey, setPrivateKey] = useState("");
	const [toAddress, setToAddress] = useState("");
	const [amount, setAmount] = useState<number>(1);
	const [transactionStatus, setTransactionStatus] = useState<boolean | null>(null);

	const createTransactionHandle = async () => {
		try {
			// Создаем объект с полем "address"
			const requestData = {
				privateKey: privateKey,
				toAddress: toAddress,
				amount: amount
			};

			const response = await axios.post(`http://localhost:3000/api/blockchain/transaction`, requestData);

			console.log(response);
			if (response.status === 200) {
				setTransactionStatus(true);
			} else {
				setTransactionStatus(false);
			}
		} catch (error: any) {
			console.error("Ошибка:", error);
			alert(error.response.data.toString());
		}
	};

	const TransactionStatus = () => {
		return transactionStatus === true
			? "Транзация успешно записана, ожидайте пока её подтвердят"
			: "Ошибка записи транзакции";
	};
	return (
		<div>
			<Container>
				<h2>Transaction</h2>
				<Form>
					<Form.Group as={Col} controlId="privateKey" className="m-3">
						<Form.Label>Приватный ключ, с адреса которого будут списаны монеты:</Form.Label>
						<FormControl type="text" value={privateKey} onChange={e => setPrivateKey(e.target.value)} />
					</Form.Group>
					<Form.Group as={Col} controlId="toAddress" className="m-3">
						<Form.Label>Адрес кошелька, куда будут отправляться монеты:</Form.Label>
						<FormControl type="text" value={toAddress} onChange={e => setToAddress(e.target.value)} />
					</Form.Group>
					<Form.Group as={Col} controlId="amount" className="m-3">
						<Form.Label>Количество передаваемых монет:</Form.Label>
						<FormControl
							type="number"
							min={1}
							value={amount}
							onChange={e => setAmount(parseInt(e.target.value))}
						/>
					</Form.Group>

					<Button variant="primary" onClick={createTransactionHandle} className="m-4">
						Send transaction
					</Button>
				</Form>
				{transactionStatus && (
					<div>
						<h3>Статус транзакции:</h3>
						<p>{TransactionStatus()}</p>
					</div>
				)}
			</Container>
		</div>
	);
};

export default TransactionPage;
