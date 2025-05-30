import mongoose from "mongoose";

const connectToLocalDb = async () => {
	try {
		await mongoose.connect("mongodb://localhost:27017/BCardServerProject");
		console.log("Connected to MongoDB locally");
	} catch (err) {
		console.log("Failed to connect to MongoDB", err);
	}
};

export default connectToLocalDb;
