import express from "express";
import { validateRequest } from "../../middleware/validationMiddleware.js";
import authMiddleware from "../../middleware/authMiddleware.js";

import { getAllProductsController, getProductByIdController, createProductController, editProductController, deleteProductController } from "../../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProductsController);
router.post("/", authMiddleware, validateRequest("product"), createProductController);
router.get("/:id", getProductByIdController);
router.put("/:id", authMiddleware, validateRequest("product"), editProductController);
router.delete("/:id", authMiddleware, deleteProductController);

export default router;
