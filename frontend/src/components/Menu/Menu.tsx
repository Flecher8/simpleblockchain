import { FC } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Menu: FC = () => {
	return (
		<div className="menu">
			<Navbar expand="lg" className="bg-body-tertiary">
				<Container>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link href="/Blockchain">Blockchain</Nav.Link>
							<Nav.Link href="/Wallet">Wallet</Nav.Link>
							<Nav.Link href="/Transaction">Transaction</Nav.Link>
							<Nav.Link href="/Mine">Mine</Nav.Link>
							<Nav.Link href="/CreateWallet">Create new wallet</Nav.Link>
							<Nav.Link href="/PendingTransactions">Pending transactions</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
};

export default Menu;
