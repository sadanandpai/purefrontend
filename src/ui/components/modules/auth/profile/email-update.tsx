"use client";

import { useActionState, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  EmailField,
  PasswordField,
} from "@/ui/components/common/form/input-fields";
import { ErrorField } from "@/ui/components/common/form/error-field";
import { Label } from "@radix-ui/react-label";
import classes from "./profile.module.scss";
import { Button } from "@radix-ui/themes";
import { updateEmail } from "@/server/actions/user";
import { appContext } from "@/ui/context/app.context";
import { VerificationBadge } from "@/ui/components/core/verification-badge/verification-badge";

interface Props {
  email: string;
  emailVerification: boolean;
}

export function EmailUpdate({ email, emailVerification }: Props) {
  const { resetLoggedInUser } = useContext(appContext);
  const [newEmail, setNewEmail] = useState(email);
  const [state, formAction, pending] = useActionState(updateEmail, {});

  useEffect(() => {
    if (state.message) {
      toast.success(state.message);
      resetLoggedInUser();
    }
  }, [state]);

  return (
    <form action={formAction} className={classes.updateForm}>
      <Label htmlFor="email" className={classes.emailLabel}>
        Email
        <VerificationBadge isVerified={emailVerification} />
      </Label>

      <div>
        <EmailField value={newEmail} setValue={setNewEmail} />
        <ErrorField error={state.fieldErrors?.name?.[0]} />
      </div>

      <div>
        <PasswordField disabled={newEmail === email} />
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
