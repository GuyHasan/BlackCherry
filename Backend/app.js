import express from "express";
import router from "./router/router.js";
import loggerMiddleware from "./utils/logger/loggerSelector.js";
import corsMiddleware from "./middleware/corsMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";
import { globalLimiter } from "./middleware/rateLimiters.js";
import helmet from "helmet";

const app = express();
const PORT = 8181;

app.set("trust proxy", 1);
app.use(helmet());
app.use(corsMiddleware);
app.use(loggerMiddleware);
app.use(globalLimiter);
app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
