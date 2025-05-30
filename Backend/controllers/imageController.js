import Image from "../images/models/mongoDB/imageSchema.js";
import cloudService from "../services/uploadClouds/cloudProvider.js";
import CustomError from "../utils/customError.js";

export async function uploadImageController(req, res, next) {
	try {
		const buffer = req.file?.buffer;
		const originalName = req.file?.originalname;

		if (!buffer || !originalName) {
			throw new Error("No image file provided");
		}

		const url = await cloudService.uploadImage(buffer, originalName);

		const image = await Image.create({
			url,
			uploadedBy: req.user.id,
		});

		res.status(201).json({ success: true, image });
	} catch (error) {
		return next(new CustomError("Image upload failed", 500, error));
	}
}

export async function getAllImagesController(req, res, next) {
	try {
		const { page = 1, limit = 50 } = req.query;
		const result = await imageService.getAllImages(page, limit);
		res.status(200).json(result);
	} catch (error) {
		next(new CustomError("Failed to retrieve images", 500, error));
	}
}

export async function deleteImageController(req, res, next) {
	try {
		const imageId = req.params.id;
		await imageService.deleteImage(imageId);
		res.status(200).json({ success: true, message: "Image deleted" });
	} catch (error) {
		next(new CustomError("Failed to delete image", 500, error));
	}
}
