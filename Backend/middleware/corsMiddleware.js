import cors from "cors";

const corsMiddleware = cors({
	origin: ["https://localhost:5173", "https://127.0.0.1:5173"],
});

export default corsMiddleware;
