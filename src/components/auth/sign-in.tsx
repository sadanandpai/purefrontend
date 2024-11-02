"use client";

import { useActionState } from "react";
import { signInWithEmail } from "@/lib/server/actions/auth";
import { EmailField, PasswordField } from "../common/fields";
import Link from "next/link";
import { OAuth } from "./oauth";
import { routes } from "@/lib/common/routes";
import { SubmitButton } from "@/components/common/submit-button";
import { ErrorField } from "@/components/common/error-field";
import classes from "./auth-form.module.scss";

export function SignIn() {
  const [state, formAction, pending] = useActionState(signInWithEmail, {});

  return (
    <div className={classes.authFormWrapper}>
      <form action={formAction} className={classes.authForm}>
        <div className="form-field">
          <EmailField />
          <ErrorField error={state.errors?.email?.[0]} />
        </div>

        <div className="form-field">
          <PasswordField />
          <ErrorField error={state.errors?.password?.[0]} />
        </div>

        <SubmitButton label="Sign in" pending={pending} />
        <ErrorField error={state.error} />
      </form>

      <div className={classes.authFormLinks}>
        <Link
          href={routes.forgotPassword}
          aria-disabled="true"
          className="disabled"
        >
          Forgot password?
        </Link>
        <Link href={routes.signUp}>Sign up</Link>
      </div>

      <OAuth />
    </div>
  );
}
