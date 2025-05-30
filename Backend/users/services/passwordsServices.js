import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function hashPassword(plainPassword) {
	const hashed = await bcrypt.hash(plainPassword, SALT_ROUNDS);
	return hashed;
}

export async function comparePasswords(plainPassword, hashedPassword) {
	return await bcrypt.compare(plainPassword, hashedPassword);
}
