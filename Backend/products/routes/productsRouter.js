import express from "express";
import { validateRequest } from "../../middleware/validationMiddleware.js";
import authMiddleware from "../../middleware/authMiddleware.js";

import { getAllProductsController, getProductByIdController, createProductController, editProductController, deleteProductController, getMenuPreviewController } from "../../controllers/productController.js";
import { getCategoriesList } from "../../controllers/categoriesController.js";

const router = express.Router();

router.get("/", getAllProductsController);
router.post("/", authMiddleware, validateRequest("product"), createProductController);
router.get("/category", getCategoriesList);
router.get("/menu-preview", getMenuPreviewController);
router.get("/:id", getProductByIdController);
router.put("/:id", authMiddleware, validateRequest("product"), editProductController);
router.delete("/:id", authMiddleware, deleteProductController);

export default router;
