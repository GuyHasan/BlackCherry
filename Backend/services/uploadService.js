import cloudService from "./uploadClouds/cloudProvider.js";

async function uploadImageToCloud(fileBuffer, fileName) {
	return await cloudService.uploadImage(fileBuffer, fileName);
}

async function deleteImageFromCloud(publicId) {
	return await cloudService.deleteImage(publicId);
}

export default {
	uploadImageToCloud,
	deleteImageFromCloud,
};
