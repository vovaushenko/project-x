import type { Result } from '@project-x/common';
import { IValidationStrategy } from '../types/validation.types';

export class StringValidatorStrategy implements IValidationStrategy<string, string> {
  private readonly _prohibitedStrings: string[];

  constructor(prohibitedStrings: string[]) {
    this._prohibitedStrings = prohibitedStrings;
  }

  async validate(data: unknown): Promise<Result<string, string>> {
    if (typeof data !== 'string') {
      return {
        success: false,
        error: 'Data is not a string',
      };
    }

    for (const prohibitedString of this._prohibitedStrings) {
      if (
        data.includes(prohibitedString) ||
        data.includes(prohibitedString.toUpperCase()) ||
        data.includes(prohibitedString.toLowerCase()) ||
        data === prohibitedString
      ) {
        return {
          success: false,
          error: 'Data contains prohibited string',
        };
      }
    }

    return {
      success: true,
      value: data,
    };
  }
}
