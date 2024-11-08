import { useContext } from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { appContext } from "@/ui/context/app.context";
import { getUserSubmissions } from "@/server/actions/submissions";
import { SubmissionsTable } from "@/ui/pure-components/submissions-table/submissions-table";
import classes from "./challenge-details.module.scss";
import { routes } from "@/common/routes";
import Link from "next/link";

export function Submissions() {
  const context = useContext(appContext);
  const challengeId = Number(usePathname().split("/").at(-1));

  const { isLoading, data } = useQuery({
    queryKey: ["submissions"],
    queryFn: () => getUserSubmissions(challengeId),
    enabled: !!context.user,
  });

  if (!context.user) {
    return (
      <p className={classes.verticalCenter}>
        Please&nbsp;<Link href={routes.signIn}>Sign in</Link>&nbsp;to view your
        submissions
      </p>
    );
  }

  if (isLoading) {
    return <div className={classes.verticalCenter}>Loading...</div>;
  }

  if (!data?.documents?.length) {
    return (
      <div className={classes.verticalCenter}>
        <p>You have not submitted any code yet</p>
      </div>
    );
  }

  return (
    <div className={classes.tableWrapper}>
      <SubmissionsTable records={data?.documents} />
    </div>
  );
}
