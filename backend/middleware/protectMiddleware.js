import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import AppError from '../utils/AppError.js';

export default async function protectMiddleware(req, res, next) {
	try {
		let token;

		if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
			token = req.headers.authorization.split(' ')[1];

			try {
				const decoded = jwt.verify(token, process.env.JWT_SECRET);
				const user = await User.findById(decoded.id).select('-password');

				req.user = user;
				next();
			} catch (error) {
				res.status(401).json({
					status: 'error',
					message: 'Token failed',
				});
			}
		} else {
			res.status(401).json({
				status: 'error',
				message: 'This is a protected route. Please send a token',
			});
		}
	} catch (error) {
		next(new AppError(error.message, 401));
	}
}
