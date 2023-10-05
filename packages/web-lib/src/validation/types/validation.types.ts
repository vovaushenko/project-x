import type { Result } from '@project-x/common';

export interface IValidationStrategy<TSuccess, TFailure> {
  validate(data: unknown): Promise<Result<TSuccess, TFailure>>;
}
