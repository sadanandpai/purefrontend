import { useContext, useEffect } from "react";
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
  setSelectedIndex: (index: number) => void;
  status?: boolean;
}

export function SaveSubmission({ status, setSelectedIndex }: Props) {
  const context = useContext(appContext);
  const { code } = useActiveCode();
  const challengeId = Number(usePathname().split("/").at(-1));

  const { mutate, data, isPending } = useMutation({
    mutationFn: ({ challengeId, code, status }: SubmissionMutationProps) =>
      submitUserSubmission(challengeId, code, status),
  });

  async function saveSubmission() {
    if (status !== undefined) {
      mutate({ challengeId, code, status });
    }
  }

  useEffect(() => {
    if (data) {
      setSelectedIndex(2);
    }
  }, [data, setSelectedIndex]);

  if (!context.user) {
    return (
      <p>
        Please&nbsp;<Link href={routes.signIn}>Sign in</Link>&nbsp;to save your
        submission
      </p>
    );
  }

  return (
    <button className="btn" onClick={saveSubmission} disabled={isPending}>
      {isPending ? "Submitting..." : "Save Submission"}
    </button>
  );
}
