import { describe, it, expect } from 'vitest';
import { Validator } from '../validators/Validator';
import { FunctionValidationStrategy } from '../strategies/function.validator';

describe('FunctionValidationStrategy', () => {
  it('properly validates function ', async () => {
    function definitelyFunction() {}

    const functionValidator = new Validator(new FunctionValidationStrategy());

    const result = await functionValidator.validate(definitelyFunction);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toBe(definitelyFunction);
    }
  });

  it('properly validates non functions ', async () => {
    const items = [1, 'foo', {}, [], null, undefined, true, false];

    const functionValidator = new Validator(new FunctionValidationStrategy());

    const results = await Promise.all(items.map((item) => functionValidator.validate(item)));

    expect(results.every((result) => result.success === false)).toBe(true);
  });
});
