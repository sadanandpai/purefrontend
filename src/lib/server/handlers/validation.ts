import { ActionError } from "@/lib/common/error";
import { ZodError } from "zod";

export function handleValidationError(error: unknown): never {
  if (error instanceof ZodError) {
    throw new ActionError({
      fieldErrors: error.flatten().fieldErrors,
    });
  }

  throw error;
}
