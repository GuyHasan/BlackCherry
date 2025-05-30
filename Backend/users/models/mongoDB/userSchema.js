import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		minlength: 3,
		maxlength: 20,
		match: /^[a-zA-Z0-9@._-]+$/,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
		match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		select: false,
		match: /^(?=.{8,}$)(?=.*[A-Z])(?=.*[a-z])(?=(?:.*\d){4,})(?=.*[)!@%$#\^&*\-_\(\)]).*$/,
	},
	isEmployee: {
		type: Boolean,
		default: false,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	favorites: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
		},
	],
	refreshToken: {
		type: String,
		default: "",
	},
	resetPasswordToken: {
		type: String,
		default: null,
	},
	resetPasswordExpires: {
		type: Date,
		default: null,
	},
});

const User = mongoose.model("User", userSchema);

export default User;
