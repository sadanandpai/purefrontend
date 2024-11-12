"use client";

import { useActionState, useEffect, useState } from "react";
import { updateEmail } from "@/server/actions/auth";
import { toast } from "sonner";
import {
  EmailField,
  PasswordField,
} from "@/ui/pure-components/form/input-fields";
import { ErrorField } from "@/ui/pure-components/form/error-field";
import { Label } from "@radix-ui/react-label";
import classes from "./profile.module.scss";
import { Button } from "@radix-ui/themes";

interface Props {
  email: string;
}

export function EmailUpdate({ email }: Props) {
  const [newEmail, setNewEmail] = useState(email);
  const [state, formAction, pending] = useActionState(updateEmail, {});

  useEffect(() => {
    if (state.message) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className={classes.updateForm}>
      <Label htmlFor="email">Email</Label>

      <div>
        <EmailField value={newEmail} setValue={setNewEmail} />
        <ErrorField error={state.fieldErrors?.name?.[0]} />
      </div>

      <div>
        <PasswordField />
        <ErrorField error={state.fieldErrors?.name?.[0]} />
      </div>

      <div className={classes.submission}>
        <ErrorField error={state.fieldErrors?.name?.[0]} />
        <Button type="submit" loading={pending} disabled={newEmail === email}>
          Update Email
        </Button>
      </div>
    </form>
  );
}
