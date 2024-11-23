import { useContext } from "react";
import { useActiveCode } from "@codesandbox/sandpack-react/unstyled";
import { submitUserSubmission } from "@/server/actions/submissions";
import { useMutation } from "@tanstack/react-query";
import { appContext } from "@/ui/context/app.context";
import { usePathname } from "next/navigation";
import { routes } from "@/common/routes";
import { Button } from "@radix-ui/themes";
import { RadixNextLink } from "@/ui/components/core/radix-next-link/radix-next-link";

interface SubmissionMutationProps {
  challengeId: number;
  code: string;
  status: boolean;
}

interface Props {
  status?: boolean;
  disabled?: boolean;
  onSubmit?: () => void;
}

export function SaveSubmission({ status, onSubmit, disabled }: Props) {
  const { user } = useContext(appContext);
  const { code } = useActiveCode();
  const challengeId = Number(usePathname().split("/").at(-1));

  const { mutate, isPending } = useMutation({
    mutationFn: ({ challengeId, code, status }: SubmissionMutationProps) =>
      submitUserSubmission(challengeId, code, status),
    onSuccess: () => {
      onSubmit?.();
    },
  });

  async function saveSubmission() {
    if (status !== undefined && !isPending) {
      mutate({ challengeId, code, status });
    }
  }

  if (!user) {
    return (
      <p>
        Please&nbsp;
        <RadixNextLink
          href={`${routes.signIn}?redirect=${routes.challenges}/${challengeId}`}
        >
          Sign in
        </RadixNextLink>
        &nbsp;to save your submission
      </p>
    );
  }

  if (!user.emailVerification) {
    return (
      <p>
        Please&nbsp;
        <RadixNextLink href={routes.profile}>verify your email</RadixNextLink>
        &nbsp;to save your submission
      </p>
    );
  }

  return (
    <Button
      onClick={saveSubmission}
      disabled={disabled || isPending}
      loading={isPending}
    >
      Save Submission
    </Button>
  );
}
