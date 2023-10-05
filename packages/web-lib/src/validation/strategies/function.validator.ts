import { Result } from '@project-x/common';
import { IValidationStrategy } from '../types/validation.types';

type GenericFunction = (...args: unknown[]) => unknown;

export class FunctionValidationStrategy implements IValidationStrategy<GenericFunction, string> {
  constructor() {}

  async validate(data: unknown): Promise<Result<GenericFunction, string>> {
    if (typeof data !== 'function') {
      return {
        success: false,
        error: 'Data is not a function',
      };
    }

    return {
      success: true,
      value: data as GenericFunction,
    };
  }
}
