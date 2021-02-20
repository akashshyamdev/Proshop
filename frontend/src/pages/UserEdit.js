import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Button, FormCheck } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import FormContainer from '../components/FormContainer.js';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

export default function Register({ history, match }) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState('');

	const userId = match.params.id;

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const { loading: loadingUpdate, error: errorUpdate, success } = useSelector((state) => state.userUpdate);

	useEffect(() => {
		if (success) {
			console.log('success');
			dispatch({ type: USER_UPDATE_RESET });
			history.push('/userlist');
		} else {
			if (!user?.name || user._id !== userId) {
				dispatch(getUserDetails(userId));
			} else {
				console.log('else');
				setName(user.name);
				setEmail(user.email);
				setIsAdmin(user.isAdmin);
			}
		}
	}, [user, userId, dispatch, success, history]);

	function submitHandler(e) {
		e.preventDefault();

		dispatch(updateUser({ _id: userId, name, email, isAdmin }));
	}

	// TODO: Make it look beautiful
	return (
		<Fragment>
			<Link to={`/admin/userlist`} className="btn btn--orange my-3">
				Go Back
			</Link>

			<FormContainer>
				<h1 className="heading-primary mt-4">Edit User</h1>

				{loadingUpdate ? <Loader /> : errorUpdate ? <Message>{errorUpdate}</Message> : null}

				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger" />
				) : (
					<Form onSubmit={submitHandler} className="form">
						<FormGroup controlId="name" className="form__group mt-4">
							<input type="name" value={name} onChange={(e) => setName(e.target.value)} className="form__input" id="name" placeholder="Name" />
							<label htmlFor="name" className="form__label form__label--inner">
								<i className="fas fa-envelope"></i>
							</label>
						</FormGroup>

						<FormGroup controlId="email" className="form__group mt-4">
							<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form__input" id="email" placeholder="Email" />
							<label htmlFor="email" className="form__label form__label--inner">
								<i className="fas fa-envelope"></i>
							</label>
						</FormGroup>

						<FormGroup controlId="isAdmin" className="mt-4">
							<FormCheck type="checkbox" value={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} label="Is Admin" checked={isAdmin} />
						</FormGroup>

						<Button type="submit" variant="primary" className="btn btn--rectangle btn--black mt-4 w-50">
							Register
						</Button>
					</Form>
				)}
			</FormContainer>
		</Fragment>
	);
}
