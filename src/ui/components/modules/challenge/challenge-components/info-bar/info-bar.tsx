import Image from "next/image";
import { Badge, Flex } from "@radix-ui/themes";
import { UserLike } from "../user-like/user-like";

interface Props {
  difficulty: string;
  totalLikes?: number;
}

export function InfoBar({ difficulty, totalLikes }: Props) {
  const difficultyColor =
    difficulty === "easy"
      ? "green"
      : difficulty === "medium"
      ? "yellow"
      : "red";

  return (
    <Flex my="4" justify="between">
      <Flex gap="4" align="center">
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

      <Flex gap="4" align="center" mr={"2"}>
        <UserLike totalLikes={totalLikes} />
      </Flex>
    </Flex>
  );
}
