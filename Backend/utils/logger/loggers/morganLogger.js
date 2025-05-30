import morgan from "morgan";
import { currentTime } from "../../timeHelper.js";

const morganLogger = morgan(function (tokens, req, res) {
	if (res.statusCode >= 400) {
		return;
	}
	const { year, month, day, hour, minute, second } = currentTime();

	let message = [`${day}/${month}/${year} ${hour}:${minute}:${second}`, tokens.method(req, res), tokens.url(req, res), tokens.status(req, res), "-", tokens["response-time"](req, res), "ms"].join(" ");

	return message;
});

export default morganLogger;
