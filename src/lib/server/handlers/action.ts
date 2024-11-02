import { ActionError } from "@/lib/common/error";

export interface ActionResponse {
  errors?: Record<string, string[] | undefined | null>;
  error?: string;
  message?: string;
}

export function respondWithError(error: unknown): ActionResponse {
  if (error instanceof ActionError) {
    return {
      ...(error.fieldErrors && { errors: error.fieldErrors }),
      ...(error.error && { error: error.error }),
    };
  }

  throw error;
}

export function respondWithSuccess(message: string): ActionResponse {
  return {
    message,
  };
}
