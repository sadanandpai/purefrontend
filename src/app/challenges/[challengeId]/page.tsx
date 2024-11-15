import { ProblemProps } from "@/common/types/problem";
import { challenges } from "@/data/challenges";
import { getIncrementedViews } from "@/server/data-access/views";
import ChallengeUI from "@/ui/components/modules/challenge/challenge-ui";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ challengeId: string }>;
}

export default async function Challenge({ params }: Props) {
  const { challengeId } = await params;
  const challengeIdAsNum = Number(challengeId);

  if (
    isNaN(challengeIdAsNum) ||
    challengeIdAsNum <= 0 ||
    challengeIdAsNum > challenges.length
  ) {
    notFound();
  }

  const problem: ProblemProps = await import(`@/data/${challengeId}`).then(
    (module) => module.problem
  );

  const views = await getIncrementedViews(Number(challengeId));
  return <ChallengeUI problem={problem} views={views} />;
}
