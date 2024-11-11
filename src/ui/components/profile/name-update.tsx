"use client";

import { updateName } from "@/server/actions/auth";
import { useActionState, useEffect, useState } from "react";
import { FullNameField } from "@/ui/pure-components/form/input-fields";
import { ErrorField } from "@/ui/pure-components/form/error-field";
import { SubmitButton } from "@/ui/pure-components/form/submit-button";
import { Label } from "@radix-ui/react-label";
import { toast } from "sonner";
import classes from "./profile.module.scss";

interface Props {
  name: string;
}

export function NameUpdate({ name }: Props) {
  const [fullName, setFullName] = useState(name);
  const [state, formAction, pending] = useActionState(updateName, {});

  useEffect(() => {
    if (state.message) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className={classes.updateForm}>
      <Label htmlFor="name">Full name</Label>
      <div>
        <FullNameField value={fullName} setValue={setFullName} />
        <ErrorField error={state.fieldErrors?.name?.[0]} />
      </div>

      <div className={classes.submission}>
        <ErrorField error={state.error} />
        <SubmitButton pending={pending} label="Update Name" />
      </div>
    </form>
  );
}
