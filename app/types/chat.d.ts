export interface ValidationError {
  filename: string;
}

export interface ChatData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response?: Record<string, any>;
  errors?: ValidationError;
}
