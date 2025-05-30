import Joi from "joi";

const imageSchema = Joi.object({
	url: Joi.string().uri().required(),
	alt: Joi.string().min(1).max(200).required(),
	publicId: Joi.string().required(),
	productId: Joi.string().optional(),
	uploadedBy: Joi.string().optional(),
});

const createImageSchema = Joi.object({
	altText: Joi.string().min(1).max(200).required(),
	file: Joi.object({
		buffer: Joi.binary().required(),
		originalname: Joi.string().required(),
	}).required(),
});

export function validateImage(imageData) {
	return imageSchema.validate(imageData, { abortEarly: false });
}

export function validateCreateImage(imageData) {
	return createImageSchema.validate(imageData, { abortEarly: false });
}
