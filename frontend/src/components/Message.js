import React from 'react';
import { Alert } from 'react-bootstrap';

function Message({ variant, children, style }) {
	return (
		<Alert variant={variant} style={style}>
			{children ? children : <></>}
		</Alert>
	);
}

Message.defaultProps = {
	variant: 'info',
};

export default Message;
