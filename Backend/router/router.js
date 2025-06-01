import express from "express";

import userRouter from "../users/routes/usersRouter.js";
import authRouter from "../auth/routes/authRouter.js";
import productsRouter from "../products/routes/productsRouter.js";
import imageRouter from "../images/routes/imageRouter.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/products", productsRouter);
router.use("/images", imageRouter);

export default router;
