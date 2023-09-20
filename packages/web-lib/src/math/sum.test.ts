import { describe, expect, it } from 'vitest';

describe('Math - sum', () => {
	it('should add two numbers correctly', () => {
		expect(1 + 1).toBe(2);
	});
	it('should add three numbers correctly', () => {
		expect(1 + 1 + 1).toBe(3);
	});
	it('should add negative numbers correctly', () => {
		expect(-1 + -1).toBe(-2);
	});
});
