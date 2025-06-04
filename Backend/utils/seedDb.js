import User from "../users/models/mongoDB/userSchema.js";
import Product from "../products/models/mongoDB/productSchema.js";
import { hashPassword } from "../users/services/passwordsServices.js";
import { exampleData } from "../config/constants/exampleData.js";
import dotenv from "dotenv";

dotenv.config();

const adminPassword = process.env.ADMIN_PASSWORD || "admin1234567";
const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
const useExampleData = process.env.USE_EXAMPLE_DATA;
const seedDB = async () => {
	const userCount = await User.countDocuments();
	if (userCount > 0) {
		console.log("Database already seeded. Skipping...");
		return;
	}

	const hashedPassword = await hashPassword(adminPassword);
	const adminUser = new User({
		username: "admin",
		email: adminEmail,
		password: hashedPassword,
		isAdmin: true,
		isEmployee: false,
	});

	await adminUser.save();
	console.log("✅ Admin user seeded successfully");

	const productCount = await Product.countDocuments();
	if (productCount > 0) {
		console.log("Products already seeded. Skipping...");
		return;
	}
	if (!useExampleData) {
		console.log("chosen not to use example data, skipping product seeding");
		return;
	}
	if (useExampleData) {
		const products = exampleData.map((product) => ({
			...product,
			size: product.size.map((size) => ({
				quantity: size.quantity,
				price: size.price,
			})),
		}));

		await Product.insertMany(products);
		console.log("✅ Example products seeded successfully");
	}
};

export default seedDB;
