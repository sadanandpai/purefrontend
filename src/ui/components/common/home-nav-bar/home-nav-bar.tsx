import Link from "next/link";
import Image from "next/image";
import { Flex } from "@radix-ui/themes";
import { routes } from "@/common/routes";
import { RadixNextLink } from "@/ui/components/core/radix-next-link/radix-next-link";

export function HomeNavBar() {
  return (
    <nav className="flex justify-between p-7" role="navigation">
      <Flex align="center" gap="4">
        <Image src="/cfe-logo.svg" alt="Github" width={36} height={36} />
        <RadixNextLink href={routes.challenges} weight="bold">
          Challenges
        </RadixNextLink>

        <RadixNextLink
          href="https://github.com/sadanandpai/clearfrontend"
          weight="bold"
          target="blank"
        >
          Contribute
        </RadixNextLink>
      </Flex>

      <Flex align="center" gap="4">
        <RadixNextLink href={routes.signIn} weight="bold">
          LOGIN
        </RadixNextLink>

        <RadixNextLink href={routes.signUp} weight="bold">
          SIGN UP
        </RadixNextLink>

        <Link
          href="https://github.com/sadanandpai/clearfrontend"
          target="blank"
        >
          <Image src="/github.svg" alt="Github" width={24} height={24} />
        </Link>
      </Flex>
    </nav>
  );
}
