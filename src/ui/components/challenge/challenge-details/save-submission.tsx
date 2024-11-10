import { useContext } from "react";
import { useActiveCode } from "@codesandbox/sandpack-react";
import { submitUserSubmission } from "@/server/actions/submissions";
import { useMutation } from "@tanstack/react-query";
import { appContext } from "@/ui/context/app.context";
import { usePathname } from "next/navigation";
import { routes } from "@/common/routes";
import Link from "next/link";

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
  const context = useContext(appContext);
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
    if (status !== undefined) {
      mutate({ challengeId, code, status });
    }
  }

  if (!context.user) {
    return (
      <p>
        Please&nbsp;<Link href={routes.signIn}>Sign in</Link>&nbsp;to save your
        submission
      </p>
    );
  }

  return (
    <button
      className="btn"
      onClick={saveSubmission}
      disabled={disabled || isPending}
    >
      {isPending ? "Submitting..." : "Save Submission"}
    </button>
  );
}
