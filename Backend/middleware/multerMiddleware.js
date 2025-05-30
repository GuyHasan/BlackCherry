import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
	storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // מגבלת גודל 5MB
	fileFilter: (req, file, cb) => {
		const allowed = /jpeg|jpg|png|gif/;
		const mimetype = allowed.test(file.mimetype);
		const extname = allowed.test(file.originalname.toLowerCase());
		if (mimetype && extname) {
			return cb(null, true);
		}
		cb(new Error("סוג הקובץ לא נתמך — רק תמונות מותרות"));
	},
});

export default upload;
