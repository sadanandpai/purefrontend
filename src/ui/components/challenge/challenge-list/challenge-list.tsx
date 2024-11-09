import Link from "next/link";
import classes from "./challenge-list.module.scss";
import { routes } from "@/common/routes";

interface Props {
  challenges: {
    id: number;
    name: string;
    difficulty: string;
    tags: string[];
  }[];
}

export function ChallengeList({ challenges }: Props) {
  return (
    <table className={classes.challengesTable}>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Difficulty</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        {challenges.map((challenge, index) => (
          <tr key={challenge.id}>
            <td>{index + 1}</td>
            <td>
              <Link href={`${routes.challenges}/${challenge.id}`}>
                {challenge.name}
              </Link>
            </td>
            <td>{challenge.difficulty}</td>
            <td>{challenge.tags.join(", ")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
