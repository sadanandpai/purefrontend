import { NavBar } from "@/ui/components/common/nav-bar/nav-bar";
import classes from "./auth.module.scss";
import { Text } from "@radix-ui/themes";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="body-wrapper">
      <NavBar />
      <section className={classes.authSection}>
        <Text size={"8"} mb={"6"} as="p">
          PureFrontend
        </Text>
        {children}
      </section>
    </div>
  );
}
