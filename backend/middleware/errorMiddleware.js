module.exports.notFound = function (req, res, next) {
	const error = new Error(`Not Found -  ${req.originalUrl}`);
	next(error);
};

module.exports.errorHandler = function (err, req, res, next) {
	const error = res.statusCode === 200 ? 500 : res.statusCode;

	res.status(error);
	res.json({
		status: 'error',
		message: err.message,
		stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	});
};
