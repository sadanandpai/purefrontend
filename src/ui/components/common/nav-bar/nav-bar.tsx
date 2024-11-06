import Link from "next/link";
import classes from "./nav-bar.module.scss";

export function NavBar() {
  return (
    <nav className={classes.navBar} role="navigation">
      <h1>
        <Link href="/">PureFrontend</Link>
      </h1>
    </nav>
  );
}
