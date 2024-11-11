"use client";

import { updatePassword } from "@/server/actions/auth";
import { useActionState, useEffect } from "react";
import {
  NewPasswordField,
  PasswordField,
} from "@/ui/pure-components/form/input-fields";
import { ErrorField } from "@/ui/pure-components/form/error-field";
import { SubmitButton } from "@/ui/pure-components/form/submit-button";
import classes from "./profile.module.scss";
import { Label } from "@radix-ui/react-label";
import { toast } from "sonner";

export function PasswordUpdate() {
  const [state, formAction, pending] = useActionState(updatePassword, {});

  useEffect(() => {
    if (state.message) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className={classes.updateForm}>
      <Label htmlFor="password">Password</Label>
      <div>
        <PasswordField />
        <ErrorField error={state.fieldErrors?.password?.[0]} />
      </div>

      <div>
        <NewPasswordField />
        <ErrorField error={state.fieldErrors?.newPassword?.[0]} />
      </div>

      <div className={classes.submission}>
        <ErrorField error={state.error} />
        <SubmitButton label="Update Password" pending={pending} />
      </div>
    </form>
  );
}
