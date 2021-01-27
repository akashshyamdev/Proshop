import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import FormContainer from '../components/FormContainer.js';
import { register } from '../actions/userActions';

export default function Register({ location, history }) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setconfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const redirect = location.search ? location.search.split('=')[1] : '/';
	const dispatch = useDispatch();
	const { loading, error, userInfo } = useSelector((state) => state.userRegister);

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	function submitHandler(e) {
		e.preventDefault();

		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
		} else {
			dispatch(register(name, email, password));
		}
	}

	return (
		<FormContainer>
			<h1 className="heading-primary mt-4">Sign Up</h1>

			{message && (
				<Message variant="danger" children="">
					{message}
				</Message>
			)}
			{error && (
				<Message variant="danger" children="">
					{error}
				</Message>
			)}
			{loading && <Loader></Loader>}
			<Form onSubmit={submitHandler} className="form">
				<FormGroup controlId="name" className="form__group mt-4">
					<input type="name" value={name} onChange={(e) => setName(e.target.value)} className="form__input" id="name" />

					<label htmlFor="name" className="form__label form__label--outer">
						Name
					</label>
					<label htmlFor="name" className="form__label form__label--inner">
						<i class="fas fa-envelope"></i>
					</label>
				</FormGroup>

				<FormGroup controlId="email" className="form__group mt-4">
					<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form__input" id="email" />

					<label htmlFor="email" className="form__label form__label--outer">
						Email
					</label>
					<label htmlFor="email" className="form__label form__label--inner">
						<i class="fas fa-envelope"></i>
					</label>
				</FormGroup>

				<FormGroup controlId="password" className="form__group mt-4">
					<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form__input" id="password" />

					<label htmlFor="password" className="form__label form__label--outer">
						Password
					</label>
					<label htmlFor="password" className="form__label form__label--inner">
						<i class="fas fa-key"></i>
					</label>
				</FormGroup>

				<FormGroup controlId="confirmPassword" className="form__group mt-4">
					<input type="confirmPassword" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} className="form__input" id="confirmPassword" />

					<label htmlFor="confirmPassword" className="form__label form__label--outer">
						Confirm Password
					</label>
					<label htmlFor="confirmPassword" className="form__label form__label--inner">
						<i class="fas fa-key"></i>
					</label>
				</FormGroup>

				<Button type="submit" variant="primary" className="btn btn--rectangle btn--black mt-4 w-50">
					Register
				</Button>
			</Form>

			<Row className="py-3">
				<Col>
					<p className="lead">
						Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
					</p>
				</Col>
			</Row>
		</FormContainer>
	);
}
