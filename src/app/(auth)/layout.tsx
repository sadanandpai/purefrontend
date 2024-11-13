import { NavBar } from "@/ui/components/common/nav-bar/nav-bar";
import classes from "./auth.module.scss";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="body-wrapper">
      <NavBar />
      <section className={classes.authSection}>
        <p className="logo">PureFrontend</p>
        {children}
      </section>
    </div>
  );
}
