import cloudService from "../services/cloudProvider.js";
import CustomError from "../utils/customError.js";
import imageServices from "../images/services/imageService.js";

const { createImage, getAllImages, deleteImage, getImageById } = imageServices;
const { cloudUploadImage, cloudDeleteImage } = cloudService;

export async function uploadImageController(req, res, next) {
	try {
		if (!req.file || !req.file.buffer || !req.file.originalname) {
			return next(new CustomError("No image file provided", 400, "Validation Error"));
		}
		const { altText } = req.body;
		if (!altText) {
			return next(new CustomError("Alt text is required", 400, "Validation Error"));
		}
		const uploaderId = req.user.id;
		const fileBuffer = req.file.buffer;
		const fileName = req.file.originalname;
		const cloudImage = await cloudUploadImage(fileBuffer, fileName);
		if (!cloudImage || !cloudImage.public_id) {
			return next(new CustomError("Failed to upload image to cloud", 500, "Cloud Upload Error"));
		}
		const imageData = {
			altText,
			url: cloudImage.url,
			publicId: cloudImage.public_id,
			uploaderId,
		};
		const newImage = await createImage(imageData);
		if (!newImage) {
			return next(new CustomError("Failed to save image data", 500, "Database Error"));
		}
		res.status(201).json({
			success: true,
			message: "Image uploaded successfully",
			image: newImage,
		});
	} catch (error) {
		return next(new CustomError("Image upload failed", 500, error));
	}
}

export async function getAllImagesController(req, res, next) {
	try {
		const { page = 1, limit = 50 } = req.query;
		const result = await getAllImages(page, limit);
		res.status(200).json(result);
	} catch (error) {
		next(new CustomError("Failed to retrieve images", 500, error));
	}
}

export async function getImageByIdController(req, res, next) {
	try {
		const imageId = req.params.id;
		const image = await getImageById(imageId);
		if (!image) {
			return next(new CustomError("Image not found", 404, "Not Found"));
		}
		res.status(200).json({ success: true, image });
	} catch (error) {
		next(new CustomError("Failed to retrieve image", 500, error));
	}
}

export async function deleteImageController(req, res, next) {
	try {
		const imageId = req.params.id;
		const image = await getImageById(imageId);
		if (!image) {
			return next(new CustomError("Image not found", 404, "Not Found"));
		}
		await deleteImage(imageId);
		await cloudDeleteImage(image.publicId);
		res.status(200).json({ success: true, message: "Image deleted" });
	} catch (error) {
		next(new CustomError("Failed to delete image", 500, error));
	}
}
