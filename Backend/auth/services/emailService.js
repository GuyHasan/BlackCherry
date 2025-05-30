import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST, // למשל smtp.gmail.com או smtp של שירות אחר
	port: process.env.SMTP_PORT, // 587 או 465 בדרך כלל
	secure: false, // true אם משתמש ב־SSL (פורט 465)
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
});

export async function sendResetPasswordEmail(email, resetLink) {
	const mailOptions = {
		from: `"Black Cherry" <${process.env.SMTP_USER}>`,
		to: email,
		subject: "Reset your password",
		html: `
      <p>Hi,</p>
      <p>You requested a password reset. Click the link below to set a new password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>If you did not request this, please ignore this email.</p>
    `,
	};

	return transporter.sendMail(mailOptions);
}
