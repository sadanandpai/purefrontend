"use client";

import { useActionState, useEffect, useState } from "react";
import { updateEmail } from "@/server/actions/auth";
import { toast } from "sonner";
import {
  EmailField,
  PasswordField,
} from "@/ui/components/common/form/input-fields";
import { ErrorField } from "@/ui/components/common/form/error-field";
import { Label } from "@radix-ui/react-label";
import classes from "./profile.module.scss";
import { Badge, Button } from "@radix-ui/themes";

interface Props {
  email: string;
  emailVerification: boolean;
}

export function EmailUpdate({ email, emailVerification }: Props) {
  const [newEmail, setNewEmail] = useState(email);
  const [state, formAction, pending] = useActionState(updateEmail, {});

  useEffect(() => {
    if (state.message) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className={classes.updateForm}>
      <Label htmlFor="email" className={classes.emailLabel}>
        Email
        {emailVerification ? (
          <Badge color="green" variant="solid">
            Verified
          </Badge>
        ) : (
          <Badge color="red" variant="solid">
            Unverified
          </Badge>
        )}
      </Label>

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
