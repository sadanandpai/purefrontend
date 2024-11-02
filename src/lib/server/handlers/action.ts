import { GlobalError, GlobalResponse } from "@/lib/common/types/globals";

export function respondWithError(error: unknown): GlobalResponse {
  if (error instanceof GlobalError) {
    return {
      ...(error.fieldErrors && { fieldErrors: error.fieldErrors }),
      ...(error.error && { error: error.error }),
    };
  }

  throw error;
}

export function respondWithSuccess(message: string): GlobalResponse {
  return {
    message,
  };
}
