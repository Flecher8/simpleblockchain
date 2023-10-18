import { FC, useState } from "react";
import axios from "axios";
import { Wallet } from "../../context/Wallet";
import { Button, Col, Container, Form, FormControl, Row } from "react-bootstrap";

const WalletPage: FC = () => {
	const [publicKey, setPublicKey] = useState(""); // Состояние для хранения введенного публичного ключа
	const [wallet, setWallet] = useState<Wallet | null>(null); // Состояние для хранения информации о балансе
	const handleCalculateBalance = async () => {
		try {
			// Создаем объект с полем "address"
			const requestData = {
				address: publicKey
			};
			// Отправляем запрос на сервер для получения информации о балансе
			const response = await axios.post(`http://localhost:3000/api/blockchain/balance`, requestData);

			// Обновляем состояние с информацией о балансе
			setWallet(response.data);
		} catch (error: any) {
			console.error("Ошибка:", error);
			alert(error.response.data.toString());
		}
	};

	return (
		<div>
			<Container>
				<h2>Wallet</h2>
				<Form>
					<Form.Group as={Col} controlId="publicKey" className="m-3">
						<Form.Label>Публичный ключ:</Form.Label>
						<FormControl type="text" value={publicKey} onChange={e => setPublicKey(e.target.value)} />
					</Form.Group>

					<Button variant="primary" onClick={handleCalculateBalance} className="m-4">
						Посчитать баланс
					</Button>
				</Form>
				{wallet && (
					<div>
						<h3>Баланс:</h3>
						<p>{wallet.balance}</p>
					</div>
				)}
			</Container>
		</div>
	);
};

export default WalletPage;
