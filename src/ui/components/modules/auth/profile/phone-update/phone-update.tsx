"use client";

import { useActionState, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Label } from "@radix-ui/react-label";
import { Button, Flex } from "@radix-ui/themes";
import {
  PasswordField,
  PhoneField,
} from "@/ui/components/common/form/input-fields";
import { ErrorField } from "@/ui/components/common/form/error-field";
import classes from "../profile.module.scss";
import { OTPUpdate } from "../otp-update/otp-update";
import { updatePhone } from "@/server/actions/user";
import { VerificationBadge } from "@/ui/components/core/verification-badge/verification-badge";
import { appContext } from "@/ui/context/app.context";

interface Props {
  phone: string;
  phoneVerification: boolean;
}

export function PhoneUpdate({ phone, phoneVerification }: Props) {
  const { resetLoggedInUser } = useContext(appContext);
  const [userPhone, setUserPhone] = useState(phone);
  const [inputPhone, setInputPhone] = useState(phone);
  const [isVerified, setIsVerified] = useState(phoneVerification);
  const [state, formAction, pending] = useActionState(updatePhone, {});

  useEffect(() => {
    if (state.status === "success") {
      resetLoggedInUser();
      setUserPhone(inputPhone);
      setIsVerified(false);
      toast.success(state.message);
    }
  }, [state]);

  useEffect(() => {
    setIsVerified(phoneVerification);
  }, [phoneVerification]);

  return (
    <form action={formAction} className={classes.updateForm}>
      <Flex gap="2" align="center">
        <Label htmlFor="phone">Phone</Label>
        <VerificationBadge isVerified={isVerified} />
      </Flex>

      <div>
        <PhoneField value={inputPhone} setValue={setInputPhone} />
        <ErrorField error={state.fieldErrors?.phone?.[0]} />
      </div>

      <div>
        <PasswordField
          field="userPassword"
          disabled={userPhone === inputPhone}
        />
        <ErrorField error={state.fieldErrors?.password?.[0]} />
      </div>

      <div className={classes.submission}>
        <ErrorField error={state.error} />
        <Flex gap="2">
          {!isVerified && <OTPUpdate />}
          <Button
            type="submit"
            loading={pending}
            disabled={userPhone === inputPhone}
          >
            Update Phone
          </Button>
        </Flex>
      </div>
    </form>
  );
}
