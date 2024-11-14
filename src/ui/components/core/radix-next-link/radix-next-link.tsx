import Link from "next/link";
import { Link as Anchor, LinkProps } from "@radix-ui/themes";

interface Props {
  href?: string;
  size?: LinkProps["size"];
  weight?: LinkProps["weight"];
  children: React.ReactNode;
}

export function RadixNextLink({ href = "#", size, weight, children }: Props) {
  return (
    <Link href={href} passHref legacyBehavior>
      <Anchor size={size} weight={weight}>
        {children}
      </Anchor>
    </Link>
  );
}
