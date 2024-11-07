import { getUserSubmissions } from "@/server/actions/submissions";
import classes from "./challenge-details.module.scss";
import { SubmissionsTable } from "../../../pure-components/submissions-table/submissions-table";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { appContext } from "@/ui/context/app.context";

export function Submissions() {
  const context = useContext(appContext);

  const { isLoading, data } = useQuery({
    queryKey: ["submissions"],
    queryFn: () => getUserSubmissions(),
    enabled: !!context.user,
  });

  if (!context.user) {
    return (
      <div className={classes.verticalCenter}>
        Please sign in to view your submissions
      </div>
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
