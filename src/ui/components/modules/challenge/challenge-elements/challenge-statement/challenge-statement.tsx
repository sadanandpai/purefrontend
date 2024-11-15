import Image from "next/image";
import { Badge, Flex, Heading, Text } from "@radix-ui/themes";
import { ProblemProps } from "@/common/types/problem";

interface Props {
  problem: ProblemProps;
  views: number;
}

export function ProblemStatement({ problem, views }: Props) {
  const difficultyColor =
    problem.difficulty === "easy"
      ? "green"
      : problem.difficulty === "medium"
      ? "yellow"
      : "red";

  return (
    <div>
      <Heading size="5">{problem.name}</Heading>
      <Flex my="4" gap="4" align="center">
        <Image src="/js.svg" height={24} width={24} alt="JavaScript" />
        <Badge
          color={difficultyColor}
          variant="solid"
          size="3"
          className="capitalize"
        >
          {problem.difficulty}
        </Badge>

        {views !== -1 && (
          <Badge color="gray" variant="solid" size="1" radius="full">
            {views} views
          </Badge>
        )}
      </Flex>

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
