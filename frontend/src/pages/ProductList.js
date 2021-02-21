import React, { useEffect, Fragment } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import { LinkContainer } from 'react-router-bootstrap';
import { deleteProduct, listProducts, createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants.js';

export default function ProductList({ history, match }) {
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	const productCreate = useSelector((state) => state.productCreate);
	const { loading: loadingCreate, error: errorCreate, success: successCreate, product } = productCreate;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productDelete = useSelector((state) => state.productDelete);
	const { loading: loadingDelete, error: errorDelete } = productDelete;

	useEffect(() => {
		// dispatch({ type: PRODUCT_CREATE_RESET });

		if (!userInfo.isAdmin) {
			history.push('/login?redirect=true&message');
		}

		if (successCreate) {
			history.push(`/admin/product/${product._id}/edit`);
			dispatch({ type: PRODUCT_CREATE_RESET });
		} else {
			dispatch(listProducts());
		}
	}, [dispatch, history, userInfo, successCreate, product]);

	const deleteHandler = (id) => {
		console.log(id);
		if (window.confirm('Are you sure you want to delete this product?')) {
			dispatch(deleteProduct(id));
		}
	};

	const createProductHandler = (product) => {
		dispatch(createProduct());
	};

	// TODO: Make this look good(similar to the product rows in the cart & place order components, should be quick 😄)
	return (
		<Fragment>
			<Row className="align-items-center">
				<Col>
					<h1 className="heading-primary mt-2">Product</h1>
				</Col>
				<Col className="text-right">
					<button className="my-3 btn" onClick={createProductHandler}>
						Create Product <i className="fas fa-plus" />
					</button>
				</Col>
			</Row>
			{loadingDelete ? <Loader /> : errorDelete ? <Message variant="danger">{errorDelete.message}</Message> : null}
			{loadingCreate ? <Loader /> : errorCreate ? <Message variant="danger">{errorCreate.message}</Message> : null}

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
							<th>Price</th>
							<th>Category</th>
							<th>Brand</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{products?.map((product, i) => (
							<tr key={i}>
								<td>{product._id}</td>
								<td>{product.name}</td>
								<td>${product.price}</td>
								<td>{product.category}</td>
								<td>{product.brand}</td>
								<td>
									<LinkContainer to={`/admin/product/${product._id}/edit`}>
										<button className="btn">
											<i className="fas fa-edit" />
										</button>
									</LinkContainer>

									<button className="btn" onClick={() => deleteHandler(product._id)}>
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
