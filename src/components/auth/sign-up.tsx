"use client";

import { useActionState } from "react";
import Link from "next/link";
import { OAuth } from "./oauth";
import { routes } from "@/lib/common/routes";
import { signUpWithEmail } from "@/lib/server/actions/auth";
import { ErrorField } from "@/components/common/error-field";
import {
  EmailField,
  FullNameField,
  PasswordField,
} from "@/components/common/fields";
import classes from "./auth-form.module.scss";
import { SubmitButton } from "../common/submit-button";

export function SignUp() {
  const [state, formAction, pending] = useActionState(signUpWithEmail, {});

  return (
    <div className={classes.authFormWrapper}>
      <form action={formAction} className={classes.authForm}>
        <div className="form-field">
          <FullNameField />
          <ErrorField error={state.errors?.name?.[0]} />
        </div>

        <div className="form-field">
          <EmailField />
          <ErrorField error={state.errors?.email?.[0]} />
        </div>

        <div className="form-field">
          <PasswordField />
          <ErrorField error={state.errors?.password?.[0]} />
        </div>

        <SubmitButton label="Sign up" pending={pending} />
        <ErrorField error={state.error} />
      </form>

      <div className={classes.authFormLinks}>
        <Link href={routes.signIn}>Sign in</Link>
      </div>

      <OAuth />
    </div>
  );
}
