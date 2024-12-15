"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Flex } from "@radix-ui/themes";
import { routes } from "@/common/routes";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import classes from "./home-nav-bar.module.scss";

export function MenuDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="flex lg:hidden">
      <CollapsibleTrigger asChild>
        <button className={classes.hamburgerButton}>
          <Menu color="white" />
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent className={classes.collapsibleContent}>
        <Flex direction="column" align="center" gap="5">
          <Link
            href={routes.challenges}
            className="text-brand-1 font-bold md:hidden"
          >
            Challenges
          </Link>

          <Link
            href="https://github.com/sadanandpai/clearfrontend"
            target="blank"
            className="text-brand-1 font-bold md:hidden"
          >
            Contribute
          </Link>

          <Link href={routes.signIn} className="secondary-link">
            LOGIN
          </Link>

          <Link href={routes.signUp} className="primary-link">
            SIGN UP
          </Link>

          <Link
            href="https://github.com/sadanandpai/clearfrontend"
            target="blank"
          >
            <Image src="/github.svg" alt="Github" width={32} height={32} />
          </Link>
        </Flex>
      </CollapsibleContent>
    </Collapsible>
  );
}