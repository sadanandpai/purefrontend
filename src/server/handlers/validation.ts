import { GlobalError } from "@/common/types/globals";
import { ZodError } from "zod";

export function respondWithValidationError(error: unknown): never {
  if (error instanceof ZodError) {
    throw new GlobalError({
      fieldErrors: error.flatten().fieldErrors,
    });
  }

  throw error;
}
