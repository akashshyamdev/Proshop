import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4, active }) => {
	return (
		<Nav className="justify-content-center mb-4 mt-3 checkout-steps">
			<Nav.Item className="checkout-steps__item">
				{step1 ? (
					<LinkContainer to="/login" className={`checkout-steps__link ${active === 'step1' && 'checkout-steps__link--active'}`}>
						<Nav.Link>Sign In</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled className="checkout-steps__link checkout-steps__link--disabled">
						Sign In
					</Nav.Link>
				)}
			</Nav.Item>

			<Nav.Item className="checkout-steps__item">
				{step2 ? (
					<LinkContainer to="/shipping" className={`checkout-steps__link ${active === 'step2' && 'checkout-steps__link--active'}`}>
						<Nav.Link>Shipping</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled className="checkout-steps__link checkout-steps__link--disabled">
						Shipping
					</Nav.Link>
				)}
			</Nav.Item>

			<Nav.Item className="checkout-steps__item">
				{step3 ? (
					<LinkContainer to="/payment" className={`checkout-steps__link ${active === 'step3' && 'checkout-steps__link--active'}`}>
						<Nav.Link>Payment</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled className="checkout-steps__link checkout-steps__link--disabled">
						Payment
					</Nav.Link>
				)}
			</Nav.Item>

			<Nav.Item className="checkout-steps__item">
				{step4 ? (
					<LinkContainer to="/placeorder" className={`checkout-steps__link ${active === 'step4' && 'checkout-steps__link--active'}`}>
						<Nav.Link>Place Order</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled className="checkout-steps__link checkout-steps__link--disabled">
						Place Order
					</Nav.Link>
				)}
			</Nav.Item>
		</Nav>
	);
};

export default CheckoutSteps;
