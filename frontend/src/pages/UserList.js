import React, { useEffect, Fragment } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import { LinkContainer } from 'react-router-bootstrap';
import { deleteUser, getUsers } from '../actions/userActions';

export default function UserList({ history }) {
	const dispatch = useDispatch();

	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDelete = useSelector((state) => state.userDelete);
	const { success: successDelete } = userDelete;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(getUsers());
		} else {
			history.push('/login');
		}
		// eslint-disable-next-line
	}, [dispatch, history, successDelete, userInfo]);

	const deleteHandler = (id) => {
		// FIXME: Functionality is ok but the message is wrong(probably an issue on the server)
		dispatch(deleteUser());
	};

	// TODO: Make this look good
	return (
		<Fragment>
			<h1 className="heading-primary mt-2">Users</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error.message}</Message>
			) : (
				<Table striped bordered hover responsive className="mt-3">
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Email</th>
							<th>Admin</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users?.map((user, i) => (
							<tr key={i}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>
									<a href={`mailto:${user.email}`}>{user.email}</a>
								</td>
								<td>{user.isAdmin ? <i className="fas fa-check" style={{ color: 'green' }} /> : <i className="fas fa-times" style={{ color: 'red' }} />}</td>
								<td>
									<LinkContainer to={`/admin/user/${user._id}/edit`}>
										<button className="btn">
											<i className="fas fa-edit" />
										</button>
									</LinkContainer>
									<button className="btn" onClick={() => deleteHandler(user._id)}>
										<i className="fas fa-trash" />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</Fragment>
	);
}
