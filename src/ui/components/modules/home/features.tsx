import { Flex } from "@radix-ui/themes";
import { FeatureItems } from "@/ui/components/core/feature-items/feature-items";
import classes from "./home.module.scss";

const listItems = ["Challenge", "Code", "Run or debug", "Dark or light"];

export function Features() {
  return (
    <section>
      <p className={`${classes.sectionTitle} mb-[54px]`}>All in one platform</p>

      <Flex justify="between" gap="9" align="center">
        <div className="flex-1">
          <FeatureItems listItems={listItems} />
        </div>

        <div
          style={{
            width: "618px",
            borderRadius: "24px",
            backgroundColor: "var(--bg-2)",
            border:
              "4px solid linear-gradient(180deg, rgba(213, 213, 213, 0.75) 0%, rgba(3, 174, 102, 0.25) 100%)",
            background:
              "linear-gradient(180deg, rgba(213, 213, 213, 0.2) 0%, rgba(3, 174, 102, 0.05) 100%)",
            height: "432px",
          }}
        >
          1
        </div>
      </Flex>
    </section>
  );
}
