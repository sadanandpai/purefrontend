/* eslint-disable @typescript-eslint/no-explicit-any */
import classes from "./submissions-table.module.scss";

interface Props {
  records: any;
}

export function SubmissionsTable({ records }: Props) {
  return (
    <div className={classes.tableWrapper}>
      <table className={classes.submissionsTable}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Language</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record: any, index: number) => (
            <tr key={index}>
              <td>{new Date(record.$createdAt).toDateString()}</td>
              <td>JavaScript</td>
              <td>{record.status ? "Pass" : "Fail"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
