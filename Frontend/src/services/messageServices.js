import { Bounce, toast } from "react-toastify";

export const errorMessage = (message) => {
	toast.error(message, {
		position: "top-center",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: false,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		transition: Bounce,
	});
};

export const successMessage = (message) => {
	toast.success(message, {
		position: "top-center",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: false,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		transition: Bounce,
	});
};
