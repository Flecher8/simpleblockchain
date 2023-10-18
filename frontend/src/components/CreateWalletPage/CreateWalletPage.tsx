import axios from "axios";
import { FC, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

interface NewWallet {
	publicKey: string;
	privateKey: string;
}

const CreateWalletPage: FC = () => {
	const [newWallet, setNewWallet] = useState<NewWallet>();

	const createWalletHanlde = async () => {
		try {
			const response = await axios.get(`http://localhost:3000/api/blockchain/createWallet`);

			setNewWallet(response.data);
		} catch (error: any) {
			console.error("Ошибка:", error);
			alert(error.response.data.toString());
		}
	};

	return (
		<div>
			<Container>
				<h2>Creatye Wallet</h2>
				<h3>Do not share your private key with anyone!</h3>
				<Form>
					<Button variant="primary" onClick={createWalletHanlde} className="m-4">
						Create Wallet
					</Button>
				</Form>
				{newWallet && (
					<div>
						<h5>Public key:</h5>
						<p>{newWallet.publicKey}</p>
						<h5>Private key:</h5>
						<p>{newWallet.privateKey}</p>
					</div>
				)}
			</Container>
		</div>
	);
};

export default CreateWalletPage;
