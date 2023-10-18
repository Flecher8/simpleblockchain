import { FC } from "react";
import { Block } from "../../context/Block";
import { Card } from "react-bootstrap";

interface BlockComponentProps {
	block: Block;
}

const BlockComponent: FC<BlockComponentProps> = ({ block }) => {
	return (
		<div>
			<Card>
				<Card.Header>
					<h4>Block Information</h4>
				</Card.Header>
				<Card.Body>
					<ul>
						<li>Index: {block.index}</li>
						<li>Timestamp: {block.timestamp.toString()}</li>
						<li>Previous Hash: {block.previousHash}</li>
						<li>Hash: {block.hash}</li>
						<li>Nonce: {block.nonce}</li>
					</ul>
					<h5>Transactions:</h5>
					{Array.isArray(block.transactions) ? (
						<ul>
							{block.transactions.map((transaction, index) => (
								<li key={index}>
									<b>Transaction {index + 1}</b>
									<ul>
										<li>From: {transaction.fromAddress || "System"}</li>
										<li>To: {transaction.toAddress}</li>
										<li>Amount: {transaction.amount}</li>
									</ul>
								</li>
							))}
						</ul>
					) : (
						<p>No transactions available</p>
					)}
				</Card.Body>
			</Card>
		</div>
	);
};

export default BlockComponent;
