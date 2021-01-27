import React from 'react';

export default function Loader(props) {
	const { type, style, className } = props;

	return (
		<div className={`loader loader--${type} ${className}`} style={style}>
			{props.type === 'square' ? (
				<>
					<div className="loader__square"></div>
					<div className="loader__square"></div>
				</>
			) : type === 'spinner' ? (
				<>
					<div className="loader__spinner"></div>
					<div className="loader__spinner"></div>
				</>
			) : (
				''
			)}
		</div>
	);
}
