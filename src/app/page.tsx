import { HomeNavBar } from "@/ui/components/common/home-nav-bar/home-nav-bar";
import { Circles } from "@/ui/components/core/circles/circles";
import { Features } from "@/ui/components/modules/home/features";
import { GetStarted } from "@/ui/components/modules/home/get-started";
import { Hero } from "@/ui/components/modules/home/hero";
import { Practice } from "@/ui/components/modules/home/practice";
import { Flex } from "@radix-ui/themes";

export default function Home() {
  return (
    <div className="home-bg">
      <div className="container">
        <Circles />
        <HomeNavBar />

        <Flex direction="column" gap="260px" className="mt-[84px] relative">
          <Hero />
          <Practice />
          <Features />
          <GetStarted />
        </Flex>
      </div>
    </div>
  );
}
