import { routes } from "@/common/routes";
import { InfoCard } from "@/ui/components/core/info-card/info-card";
import { Flex } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import classes from "./home.module.scss";

export function Practice() {
  return (
    <section>
      <Flex justify="between">
        <div>
          <div className={classes.sectionTitle}>
            <Flex align="center" gap="4">
              Nail
              <Image
                src="target.svg"
                alt="target"
                width="64"
                height="64"
                className="inline"
              />
            </Flex>
            <span>
              that next
              <br /> interview
            </span>
          </div>

          <Link
            href={routes.challenges}
            className="primary-link large inline-block mt-24"
          >
            PRACTICE NOW &gt;
          </Link>
        </div>

        <Flex align={"center"}>
          <InfoCard
            title="Community driven challenges"
            description="Carefully curated high quality problems"
            image="community.svg"
            alt="community"
            tilt={-5}
          />
          <div
            style={{
              transform: "translate(-20%, 38%)",
            }}
          >
            <InfoCard
              title="Beginner or pro, let’s go!"
              description="Challenges for every level of expertise"
              image="individual.svg"
              alt="individual"
              tilt={5}
            />
          </div>
        </Flex>
      </Flex>
    </section>
  );
}
