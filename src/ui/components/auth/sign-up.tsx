"use client";

import { useActionState } from "react";
import Link from "next/link";
import { OAuth } from "./oauth";
import { routes } from "@/common/routes";
import { signUpWithEmail } from "@/server/actions/auth";
import { ErrorField } from "@/ui/components/common/form/error-field";
import {
  EmailField,
  FullNameField,
  PasswordField,
} from "@/ui/components/common/form/input-fields";
import classes from "./auth-form.module.scss";
import { SubmitButton } from "@/ui/components/common/form/submit-button";

export function SignUp() {
  const [state, formAction, pending] = useActionState(signUpWithEmail, {});

  return (
    <div className={classes.authFormWrapper}>
      <form action={formAction} className={classes.authForm}>
        <div className="form-field">
          <FullNameField />
          <ErrorField error={state.fieldErrors?.name?.[0]} />
        </div>

        <div className="form-field">
          <EmailField />
          <ErrorField error={state.fieldErrors?.email?.[0]} />
        </div>

        <div className="form-field">
          <PasswordField />
          <ErrorField error={state.fieldErrors?.password?.[0]} />
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
