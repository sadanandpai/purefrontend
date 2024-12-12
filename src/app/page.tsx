import { routes } from "@/common/routes";
import { HomeNavBar } from "@/ui/components/common/home-nav-bar/home-nav-bar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home-bg">
      <div className="container">
        <HomeNavBar />
        <h1 className="home-heading mt-24">
          <span className="text-brand-1">Learn.</span>
          <br />
          <span className="text-brand-3">Succeed.</span>
          <br />
          <span className="text-bg-2">Contribute.</span>
        </h1>

        <h2 className="home-heading-2">
          Master your frontend skills with{" "}
          <span className="text-brand-1 font-bold">Clear Frontend</span>
        </h2>

        <Link
          href={routes.challenges}
          className="primary-link large inline-block"
        >
          CHALLENGES &gt;
        </Link>
      </div>
    </div>
  );
}
