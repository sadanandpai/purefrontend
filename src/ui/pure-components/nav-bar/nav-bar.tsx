import Link from "next/link";
import { routes } from "@/common/routes";
import { ThemeSwitch } from "./theme-switch";
import classes from "./nav-bar.module.scss";

export function NavBar() {
  return (
    <nav className={classes.navBar} role="navigation">
      <h1>
        <Link href="/">PureFrontend</Link>
      </h1>

      <ThemeSwitch />

      <Link href={routes.profile} className={classes.profile}>
        Profile
      </Link>
    </nav>
  );
}
