import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectionStringForAtlas = process.env.ATLAS_CONNECTION_STRING;

const connectToAtlasDb = async () => {
	try {
		await mongoose.connect(connectionStringForAtlas);
		console.log("Connected to MongoDB in Atlas");
	} catch (err) {
		console.log("Failed to connect to MongoDB", err);
	}
};

export default connectToAtlasDb;
