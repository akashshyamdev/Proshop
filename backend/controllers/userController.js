import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import AppError from '../utils/AppError.js';
import generateToken from '../utils/generateToken.js';

// @description - authenticate user and get a token
// @route - POST /api/users/login
// @access - public

export async function login(req, res, next) {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (user && (await user.matchPassword(password))) {
			res.json({
				status: 'sucess',
				data: {
					_id: user._id,
					name: user.name,
					email: user.email,
					isAdmin: user.isAdmin,
					token: generateToken(user._id),
				},
			});
		} else {
			throw new Error('Incorrect email or password');
		}
	} catch (error) {
		next(new AppError(error.message, 401));
	}
}

// @description - create and register a new user
// @route - POST /api/users/signup
// @access - public

export async function signup({ body }, res, next) {
	try {
		const { name, email, password } = body;

		const userExists = await User.findOne({ email });

		if (userExists) {
			next(new AppError('User already exists', 400));
		}

		const user = await User.create({ name, email, password });

		if (user) {
			res.status(201).json({
				status: 'sucess',
				data: {
					_id: user._id,
					name: user.name,
					email: user.email,
					isAdmin: user.isAdmin,
					token: generateToken(user._id),
				},
			});
		} else {
			next(new AppError('Invalid user data', 401));
		}
	} catch (error) {
		next(new AppError(error.message, 401));
	}
}

// @description - Get user profile
// @route - GET /api/users/profile
// @access - private

export async function getUser({ user }, res, next) {
	try {
		if (user) {
			res.status(200).json({
				status: 'sucess',
				data: {
					user,
				},
			});
		} else {
			res.status(401).json({
				status: 'error',
				message: 'User not found.',
			});
		}
	} catch (error) {
		next(new AppError(error.message, 401));
	}
}

// @description - Get user profile
// @route - PATCH /api/users/profile
// @access - private

export async function updateUser({ user, body }, res, next) {
	try {
		if (user) {
			user.name = body.name || user.name;
			user.email = body.email || user.email;

			if (body.password) {
				user.body.password = req.body.password;
			}

			const updatedUser = await user.save();

			res.json({
				status: 'sucess',
				data: {
					_id: updatedUser._id,
					name: updatedUser.name,
					email: updatedUser.email,
					isAdmin: updatedUser.isAdmin,
					token: generateToken(updatedUser._id),
				},
			});
		} else {
			res.status(401).json({
				status: 'error',
				message: 'User not found.',
			});
		}
	} catch (error) {
		next(new AppError(error.message, 401));
	}
}
