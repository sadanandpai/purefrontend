"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { OAuth } from "./oauth";
import { routes } from "@/common/routes";
import { signInWithEmail } from "@/server/actions/auth";
import {
  EmailField,
  PasswordField,
} from "@/ui/components/common/form/input-fields";
import { ErrorField } from "@/ui/components/common/form/error-field";
import classes from "./auth-form.module.scss";
import { Button } from "@radix-ui/themes";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [state, formAction, pending] = useActionState(signInWithEmail, {});

  return (
    <div className={classes.authFormWrapper}>
      <form action={formAction} className={classes.authForm}>
        <div className="form-field">
          <EmailField value={email} setValue={setEmail} />
          <ErrorField error={state.fieldErrors?.email?.[0]} />
        </div>

        <div className="form-field">
          <PasswordField />
          <ErrorField error={state.fieldErrors?.password?.[0]} />
        </div>

        <Button type="submit" loading={pending}>
          Sign in
        </Button>
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
