const addZero = (num) => {
	return num < 10 ? `0${num}` : num;
};
const now = new Date();

const currentTime = () => {
	let result = {
		year: now.getFullYear(),
		month: now.getMonth() + 1,
		day: now.getDate(),
		hour: now.getHours(),
		minute: now.getMinutes(),
		second: now.getSeconds(),
	};

	for (let key in result) {
		result[key] = addZero(result[key]);
	}

	return result;
};

export { currentTime };
