import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
	api_key: process.env.CLOUDINARY_API_KEY || "",
	api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

function cloudUploadImage(buffer, originalName) {
	return new Promise((resolve, reject) => {
		const publicId = originalName.replace(/\.[^/.]+$/, "") + "-" + Date.now();
		const uploadStream = cloudinary.uploader.upload_stream(
			{
				folder: "products",
				resource_type: "image",
				public_id: publicId,
				eager: [{ width: 800, height: 800, crop: "limit" }],
			},
			(error, result) => {
				if (error) return reject(error);
				resolve({ url: result.secure_url, publicId: result.public_id });
			}
		);

		uploadStream.end(buffer);
	});
}

function cloudDeleteImage(publicId) {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.destroy(publicId, (error, result) => {
			if (error) return reject(error);
			resolve(result);
		});
	});
}

const cloundryServices = {
	cloudUploadImage,
	cloudDeleteImage,
};
export default cloundryServices;
