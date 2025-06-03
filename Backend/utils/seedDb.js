import User from "../users/models/mongoDB/userSchema.js";
import { hashPassword } from "../users/services/passwordsServices.js";
import dotenv from "dotenv";
dotenv.config();

const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
const seedDB = async () => {
	const userCount = await User.countDocuments();
	if (userCount > 0) {
		console.log("Database already seeded. Skipping...");
		return;
	}

	const hashedPassword = await hashPassword(adminPassword);
	const adminUser = new User({
		username: "admin",
		email: "admin@example.com",
		password: hashedPassword,
		isAdmin: true,
		isEmployee: false,
	});

	await adminUser.save();
	console.log("✅ Admin user seeded successfully");
};

export default seedDB;
