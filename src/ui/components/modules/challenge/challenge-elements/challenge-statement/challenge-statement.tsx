import { Badge, Flex, Heading, Text } from "@radix-ui/themes";
import { ProblemProps } from "@/common/types/problem";
import { InfoBar } from "@/ui/components/modules/challenge/challenge-components/info-bar/info-bar";

interface Props {
  problem: ProblemProps;
  views: number;
  liked: boolean;
}

export function ProblemStatement({ problem, views, liked }: Props) {
  return (
    <div>
      <Flex gap="2" align="center">
        <Heading size="5">{problem.name}</Heading>
        {views !== -1 && (
          <Badge color="gray" variant="solid" size="1" radius="full">
            {views} views
          </Badge>
        )}
      </Flex>

      <InfoBar difficulty={problem.difficulty} liked={liked} />

      <Text dangerouslySetInnerHTML={{ __html: problem.statement }}></Text>
      <Text dangerouslySetInnerHTML={{ __html: problem.description }}></Text>

      <div>
        {problem.examples.map((example, idx) => (
          <div key={idx} className="pt-8">
            <Text weight="bold">Example {idx + 1}</Text>

            <pre
              className="rounded-md p-4 mt-2 text-md flex flex-col gap-4"
              style={{
                backgroundColor: "var(--gray-5)",
              }}
            >
              <span>Input: {example.input}</span>
              <span>Output: {example.output}</span>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
