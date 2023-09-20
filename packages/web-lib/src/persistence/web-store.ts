export const WebStore = {
	get: (key: string) => {
		return localStorage.getItem(key);
	},
	set: (key: string, value: unknown) => {
		localStorage.setItem(key, JSON.stringify(value));
	},
};
