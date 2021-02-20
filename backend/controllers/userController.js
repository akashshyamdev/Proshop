const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');
const AppError = require('../utils/AppError.js');
const generateToken = require('../utils/generateToken.js');

// @description - authenticate user and get a token
// @route - POST /api/users/login
// @access - public

module.exports.login = async function (req, res, next) {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (user && (await user.matchPassword(password))) {
			res.json({
				status: 'success',
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
};

// @description - create and register a new user
// @route - POST /api/users/signup
// @access - public

module.exports.signup = async function ({ body }, res, next) {
	try {
		const { name, email, password } = body;

		const userExists = await User.findOne({ email });

		if (userExists) {
			next(new AppError('User already exists', 400));
		}

		const user = await User.create({ name, email, password });

		if (user) {
			res.status(201).json({
				status: 'success',
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
};

// @description - get all users
// @route - GET /api/users
// @access - private @admin

module.exports.getAllUsers = async function (req, res, next) {
	try {
		const users = await User.find();

		res.status(200).json({
			status: 'success',
			data: {
				users,
			},
		});
	} catch (error) {
		next(new AppError(error.message, 401));
	}
};

// @description - Get user profile
// @route - GET /api/users/profile
// @access - private

module.exports.getUser = async function ({ user }, res, next) {
	try {
		if (user) {
			res.status(200).json({
				status: 'success',
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
};

// @description - Get user by ID
// @route - GET /api/users/
// @access - private @admin
// @note - non-admins will use get profile

module.exports.getUserById = async function ({ params }, res, next) {
	try {
		const user = await User.findById(params.id).select('-password');

		if (!user) {
			res.status(404).json({
				status: 'error',
				message: 'No user found',
			});
		}

		res.status(200).json({
			status: 'success',
			data: {
				user,
			},
		});
	} catch (error) {
		next(new AppError(error.message, 500));
	}
};

// @description - Update user profile
// @route - PATCH /api/users/profile
// @access - private

module.exports.updateUser = async function ({ user, body }, res, next) {
	try {
		if (user) {
			user.name = body.name || user.name;
			user.email = body.email || user.email;

			if (body.password) {
				user.body.password = req.body.password;
			}

			const updatedUser = await user.save();

			res.json({
				status: 'success',
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
};

// @description - Update user by ID
// @route - PATCH /api/users/:id
// @access - private @admin

module.exports.updateUserById = async function ({ params, body, user }, res, next) {
	try {
		const user = await User.findById(params.id).select('-password');

		if (user) {
			user.name = body.name || user.name;
			user.email = body.email || user.name;
			user.isAdmin = body.isAdmin;

			const updatedUser = await user.save();

			res.status(201).json({
				status: 'success',
				data: {
					updatedUser,
				},
			});
		} else {
			res.status(404).json({
				status: 'error',
				message: 'User not found',
			});
		}
	} catch (error) {
		next(new AppError(error.message, 500));
	}
};

// @description - delete user
// @route - DELETE /api/users/
// @access - private @admin

module.exports.deleteUser = async function ({ params }, res, next) {
	try {
		const user = await User.findById(params.id);

		if (user) {
			await user.remove();

			res.status(204).json({
				status: 'success',
				data: null,
			});
		} else {
			next(new AppError('User not found', 404));
		}
	} catch (error) {
		console.log(error);
		next(new AppError(error.message, 500));
	}
};
