import { ZodError } from "zod";

export interface GlobalResponse {
  fieldErrors?: Record<string, string[] | undefined | null>;
  error?: string;
  message?: string;
}

export function respondWithError(error: unknown): GlobalResponse {
  if (error instanceof ZodError) {
    return {
      fieldErrors: error.flatten().fieldErrors,
    };
  }

  if (error instanceof Error) {
    return {
      error: error.message,
    };
  }

  throw error;
}

export function respondWithSuccess(message: string): GlobalResponse {
  return {
    message,
  };
}
