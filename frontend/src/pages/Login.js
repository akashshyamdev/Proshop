import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import FormContainer from '../components/FormContainer.js';
import { login } from '../actions/userActions';

export default function Login({ location, history }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const redirect = location.search ? location.search.split('=')[1] : '/';
	const dispatch = useDispatch();
	const { loading, error, userInfo } = useSelector((state) => state.userLogin);

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	function submitHandler(e) {
		e.preventDefault();

		dispatch(login(email, password));
	}

	return (
		<FormContainer>
			<h1 className="heading-primary mt-4">Sign In</h1>

			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader></Loader>}
			<Form onSubmit={submitHandler} className="form">
				<FormGroup controlId="email" className="form__group mt-4">
					<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form__input" id="email" required />

					<label htmlFor="email" className="form__label form__label--outer">
						Email
					</label>
					<label htmlFor="email" className="form__label form__label--inner">
						<i className="fas fa-envelope"></i>
					</label>
				</FormGroup>

				<FormGroup controlId="password" className="form__group mt-4">
					<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form__input" id="password" required />

					<label htmlFor="password" className="form__label form__label--outer">
						Password
					</label>
					<label htmlFor="password" className="form__label form__label--inner">
						<i className="fas fa-key"></i>
					</label>
				</FormGroup>

				<Button type="submit" variant="primary" className="btn btn--rectangle btn--black mt-4 w-50">
					Sign In
				</Button>
			</Form>

			<Row className="py-3">
				<Col>
					<p className="lead">
						New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
					</p>
				</Col>
			</Row>
		</FormContainer>
	);
}
