import { FC, useEffect, useState } from "react";
import BlocksPanel from "../BlocksPanel/BlocksPanel";
import axios from "axios";
import { Blockchain } from "../../context/Blockchain";

const BlockchainPage: FC = () => {
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
			<div className="text-center">
				<h1>Blockchain</h1>
			</div>
			<div>{blockchain !== null && <BlocksPanel blocks={blockchain.chain} />}</div>
		</div>
	);
};

export default BlockchainPage;
