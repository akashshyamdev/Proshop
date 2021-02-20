const AppError = require('../utils/AppError.js');

module.exports = async function (req, res, next) {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		next(new AppError('You must be an admin to access this route', 403));
	}
};
