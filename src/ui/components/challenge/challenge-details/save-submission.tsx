import { useContext, useEffect } from "react";
import { useActiveCode } from "@codesandbox/sandpack-react";
import { submitUserSubmission } from "@/server/actions/submissions";
import { useMutation } from "@tanstack/react-query";
import { appContext } from "@/ui/context/app.context";

interface SubmissionMutationProps {
  challengeId: number;
  code: string;
}

interface Props {
  setSelectedIndex: (index: number) => void;
}

export function SaveSubmission({ setSelectedIndex }: Props) {
  const context = useContext(appContext);
  const { code } = useActiveCode();
  const { mutate, data, isPending } = useMutation({
    mutationFn: ({ challengeId, code }: SubmissionMutationProps) =>
      submitUserSubmission(challengeId, code),
  });

  async function saveSubmission() {
    mutate({ challengeId: 1, code });
  }

  useEffect(() => {
    if (data) {
      setSelectedIndex(2);
    }
  }, [data, setSelectedIndex]);

  if (!context.user) {
    return "Please sign in to save your submission";
  }

  return (
    <button className="btn" onClick={saveSubmission} disabled={isPending}>
      {isPending ? "Submitting..." : "Save Submission"}
    </button>
  );
}
