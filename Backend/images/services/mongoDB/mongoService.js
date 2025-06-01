import { handleServiceError } from "../../../utils/errorsHandlers.js";
import Image from "../../models/mongoDB/imageSchema.js";

const createImage = async (imageData) => {
	try {
		const newImage = new Image(imageData);
		await newImage.save();
		return newImage;
	} catch (error) {
		handleServiceError(error, "Error creating image");
	}
};

const getAllImages = async (page = 1, limit = 50) => {
	try {
		const skip = (page - 1) * limit;
		const images = await Image.find().skip(skip).limit(limit);
		const totalImages = await Image.countDocuments();
		return {
			images,
			total: totalImages,
			page,
			totalPages: Math.ceil(totalImages / limit),
		};
	} catch (error) {
		handleServiceError(error, "Error retrieving images");
	}
};

const getImageById = async (imageId) => {
	try {
		const image = await Image.findById(imageId);
		if (!image) {
			throw new CustomError("Image not found", 404, "Not Found");
		}
		return image;
	} catch (error) {
		handleServiceError(error, "Error retrieving image by ID");
	}
};

const deleteImage = async (imageId) => {
	try {
		const result = await Image.findByIdAndDelete(imageId);
		if (!result) {
			throw new CustomError("Image not found", 404, "Not Found");
		}
		return result;
	} catch (error) {
		handleServiceError(error, "Error deleting image");
	}
};

const mongoService = {
	createImage,
	getAllImages,
	getImageById,
	deleteImage,
};

export default mongoService;
