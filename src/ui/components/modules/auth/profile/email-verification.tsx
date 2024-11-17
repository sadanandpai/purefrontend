"use client";

import { sendVerificationEmailAction } from "@/server/actions/auth";
import { appContext } from "@/ui/context/app.context";
import { Button } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { toast } from "sonner";

export function EmailVerification() {
  const context = useContext(appContext);

  const { mutate, data, isPending } = useMutation({
    mutationFn: sendVerificationEmailAction,
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (!context.user || context.user.emailVerification) {
    return null;
  }

  return (
    <Button
      onClick={() => mutate()}
      loading={isPending}
      disabled={!!data?.message}
      title={
        data?.message
          ? "Verification email sent"
          : "Click to send verification email"
      }
    >
      Send verification email
    </Button>
  );
}
