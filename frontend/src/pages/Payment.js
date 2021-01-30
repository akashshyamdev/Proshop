import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, FormCheck, FormGroup, FormLabel } from 'react-bootstrap';
import { savePaymentMethod } from '../actions/cartActions';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

export default function Payment({ history }) {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	const [paymentMethod, setPaymentMethod] = useState('paypal');

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(savePaymentMethod(paymentMethod));
		history.push('/placeorder');
	};

	if (!shippingAddress) history.push('/shipping');

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 active="step3"></CheckoutSteps>

			<h1 className="heading-primary my-3">Payment</h1>

			<Form onSubmit={submitHandler}>
				<FormGroup>
					<FormLabel as="legend">Select Method</FormLabel>
					<Col>
						<FormCheck
							type="radio"
							label="PayPal / Credit Card"
							id="paypal"
							name="paymentMethod"
							value="PayPal"
							checked
							onChange={({ target }) => setPaymentMethod(target.value)}
						/>

						{/* // TODO IMPLEMENT MORE PAYMENT METHODS */}
					</Col>
				</FormGroup>

				<button type="submit" className="btn btn--rectangle btn--black mt-4">
					Continue
				</button>
			</Form>
		</FormContainer>
	);
}
