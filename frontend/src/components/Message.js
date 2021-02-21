import React from 'react';
import { Alert } from 'react-bootstrap';

function Message({ variant, children, style, text }) {
	return (
		<Alert variant={variant} style={style}>
			{children} {text}
		</Alert>
	);
}

Message.defaultProps = {
	variant: 'info',
};

export default Message;
