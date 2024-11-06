"use client";

import { updatePassword } from "@/server/actions/auth";
import { useActionState } from "react";
import {
  NewPasswordField,
  PasswordField,
} from "@/ui/components/common/form/input-fields";
import { ErrorField } from "@/ui/components/common/form/error-field";
import { SubmitButton } from "@/ui/components/common/form/submit-button";

export default function PasswordUpdate() {
  const [state, formAction, pending] = useActionState(updatePassword, {});

  return (
    <form action={formAction}>
      <div className="form-field">
        <PasswordField />
        <ErrorField error={state.fieldErrors?.password?.[0]} />
      </div>

      <div className="form-field">
        <NewPasswordField />
        <ErrorField error={state.fieldErrors?.newPassword?.[0]} />
      </div>

      <SubmitButton label="Update Password" pending={pending} />
      <ErrorField error={state.error} />

      {state.message && <p>{state.message}</p>}
    </form>
  );
}
