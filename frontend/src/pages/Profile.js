import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import { getUserDetails, updateUserDetails } from '../actions/userActions';
import { getMyOrders } from '../actions/orderActions';
import moment from 'moment';

export default function Profile({ location, history }) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setconfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	window.moment = moment;

	const dates = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdateDetails = useSelector((state) => state.userUpdateDetails);
	const { success } = userUpdateDetails;

	const myOrders = useSelector((state) => state.myOrders);
	const { loading: loadingOrders, error: errorOrders, orders } = myOrders;
	window.order = orders;
	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			if (!user) {
				dispatch(getUserDetails('profile'));
			} else {
				dispatch(getMyOrders());
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [dispatch, history, userInfo, user]);

	const prepareDate = (date) => {
		const momentDate = moment(date);

		return `${dates[momentDate.month()]} ${momentDate.date()}, ${momentDate.year()}`;
	};

	function submitHandler(e) {
		e.preventDefault();

		console.log('A');

		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
		} else {
			dispatch(updateUserDetails({ _id: user._id, name, email, password }));
		}
	}

	return (
		<Row>
			<Col md={4}>
				<h2 className="heading-secondary mt-4">User Profile</h2>

				{message && (
					<Message variant="danger" children="">
						{message}
					</Message>
				)}

				{success && (
					<Message variant="success" children="">
						Profile Updated
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
							<i className="fas fa-user"></i>
						</label>
					</FormGroup>

					<FormGroup controlId="email" className="form__group mt-4">
						<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form__input" id="email" />

						<label htmlFor="email" className="form__label form__label--outer">
							Email
						</label>
						<label htmlFor="email" className="form__label form__label--inner">
							<i className="fas fa-envelope"></i>
						</label>
					</FormGroup>

					<FormGroup controlId="password" className="form__group mt-4">
						<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form__input" id="password" />

						<label htmlFor="password" className="form__label form__label--outer">
							Password
						</label>
						<label htmlFor="password" className="form__label form__label--inner">
							<i className="fas fa-key"></i>
						</label>
					</FormGroup>

					<FormGroup controlId="confirmPassword" className="form__group mt-4">
						<input type="password" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} className="form__input" id="confirmPassword" />

						<label htmlFor="confirmPassword" className="form__label form__label--outer">
							Confirm Password
						</label>
						<label htmlFor="confirmPassword" className="form__label form__label--inner">
							<i className="fas fa-key"></i>
						</label>
					</FormGroup>

					<Button type="submit" variant="primary" className="btn btn--rectangle btn--black mt-4 w-50">
						Update
					</Button>
				</Form>
			</Col>

			<Col md={8} className="pl-4">
				<h2 className="heading-secondary mt-4">My Orders</h2>
				{loadingOrders ? (
					<Loader />
				) : errorOrders ? (
					<Message variant="danger">{errorOrders}</Message>
				) : (
					<Table striped bordered hover responsive className="table-sm mt-3">
						<thead>
							<tr>
								<th>Payment</th>
								<th>Date</th>
								<th>Total</th>
								<th>Paid</th>
								<th>Delivered</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{orders?.map((order, i) => (
								<tr key={i}>
									<td className="text-uppercase">{order.paymentMethod}</td>
									<td>{prepareDate(order.createdAt)}</td>
									<td>${order.totalPrice}</td>
									<td>{order.isPaid ? prepareDate(order.paidAt) : <i className="fas fa-times" style={{ color: '#EF0000' }} />}</td>
									<td>{order.isDelivered ? prepareDate(order.deliveredAt) : <i className="fas fa-times" style={{ color: '#EF0000' }} />}</td>
									<td>
										<LinkContainer to={`/order/${order._id}`}>
											<Button>Details</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
}
