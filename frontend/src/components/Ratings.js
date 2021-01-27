import React from 'react';

export default function Ratings(props) {
	const { rating, style } = props;

	return (
		<div className="rating" style={style}>
			<span>
				<i
					className={
						rating >= 1 ? 'fas fa-star rating__star' : rating >= 0.5 ? 'fas fa-star-half-alt rating__star' : 'fas fa-star rating__star--empty'
					}
				></i>
			</span>
			<span>
				<i
					className={
						rating >= 2 ? 'fas fa-star rating__star' : rating >= 1.5 ? 'fas fa-star-half-alt rating__star' : 'fas fa-star rating__star--empty'
					}
				></i>
			</span>
			<span>
				<i
					className={
						rating >= 3 ? 'fas fa-star rating__star' : rating >= 2.5 ? 'fas fa-star-half-alt rating__star' : 'fas fa-star rating__star--empty'
					}
				></i>
			</span>
			<span>
				<i
					className={
						rating >= 4 ? 'fas fa-star rating__star' : rating >= 3.5 ? 'fas fa-star-half-alt rating__star' : 'fas fa-star rating__star--empty'
					}
				></i>
			</span>
			<span>
				<i
					className={
						rating >= 5 ? 'fas fa-star rating__star' : rating >= 4.5 ? 'fas fa-star-half-alt rating__star' : 'fas fa-star rating__star--empty'
					}
				></i>
			</span>
		</div>
	);
}
