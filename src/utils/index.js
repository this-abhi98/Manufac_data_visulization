//Function to find and return mean of numbers
export const getMean = (array) => {
	let total = 0,
		count = 0;
	array.forEach(function (item, index) {
		total += item;
		count++;
	});
	return Math.round((total * 1000) / count) / 1000;
};

//Function to find and return median of numbers
export const getMedian = (array) => {
	const sortedArray = Array.from(array).sort((a, b) => a - b);
	const middle = Math.floor(sortedArray.length / 2);
	if (sortedArray.length % 2 === 0) {
		return (sortedArray[middle - 1] + sortedArray[middle]) / 2;
	}
	return Math.round(sortedArray[middle] * 1000) / 1000;
};

//Function to find and return mode of numbers
export const getMode = (array) => {
	let max = 0;
	let value = 0;
	let counts = {};
	for (let i = 0; i < array.length; i++) {
		counts[array[i]] = counts[array[i]] + 1 || 1;
	}
	for (let key in counts) {
		if (counts.hasOwnProperty(key)) {
			if (counts[key] > max) {
				max = counts[key];
				value = key;
			}
		}
	}
	return `${Math.round(value * 1000) / 1000}(${max})`;
};
