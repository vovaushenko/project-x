import { describe, it, expect } from 'vitest';
import { Validator } from '../validators/Validator';
import { StringValidatorStrategy } from '../strategies/text.validator';

describe('StringValidatorStrategy', () => {
  const BANNED_STRINGS = ['foo', 'bar', 'baz'];
  const stringValidator = new Validator(new StringValidatorStrategy(BANNED_STRINGS));

  it('properly validates allowed string ', async () => {
    const properString = 'good_string';

    const result = await stringValidator.validate(properString);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toBe(properString);
    }
  });

  it('properly validates string with banned string', async () => {
    const validationResults = await Promise.all(
      BANNED_STRINGS.map((bannedString) => stringValidator.validate(bannedString)),
    );
    expect(validationResults.every((result) => result.success === false)).toBe(true);
  });

  it('properly validate string with banned string in upper case', async () => {
    const validationResults = await Promise.all(
      BANNED_STRINGS.map((bannedString) => stringValidator.validate(bannedString.toUpperCase())),
    );
    expect(validationResults.every((result) => result.success === false)).toBe(true);
  });

  it('properly validates string with banned string in lower case', async () => {
    const validationResults = await Promise.all(
      BANNED_STRINGS.map((bannedString) => stringValidator.validate(bannedString.toLowerCase())),
    );
    expect(validationResults.every((result) => result.success === false)).toBe(true);
  });

  it('properly validates string that contain banned words', async () => {
    const validationResults = await Promise.all(
      ['sringfoohi, strbar, strbaz'].map((bannedString) =>
        stringValidator.validate(bannedString.toLowerCase()),
      ),
    );
    expect(validationResults.every((result) => result.success === false)).toBe(true);
  });

  it('properly validates non strings ', async () => {
    const items = [1, {}, [], null, undefined, true, false];

    const results = await Promise.all(items.map((item) => stringValidator.validate(item)));

    expect(results.every((result) => result.success === false)).toBe(true);
  });
});
