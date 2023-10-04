import { AVXErrorType, AVXErrorCode, ICreateAVXErrorDto } from './error.types';

export class AVXError extends Error {
  public readonly type: AVXErrorType;
  public readonly code: AVXErrorCode;
  public readonly message: string;
  public readonly timestamp: Date;
  public readonly details?: string | string[];
  public readonly metadata?: Record<string, unknown>;

  constructor(createAVXErrorDto: ICreateAVXErrorDto) {
    const { type, code, message, details, metadata } = createAVXErrorDto;
    super(message);

    this.type = type;
    this.code = code;
    this.message = message;
    this.details = details;
    this.timestamp = new Date();
    this.metadata = metadata;
  }
  toJSON() {
    return {
      type: this.type,
      code: this.code,
      message: this.message,
      timestamp: this.timestamp.toISOString(),
      details: this.details,
      metadata: this.metadata,
    };
  }
}
