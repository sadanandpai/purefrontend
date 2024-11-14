import Image from "next/image";
import { Badge, Flex, Heading, Text } from "@radix-ui/themes";

interface Props {
  name: string;
  statement: string;
  difficulty: string;
  description: string;
  examples: {
    input: string;
    output: string;
  }[];
}

export function ProblemStatement({
  name,
  difficulty,
  statement,
  description,
  examples,
}: Props) {
  const difficultyColor =
    difficulty === "easy"
      ? "green"
      : difficulty === "medium"
      ? "yellow"
      : "red";

  return (
    <div>
      <Heading size="5">{name}</Heading>
      <Flex my="4" gap="4">
        <Image src="/js.svg" height={24} width={24} alt="JavaScript" />
        <Badge
          color={difficultyColor}
          variant="solid"
          size="3"
          className="capitalize"
        >
          {difficulty}
        </Badge>
      </Flex>

      <Text dangerouslySetInnerHTML={{ __html: statement }}></Text>
      <Text dangerouslySetInnerHTML={{ __html: description }}></Text>

      <div>
        {examples.map((example, idx) => (
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
