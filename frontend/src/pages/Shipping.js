import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormGroup } from 'react-bootstrap';
import { saveShippingAddress } from '../actions/cartActions';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

export default function Shipping({ history }) {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	const [address, setAddress] = useState(shippingAddress.address);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [city, setCity] = useState(shippingAddress.city);
	const [country, setCountry] = useState(shippingAddress.country);

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(saveShippingAddress({ address, postalCode, city, country }));
		history.push('/payment');
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 active="step2"></CheckoutSteps>

			<h1 className="heading-primary my-3">Shipping</h1>

			<Form onSubmit={submitHandler}>
				<FormGroup controlId="name" className="form__group mt-4">
					<input type="name" value={address} onChange={(e) => setAddress(e.target.value)} className="form__input" id="name" required placeholder="Address" />

					<label htmlFor="name" className="form__label form__label--inner">
						<i className="fas fa-envelope"></i>
					</label>
				</FormGroup>

				<FormGroup controlId="name" className="form__group mt-4">
					<input type="name" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="form__input" id="name" required placeholder="Postal Code" />

					<label htmlFor="name" className="form__label form__label--inner">
						<i className="fas fa-envelope"></i>
					</label>
				</FormGroup>

				<FormGroup controlId="name" className="form__group mt-4">
					<input type="name" value={city} onChange={(e) => setCity(e.target.value)} className="form__input" id="name" required placeholder="City" />

					<label htmlFor="name" className="form__label form__label--inner">
						<i className="fas fa-envelope"></i>
					</label>
				</FormGroup>

				<FormGroup controlId="name" className="form__group mt-4">
					<input type="name" value={country} onChange={(e) => setCountry(e.target.value)} className="form__input" id="name" required placeholder="Country" />

					<label htmlFor="name" className="form__label form__label--inner">
						<i className="fas fa-envelope"></i>
					</label>
				</FormGroup>

				<button type="submit" className="btn btn--rectangle btn--black mt-4">
					Continue
				</button>
			</Form>
		</FormContainer>
	);
}
