export interface GlobalResponse {
  fieldErrors?: Record<string, string[] | undefined | null>;
  error?: string;
  message?: string;
}

export class GlobalError extends Error {
  fieldErrors?: GlobalResponse["fieldErrors"];
  error?: GlobalResponse["error"];

  constructor({ fieldErrors, error }: GlobalResponse) {
    super();
    this.fieldErrors = fieldErrors;
    this.error = error;
  }
}
