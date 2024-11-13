import { useContext } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { routes } from "@/common/routes";
import { appContext } from "@/ui/context/app.context";
import { SubmissionsTable } from "@/ui/components/core/submissions-table/submissions-table";
import {
  deleteUserSubmission,
  getUserSubmissions,
} from "@/server/actions/submissions";
import classes from "./challenge-submissions.module.scss";

interface SubmissionMutationProp {
  submissionId: string;
}

export function ChallengeSubmissions() {
  const queryClient = useQueryClient();
  const context = useContext(appContext);
  const challengeId = Number(usePathname().split("/").at(-1));

  const {
    isLoading: isRecordsLoading,
    data: submissionsData,
    error: submissionsError,
  } = useQuery({
    queryKey: ["submissions"],
    queryFn: () => getUserSubmissions(challengeId),
    enabled: !!context.user,
  });

  const { mutate, isPending: isDeletionPending } = useMutation({
    mutationFn: ({ submissionId }: SubmissionMutationProp) =>
      deleteUserSubmission(submissionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      toast.success("Submission deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete submission");
    },
  });

  async function deleteSubmission(submissionId: string) {
    if (submissionId !== undefined) {
      mutate({ submissionId });
    }
  }

  if (!context.user) {
    return (
      <p className={classes.verticalCenter}>
        Please&nbsp;<Link href={routes.signIn}>Sign in</Link>&nbsp;to view your
        submissions
      </p>
    );
  }

  if (submissionsError) {
    return (
      <div className={classes.verticalCenter}>
        <p>Failed to load submissions</p>
      </div>
    );
  }

  if (isRecordsLoading) {
    return <div className={classes.verticalCenter}>Loading...</div>;
  }

  if (!submissionsData?.documents?.length) {
    return (
      <div className={classes.verticalCenter}>
        <p>You have not submitted any code yet</p>
      </div>
    );
  }

  return (
    <div className={classes.tableWrapper}>
      <SubmissionsTable
        records={submissionsData.documents}
        deleteSubmission={deleteSubmission}
        isLoading={isDeletionPending}
      />
    </div>
  );
}
