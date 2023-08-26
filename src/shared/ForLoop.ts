export const ForLoop = (array: any, call_back: any): any => {
	for (let index = 0; index < array.length; index++) {
		const element = array[index];
		call_back(element, index, array);
	}
};
