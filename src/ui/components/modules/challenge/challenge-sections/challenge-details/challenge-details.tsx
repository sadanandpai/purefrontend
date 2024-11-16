import { useEffect, useState } from "react";
import { ChallengeSolution } from "@/ui/components/modules/challenge/challenge-elements/challenge-solution/challenge-solution";
import { ChallengeResults } from "@/ui/components/modules/challenge/challenge-elements/challenge-results/challenge-results";
import { ProblemStatement } from "@/ui/components/modules/challenge/challenge-elements/challenge-statement/challenge-statement";
import { ChallengeSubmissions } from "@/ui/components/modules/challenge/challenge-elements/challenge-submissions/challenge-submissions";
import { useChallengeStore } from "@/ui/store/challenge.store";
import { ProblemProps } from "@/common/types/problem";
import { Box, Tabs } from "@radix-ui/themes";
import classes from "./challenge-details.module.scss";

interface Props {
  problem: ProblemProps;
  views: number;
}

export function ChallengeDetails({ problem, views }: Props) {
  const [selectedTab, setSelectedTab] = useState("question");
  const testOutputs = useChallengeStore((state) => state.testOutputs);

  useEffect(() => {
    if (testOutputs?.outputs?.length) {
      setSelectedTab("result");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testOutputs, setSelectedTab]);

  return (
    <Tabs.Root
      value={selectedTab}
      onValueChange={setSelectedTab}
      className={`panel-layout ${classes.controlsWrapper}`}
    >
      <Tabs.List className="flex-shrink-0">
        <Tabs.Trigger value="question">Question</Tabs.Trigger>
        <Tabs.Trigger value="result" className="hidden md:block">
          Result
        </Tabs.Trigger>
        <Tabs.Trigger value="solution">Solution</Tabs.Trigger>
        <Tabs.Trigger value="submissions">Submissions</Tabs.Trigger>
      </Tabs.List>

      <Box p="3" className={classes.controlsBox}>
        <Tabs.Content value="question">
          <ProblemStatement problem={problem} views={views} />
        </Tabs.Content>

        <Tabs.Content value="result">
          <ChallengeResults
            setSelectedTab={setSelectedTab}
            testOutputs={testOutputs}
          />
        </Tabs.Content>

        <Tabs.Content value="solution">
          <ChallengeSolution code={problem.solution} />
        </Tabs.Content>

        <Tabs.Content value="submissions">
          <ChallengeSubmissions />
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  );
}
