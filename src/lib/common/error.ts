type FieldErrors = Record<string, string[] | undefined | null>;

export interface ActionErrorType {
  fieldErrors?: FieldErrors;
  error?: string | null;
}

export class ActionError extends Error {
  fieldErrors?: FieldErrors;
  error?: string | null;

  constructor({ fieldErrors, error }: ActionErrorType) {
    super();
    this.fieldErrors = fieldErrors;
    this.error = error;
  }
}
