import { z } from "zod";

export const nameSchema = z.string().min(3).max(50).trim();
export const emailSchema = z.string().email().trim().toLowerCase();
export const passwordSchema = z.string().min(8).max(20).trim();

export type SignInSchemaErrors = z.inferFlattenedErrors<
  typeof signInSchema
>["fieldErrors"];

export type SignUpSchemaErrors = z.inferFlattenedErrors<
  typeof signUpSchema
>["fieldErrors"];

export type UpdatePasswordSchemaErrors = z.inferFlattenedErrors<
  typeof updatePasswordSchema
>["fieldErrors"];

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const updatePasswordSchema = z.object({
  password: passwordSchema,
  newPassword: passwordSchema,
});
