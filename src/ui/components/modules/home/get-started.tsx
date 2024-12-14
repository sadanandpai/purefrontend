import { Flex } from "@radix-ui/themes";
import classes from "./home.module.scss";
import Link from "next/link";
import { routes } from "@/common/routes";

export function GetStarted() {
  return (
    <section className={classes.background}>
      <Flex justify="center" align="center" direction="column" gap="4">
        <h1 className={`${classes.sectionTitle}`}>
          <span className="text-bg-2">Get started now!</span>
        </h1>

        <p className={classes.subTitle}>
          Join 250+ developers improving their frontend skills
        </p>

        <Flex className="mt-12" gap="5">
          <Link
            href={routes.challenges}
            className="primary-link large inline-block"
          >
            CHALLENGES &gt;
          </Link>

          <Link
            href={routes.challenges}
            className="primary-link large inline-block text-bg-1"
            style={{
              backgroundColor: "var(--brand-bg-2)",
              color: "var(--brand-main-1)",
            }}
          >
            CONTRIBUTE &gt;
          </Link>
        </Flex>
      </Flex>
    </section>
  );
}
