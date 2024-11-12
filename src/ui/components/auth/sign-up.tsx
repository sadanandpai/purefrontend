"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { OAuth } from "./oauth";
import { routes } from "@/common/routes";
import { Button } from "@radix-ui/themes";
import { signUpWithEmail } from "@/server/actions/auth";
import { ErrorField } from "@/ui/pure-components/form/error-field";
import {
  EmailField,
  FullNameField,
  PasswordField,
} from "@/ui/pure-components/form/input-fields";
import classes from "./auth-form.module.scss";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, formAction, pending] = useActionState(signUpWithEmail, {});

  return (
    <div className={classes.authFormWrapper}>
      <form action={formAction} className={classes.authForm}>
        <div className="form-field">
          <FullNameField setValue={setName} value={name} />
          <ErrorField error={state.fieldErrors?.name?.[0]} />
        </div>

        <div className="form-field">
          <EmailField setValue={setEmail} value={email} />
          <ErrorField error={state.fieldErrors?.email?.[0]} />
        </div>

        <div className="form-field">
          <PasswordField />
          <ErrorField error={state.fieldErrors?.password?.[0]} />
        </div>

        <Button type="submit" loading={pending}>
          Sign up
        </Button>
        <ErrorField error={state.error} />
      </form>

      <div className={classes.authFormLinks}>
        <Link href={routes.signIn}>Sign in</Link>
      </div>

      <OAuth />
    </div>
  );
}
