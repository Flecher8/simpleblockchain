import axios, { AxiosError } from "axios";
import { FC, useState } from "react";
import { Container, Col, Form, FormControl, Button } from "react-bootstrap";

interface MineBlockPageProps {}

const MineBlockPage: FC = () => {
	const [publicKey, setPublicKey] = useState(""); // Состояние для хранения введенного публичного ключа
	const [mineBlockStatus, setMineBlockStatus] = useState<boolean | null>(null);
	const MineBlockHandle = async () => {
		try {
			// Создаем объект с полем "address"
			const requestData = {
				miningRewardAddress: publicKey
			};

			const response = await axios.post(`http://localhost:3000/api/blockchain/mineBlock`, requestData);

			console.log(response);
			if (response.status === 200) {
				setMineBlockStatus(true);
			} else {
				setMineBlockStatus(false);
			}
		} catch (error: any) {
			console.error("Ошибка:", error);
			alert(error.response.data.toString());
		}
	};
	const BlockStatus = () => {
		return mineBlockStatus === true ? "Блок успешно создан" : "Блок не был создан";
	};

	return (
		<div>
			<Container>
				<h2>Mine Block</h2>
				<Form>
					<Form.Group as={Col} controlId="publicKey" className="m-3">
						<Form.Label>Публичный ключ:</Form.Label>
						<FormControl type="text" value={publicKey} onChange={e => setPublicKey(e.target.value)} />
					</Form.Group>

					<Button variant="primary" onClick={MineBlockHandle} className="m-4">
						Mine Block
					</Button>
				</Form>
				{mineBlockStatus && (
					<div>
						<h3>Статус блока:</h3>
						<p>{BlockStatus()}</p>
					</div>
				)}
			</Container>
		</div>
	);
};

export default MineBlockPage;
