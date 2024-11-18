"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Label } from "@radix-ui/react-label";
import { Badge, Button, Flex } from "@radix-ui/themes";
import {
  PasswordField,
  PhoneField,
} from "@/ui/components/common/form/input-fields";
import { ErrorField } from "@/ui/components/common/form/error-field";
import classes from "./profile.module.scss";
import { OTPUpdate } from "./otp-update";
import { updatePhone } from "@/server/actions/user";

interface Props {
  phone: string;
  phoneVerification: boolean;
}

export function PhoneUpdate({ phone, phoneVerification }: Props) {
  const [phoneInput, setPhoneInput] = useState(phone);
  const [state, formAction, pending] = useActionState(updatePhone, {});

  useEffect(() => {
    if (state.message) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className={classes.updateForm}>
      <Flex gap="2" align="center">
        <Label htmlFor="phone">Phone</Label>
        {phoneVerification ? (
          <Badge color="green" variant="solid">
            Verified
          </Badge>
        ) : (
          <Badge color="orange" variant="solid">
            Unverified
          </Badge>
        )}
      </Flex>

      <div>
        <PhoneField value={phoneInput} setValue={setPhoneInput} />
        <ErrorField error={state.fieldErrors?.phone?.[0]} />
      </div>

      <div>
        <PasswordField disabled={phone === phoneInput} />
        <ErrorField error={state.fieldErrors?.password?.[0]} />
      </div>

      <div className={classes.submission}>
        <ErrorField error={state.error} />
        <Flex gap="2">
          {!phoneVerification && <OTPUpdate />}
          <Button
            type="submit"
            loading={pending}
            disabled={phone === phoneInput}
          >
            Update Phone
          </Button>
        </Flex>
      </div>
    </form>
  );
}
