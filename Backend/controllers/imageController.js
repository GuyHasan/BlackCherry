import cloudService from "../services/cloudProvider.js";
import CustomError from "../utils/customError.js";
import imageServices from "../images/services/imageService.js";
import validators from "../validation/validator.js";
import { handleControllerError } from "../utils/errorsHandlers.js";

const { createImage, getAllImages, deleteImage, getImageById } = imageServices;
const { cloudUploadImage, cloudDeleteImage } = cloudService;

export async function uploadImageController(req, res, next) {
	try {
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
		const valid = validators.image(imageData);
		if (valid.error) {
			const errorMessage = valid.error.details.map((detail) => detail.message).join(", ");
			return next(new CustomError(`Validation Error: ${errorMessage}`, 400, "Validation Error"));
		}
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
		handleControllerError(error, next, "Failed to upload image");
	}
}

export async function getAllImagesController(req, res, next) {
	try {
		const { page = 1, limit = 50 } = req.query;
		const result = await getAllImages(page, limit);
		res.status(200).json(result);
	} catch (error) {
		handleControllerError(error, next, "Failed to retrieve images");
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
		handleControllerError(error, next, "Failed to retrieve image by ID");
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
		handleControllerError(error, next, "Failed to delete image");
	}
}
