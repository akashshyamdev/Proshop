import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavLink, NavbarBrand, NavDropdown } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import { logout } from '../actions/userActions.js';

export default function Header() {
	const { userInfo } = useSelector((state) => state.userLogin);
	const dispatch = useDispatch();

	function logoutHandler() {
		dispatch(logout());
	}

	return (
		<header className="header">
			<Navbar bg="dark" variant="dark" expand="lg" className="nav" collapseOnSelect>
				<LinkContainer to="/">
					<NavbarBrand className="nav__logo ml-5">Proshop</NavbarBrand>
				</LinkContainer>

				<NavbarToggle aria-controls="basic-navbar-nav" />

				<NavbarCollapse id="basic-navbar-nav">
					<Nav className="ml-auto nav__links mr-5">
						<LinkContainer to="/cart">
							<NavLink className="nav__link mr-2">
								<i className="fas fa-shopping-cart"></i>&nbsp; Cart
							</NavLink>
						</LinkContainer>

						{userInfo ? (
							<NavDropdown title={`${userInfo.name}`} id="username">
								<LinkContainer to="/profile">
									<NavDropdown.Item>Profile</NavDropdown.Item>
								</LinkContainer>
								<NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
							</NavDropdown>
						) : (
							<LinkContainer to="/login">
								<Nav.Link className="nav__link">
									<i className="fas fa-user"></i>&nbsp; Sign In
								</Nav.Link>
							</LinkContainer>
						)}
						{userInfo && userInfo.isAdmin && (
							<NavDropdown title="Admin" id="adminMenu">
								<LinkContainer to="/userlist">
									<NavDropdown.Item>Users</NavDropdown.Item>
								</LinkContainer>

								<LinkContainer to="/productlist">
									<NavDropdown.Item>Products</NavDropdown.Item>
								</LinkContainer>

								<LinkContainer to="/orderlist">
									<NavDropdown.Item>Orders</NavDropdown.Item>
								</LinkContainer>
							</NavDropdown>
						)}
					</Nav>
				</NavbarCollapse>
			</Navbar>
		</header>
	);
}
