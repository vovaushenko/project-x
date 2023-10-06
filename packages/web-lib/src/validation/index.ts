import { StringValidatorStrategy } from './strategies/text.validator';
import { Validator } from './validators/Validator';

export async function validateString(string: string, prohibitedStrings?: string[]) {
  const banned = prohibitedStrings || ['foo', 'bar', 'baz'];
  return await new Validator(new StringValidatorStrategy(banned)).validate(string);
}
