import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import FormContainer from '../components/FormContainer.js';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants.js';

export default function ProductEdit({ history, match }) {
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState('');
	const [brand, setBrand] = useState('Brand');
	const [category, setCategory] = useState('');
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState('');

	const productId = match.params.id;

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const productUpdate = useSelector((state) => state.productUpdate);
	const { loading: loadingUpdate, error: errorUpdate, success } = productUpdate;

	useEffect(() => {
		if (success) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
			history.push('/productlist');
		} else {
			if (!product?.name || product._id !== productId) {
				dispatch(listProductDetails(productId));
			} else {
				setName(product.name);
				setPrice(product.price);
				setBrand(product.brand);
				setCategory(product.category);
				setCountInStock(product.countInStock);
				setDescription(product.description);
				setImage(product.cover);
			}
		}
	}, [product, productId, dispatch, history, success]);

	function submitHandler(e) {
		e.preventDefault();

		dispatch(
			updateProduct({
				_id: productId,
				name,
				price,
				brand,
				category,
				description,
				countInStock,
				image,
			})
		);
	}

	// TODO: Make it look beautiful
	return (
		<Fragment>
			<Link to={`/productlist`} className="btn btn--orange my-3">
				Go Back
			</Link>

			<FormContainer>
				<h1 className="heading-primary mt-4">Edit Product</h1>

				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant="danger" text={errorUpdate.message} />}

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

						<FormGroup controlId="price" className="form__group mt-4">
							<input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="form__input" id="price" placeholder="Price" />
							<label htmlFor="price" className="form__label form__label--inner">
								<i className="fas fa-envelope"></i>
							</label>
						</FormGroup>

						<FormGroup controlId="image" className="form__group mt-4">
							<input value={image} onChange={(e) => setImage(e.target.value)} className="form__input" id="image" placeholder="Image URL" />
							<label htmlFor="image" className="form__label form__label--inner">
								<i className="fas fa-envelope"></i>
							</label>
						</FormGroup>

						<FormGroup controlId="brand" className="form__group mt-4">
							<input value={brand} onChange={(e) => setBrand(e.target.value)} className="form__input" id="brand" placeholder="Brand" />
							<label htmlFor="brand" className="form__label form__label--inner">
								<i className="fas fa-envelope"></i>
							</label>
						</FormGroup>

						<FormGroup controlId="category" className="form__group mt-4">
							<input value={category} onChange={(e) => setCategory(e.target.value)} className="form__input" id="category" placeholder="Category" />
							<label htmlFor="category" className="form__label form__label--inner">
								<i className="fas fa-envelope"></i>
							</label>
						</FormGroup>

						<FormGroup controlId="countInStock" className="form__group mt-4">
							<input value={countInStock} onChange={(e) => setCountInStock(e.target.value)} className="form__input" id="countInStock" placeholder="Count In Stock" />
							<label htmlFor="countInStock" className="form__label form__label--inner">
								<i className="fas fa-envelope"></i>
							</label>
						</FormGroup>

						<FormGroup controlId="description" className="form__group mt-4">
							<input type="textarea" value={description} onChange={(e) => setDescription(e.target.value)} className="form__input" id="description" placeholder="Description" />
							<label htmlFor="description" className="form__label form__label--inner">
								<i className="fas fa-envelope"></i>
							</label>
						</FormGroup>

						<Button type="submit" variant="primary" className="btn btn--rectangle btn--black mt-4 w-50">
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</Fragment>
	);
}
