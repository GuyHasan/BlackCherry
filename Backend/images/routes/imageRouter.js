// imageRoutes.js
import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import upload from "../../middleware/multerMiddleware.js";
import { deleteImageController, getAllImagesController, getImageByIdController, uploadImageController } from "../../controllers/imageController.js";
import { validateRequest } from "../../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/upload", authMiddleware, upload.single("image"), validateRequest("createImage"), uploadImageController);
router.get("/", authMiddleware, getAllImagesController);
router.get("/:id", authMiddleware, getImageByIdController);
router.delete("/:id", authMiddleware, deleteImageController);

export default router;
