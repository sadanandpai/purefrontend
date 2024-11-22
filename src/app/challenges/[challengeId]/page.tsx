import { notFound } from "next/navigation";
import { ProblemProps } from "@/common/types/problem";
import { getIncrementedViews } from "@/server/data-access/activities";
import { isValidChallengeId } from "@/server/utils/challenge";
import ChallengeUI from "@/ui/components/modules/challenge/challenge-ui";

interface Props {
  params: Promise<{ challengeId: string }>;
}

export default async function Challenge({ params }: Props) {
  const { challengeId } = await params;
  const challengeIdAsNum = Number(challengeId);

  if (!isValidChallengeId(challengeIdAsNum)) {
    notFound();
  }

  const problem: ProblemProps = await import(`@/data/${challengeId}`).then(
    (module) => module.problem
  );

  const views = await getIncrementedViews(Number(challengeId));

  return <ChallengeUI problem={problem} views={views} />;
}
