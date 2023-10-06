import { IValidationStrategy } from '../types/validation.types';

export class Validator<TSuccess, TFailure> {
  private validationStrategy: IValidationStrategy<TSuccess, TFailure>;

  constructor(strategy: IValidationStrategy<TSuccess, TFailure>) {
    this.validationStrategy = strategy;
  }

  async validate(data: unknown) {
    return this.validationStrategy.validate(data);
  }
}
