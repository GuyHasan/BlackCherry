import connectToAtlasDb from "./mongoDB/connectAtlas.js";
import connectToLocalDb from "./mongoDB/connectCompass.js";
import config from "config";

const ENVIRONMENT = config.get("ENVIRONMENT");

const connectToDB = async () => {
	try {
		if (ENVIRONMENT === "development") {
			await connectToLocalDb();
		} else {
			await connectToAtlasDb();
		}
	} catch (err) {
		console.log("Failed to connect to MongoDB", err);
	}
};

export default connectToDB;
