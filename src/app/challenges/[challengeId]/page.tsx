import { ProblemProps } from "@/common/types/problem";
import ChallengeUI from "@/ui/components/modules/challenge/challenge-ui";

interface Props {
  params: Promise<{ challengeId: string }>;
}

export default async function Challenge({ params }: Props) {
  const { challengeId } = await params;
  const problem: ProblemProps = await import(`@/data/${challengeId}`).then(
    (module) => module.problem
  );

  return <ChallengeUI problem={problem} />;
}
