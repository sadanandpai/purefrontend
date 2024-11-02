import { GlobalError } from "@/lib/common/types/globals";

export function respondWithDataAccessError(error: unknown): never {
  if (error instanceof Error) {
    throw new GlobalError({
      error: error.message,
    });
  }

  throw error;
}
