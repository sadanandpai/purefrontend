import { ProblemProps } from "@/common/types/problem";
import { getUserChallengeInfo } from "@/server/actions/challenge";
import { getIncrementedViews } from "@/server/data-access/views";
import { isValidChallengeId } from "@/server/utils/challenge";
import ChallengeUI from "@/ui/components/modules/challenge/challenge-ui";
import { notFound } from "next/navigation";

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

  const info = await getUserChallengeInfo(challengeIdAsNum);
  const views = await getIncrementedViews(Number(challengeId));

  return (
    <ChallengeUI problem={problem} views={views} liked={info?.liked ?? false} />
  );
}
