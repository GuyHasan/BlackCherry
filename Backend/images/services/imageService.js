// services/imageService.js
import Image from "../images/models/mongoDB/imageSchema.js";
import cloudService from "./uploadClouds/cloudProvider.js";
import CustomError from "../utils/customError.js";

/**
 * מעלה תמונה ל-Cloudinary ושומר ב-DB
 * @param {Buffer} buffer - תוכן הבייטים של הקובץ
 * @param {String} originalName - שם המקורי של הקובץ
 * @param {String} altText - טקסט אלטרנטיבי
 * @param {ObjectId} uploaderId - מזהה המייל איי די (מ-req.user.id)
 */
export async function uploadImage(buffer, originalName, altText, uploaderId) {
	try {
		const url = await cloudService.uploadImage(buffer, originalName);
		if (!url) {
			throw new CustomError("Image upload failed", 500, "UploadError");
		}

		const image = await Image.create({
			url,
			alt: altText,
			productId: null,
			uploadedBy: uploaderId,
		});
		return image;
	} catch (error) {
		if (error instanceof CustomError) throw error;
		throw new CustomError(`Error uploading image: ${error.message}`, 500, "ServerError");
	}
}

/**
 * מחזיר רשימת תמונות עם pagination
 * @param {Number} page
 * @param {Number} limit
 */
export async function getAllImages(page = 1, limit = 50) {
	try {
		const pageNum = Math.max(1, parseInt(page, 10));
		const limitNum = Math.max(1, parseInt(limit, 10));
		const skip = (pageNum - 1) * limitNum;

		// שליפת תמונות ממסד הנתונים
		const [images, totalCount] = await Promise.all([Image.find().sort({ createdAt: -1 }).skip(skip).limit(limitNum).exec(), Image.countDocuments()]);

		return {
			success: true,
			images,
			pagination: {
				page: pageNum,
				limit: limitNum,
				totalPages: Math.ceil(totalCount / limitNum),
				totalCount,
			},
		};
	} catch (error) {
		throw new CustomError(`Error fetching images: ${error.message}`, 500, "ServerError");
	}
}

/**
 * מוחק תמונה – בודק שהיא קיימת, מוחק אותה בענן, ואז בבסיס הנתונים
 * @param {String} imageId
 */
export async function deleteImage(imageId) {
	try {
		const image = await Image.findById(imageId);
		if (!image) {
			throw new CustomError(`Image with ID ${imageId} not found`, 404, "NotFoundError");
		}

		// חיתוך publicId מתוך ה-URL (לפי פורמט Cloudinary)
		// למשל: https://res.cloudinary.com/.../products/myimage-12345.jpg
		const parts = image.url.split("/");
		const fileWithExt = parts.pop(); // "myimage-12345.jpg"
		const publicId = `products/${fileWithExt.substring(0, fileWithExt.lastIndexOf("."))}`;

		// מחיקה בענן
		await cloudService.deleteImage(publicId);

		// מחיקה ב-DB
		await Image.findByIdAndDelete(imageId);

		return { success: true, message: "Image deleted successfully" };
	} catch (error) {
		if (error instanceof CustomError) throw error;
		throw new CustomError(`Error deleting image: ${error.message}`, 500, "ServerError");
	}
}

export default {
	uploadImage,
	getAllImages,
	deleteImage,
};
