import express from "express";

import userRouter from "../users/routes/usersRouter";
import authRouter from "../auth/routes/authRouter";
import productsRouter from "../products/routes/productsRouter";
import imageRouter from "../images/routes/imageRouter";

const router = express.Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/products", productsRouter);
router.use("/images", imageRouter);

export default router;
