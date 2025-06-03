import express from "express";
import router from "./router/router.js";
import loggerMiddleware from "./utils/logger/loggerSelector.js";
import corsMiddleware from "./middleware/corsMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";
import { globalLimiter } from "./middleware/rateLimiters.js";
import helmet from "helmet";
import connectToDB from "./DB/dbServices.js";
import seedDB from "./utils/seedDb.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 8181;

app.set("trust proxy", 1);
app.use(helmet());
app.use(corsMiddleware);
app.use(loggerMiddleware);
app.use(globalLimiter);
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
app.use(errorHandler);

const startServer = async () => {
	try {
		await connectToDB();
		await seedDB();
		app.listen(PORT, () => {
			console.log(`Server is running on ${PORT}`);
		});
	} catch (error) {
		console.error("Error starting the server:", error);
	}
};

startServer();
