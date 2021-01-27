import React from 'react';
import { CardImg } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Product(props) {
	const { name, _id, rating, numReviews, price, countInStock, category, brand, color, cover, delivery } = props;

	return (
		<div>
			<div className="my-3 p-3 rounded card">
				<Link to={`/product/${_id}`}>
					<CardImg src={cover} variant="top" className="card__image"></CardImg>
				</Link>

				<div className="card__body">
					<h6 className="card__type">{category}</h6>
					<h3 className="card__heading">{name}</h3>

					<div className="card__properties">
						<p className="mb-3 mt-2">
							<i className="fas fa-list-ol"></i> {countInStock} in stock
						</p>

						<p className="mb-3 mt-2">
							<i className="fas fa-copyright"></i> {brand}
						</p>

						<p>
							<i className="fas fa-palette"></i> {color}
						</p>

						<p>
							<i className="fas fa-truck"></i> {delivery}
						</p>
					</div>
				</div>

				<div className="card__footer">
					<div className="card__footer-content">
						<p>
							<i className="fas fa-dollar-sign"></i>&nbsp; {price}
						</p>
						<p className="m-0">
							<i className="far fa-star"></i>&nbsp; {rating} ratings ({numReviews})
						</p>
					</div>

					<Link to={`/product/${_id}`} className="btn btn--primary">
						DETAILS
					</Link>
				</div>
			</div>
		</div>
	);
}
