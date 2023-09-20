export function sum(...nums: number[]): number {
	return nums.reduce((acc, num) => acc + num, 0);
}
