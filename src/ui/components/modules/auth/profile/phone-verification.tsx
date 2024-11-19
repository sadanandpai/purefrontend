"use client";

import { sendPhoneVerificationAction } from "@/server/actions/user";
import { appContext } from "@/ui/context/app.context";
import { Button } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { toast } from "sonner";

export function PhoneVerification() {
  const { user, resetLoggedInUser } = useContext(appContext);

  const { mutate, data, isPending } = useMutation({
    mutationFn: sendPhoneVerificationAction,
    onSuccess: (response) => {
      toast.success(response.message);
      resetLoggedInUser();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (!user || user.phoneVerification) {
    return null;
  }

  return (
    <Button
      onClick={() => mutate()}
      loading={isPending}
      disabled={!!data?.message}
      title={
        data?.message
          ? "Verification SMS sent"
          : "Click to send verification SMS"
      }
    >
      Send verification SMS
    </Button>
  );
}
