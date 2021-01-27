import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavLink, NavbarBrand } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';

export default function Header() {
	return (
		<header className="header">
			<Navbar bg="dark" variant="dark" expand="lg" className="nav" collapseOnSelect>
				<LinkContainer to="/">
					<NavbarBrand className="nav__logo ml-5">Proshop</NavbarBrand>
				</LinkContainer>

				<NavbarToggle aria-controls="basic-navbar-nav" />

				<NavbarCollapse id="basic-navbar-nav">
					<Nav className="ml-auto nav__links mr-5">
						<LinkContainer to="">
							<NavLink href="/cart" className="nav__link mr-2">
								<i className="fas fa-shopping-cart"></i>&nbsp; Cart
							</NavLink>
						</LinkContainer>

						<LinkContainer to="/login">
							<Nav.Link className="nav__link">
								<i className="fas fa-user"></i>&nbsp; Sign In
							</Nav.Link>
						</LinkContainer>
					</Nav>
				</NavbarCollapse>
			</Navbar>
		</header>
	);
}
