import { useContext, useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { setUserChallengeInfo } from "@/server/actions/challenge";
import { toast } from "sonner";
import { appContext } from "@/ui/context/app.context";

interface Props {
  liked: boolean;
}

export function UserLike({ liked }: Props) {
  const context = useContext(appContext);
  const challengeId = Number(usePathname().split("/").at(-1));
  const [isLiked, setIsLiked] = useState(liked);

  const { mutate, isPending } = useMutation({
    mutationKey: ["userChallengeInfo", challengeId],
    mutationFn: (isLiked: boolean) =>
      setUserChallengeInfo(challengeId, {
        liked: !isLiked,
      }),
    onSuccess: () => {
      const isUpdatedLiked = !isLiked;
      setIsLiked(isUpdatedLiked);
      if (isUpdatedLiked) {
        toast.success("Challenge liked successfully");
      } else {
        toast("Challenge unliked successfully");
      }
    },
    onError: () => {
      toast.error("Failed to like challenge");
    },
  });

  function handleLike() {
    if (!context.user) {
      toast("Please sign in to like the challenge");
      return;
    }

    if (isPending) {
      return;
    }

    mutate(isLiked);
  }

  return (
    <Button
      variant="ghost"
      size="1"
      className="text-gray-500"
      loading={isPending}
      onClick={handleLike}
    >
      <Heart
        fill={isLiked ? "red" : "none"}
        color={isLiked ? "red" : "black"}
      />
    </Button>
  );
}
