import bcrypt from "bcrypt";
import User from "../users/models/mongoDB/userSchema.js";

const seedDB = async () => {
	const userCount = await User.countDocuments();
	if (userCount > 0) {
		console.log("Database already seeded. Skipping...");
		return;
	}

	const hashedPassword = bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
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
