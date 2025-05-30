// imageModel.js
import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
	{
		url: {
			type: String,
			required: true,
		},
		alt: {
			type: String,
			default: "",
			required: true,
		},
		publicId: {
			type: String,
			required: true,
		},
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			default: null,
		},
		uploadedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);
export default Image;
