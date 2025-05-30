// imageRoutes.js
import express from "express";
import { uploadImageHandler } from "../services/imageService.js";
import authMiddleware from "../../auth/jwt/authMiddleware.js";
import upload from "../../middleware/multerMiddleware.js";

const router = express.Router();

router.post("/upload", authMiddleware, upload.single("image"), uploadImageHandler);

export default router;
