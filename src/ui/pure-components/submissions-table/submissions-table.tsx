/* eslint-disable @typescript-eslint/no-explicit-any */
import classes from "./submissions-table.module.scss";
import { Trash } from "lucide-react";

interface Props {
  records: any[];
  deleteSubmission: (submissionId: string) => void;
  isLoading: boolean;
}

export function SubmissionsTable({
  records,
  deleteSubmission,
  isLoading,
}: Props) {
  return (
    <div className={classes.tableWrapper}>
      <table className={classes.submissionsTable}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Language</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {records.map((record: any, index: number) => (
            <tr key={index}>
              <td>{new Date(record.$createdAt).toDateString()}</td>
              <td>JavaScript</td>
              <td>{record.status ? "Pass" : "Fail"}</td>
              <td>
                <button
                  className={classes.viewButton}
                  onClick={() => deleteSubmission(record.$id)}
                  disabled={isLoading}
                >
                  <Trash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
