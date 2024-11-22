import { useContext } from "react";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { Button } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { appContext } from "@/ui/context/app.context";
import {
  getUserChallengeInfo,
  setUserChallengeInfo,
} from "@/server/actions/challenge";
import { useTheme } from "next-themes";

export function UserLike() {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const context = useContext(appContext);
  const challengeId = Number(usePathname().split("/").at(-1));

  const { data: infoData, isLoading } = useQuery({
    queryKey: ["isLiked", challengeId],
    queryFn: () => getUserChallengeInfo(challengeId),
    enabled: !!context.user,
    staleTime: Infinity,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["userChallengeInfo", challengeId],
    mutationFn: () =>
      setUserChallengeInfo(challengeId, {
        like: !infoData?.like,
      }),
    onSuccess: (data) => {
      // update the cache of query (this helps to update the UI without invoking the API again)
      queryClient.setQueryData(
        ["isLiked", challengeId],
        (oldData: typeof infoData) => ({
          ...oldData,
          like: data.like,
        })
      );

      if (data.like) {
        toast.success("Challenge is liked");
      } else {
        toast("Challenge is un-liked");
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

    mutate();
  }

  if (!context.user) {
    return (
      <Button size="1" variant="ghost" onClick={handleLike}>
        <Heart color={theme.theme === "dark" ? "white" : "black"} />
      </Button>
    );
  }

  return (
    <Button
      size="1"
      variant="ghost"
      loading={isLoading || isPending || infoData === undefined}
      onClick={handleLike}
    >
      <Heart
        fill={infoData?.like ? "red" : "none"}
        color={
          infoData?.like ? "red" : theme.theme === "dark" ? "white" : "black"
        }
      />
    </Button>
  );
}
