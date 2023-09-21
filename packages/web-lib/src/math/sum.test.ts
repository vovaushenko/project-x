import { describe, expect, it } from 'vitest';
import { sum } from './sum';

describe('Math - sum', () => {
	it('should add two numbers correctly', () => {
		expect(sum(1, 1)).toBe(2);
	});
	it('should add three numbers correctly', () => {
		expect(sum(1, 1, 1)).toBe(3);
	});
	it('should add negative numbers correctly', () => {
		expect(sum(-1, -1)).toBe(-2);
	});
});
