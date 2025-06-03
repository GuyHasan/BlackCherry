export default function errorHandler(err, req, res, next) {
	const status = err.status || 500;
	const message = err.message || "Internal Server Error";
	const name = err.name || "Error";

	if (process.env.NODE_ENV !== "production") {
		if (status >= 500) {
			console.error("Internal Error:", err); // full stack trace
		} else {
			console.warn(`${status} ${name}: ${message}`); // cleaner log for expected errors
		}
	}

	res.status(status).json({
		success: false,
		error: name,
		message,
	});
}
