import { routes } from "@/common/routes";
import { NavBar } from "@/ui/components/common/nav-bar/nav-bar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="text-center">
        <h2 className="mb-8 text-6xl">
          Prepare for your next frontend coding interview
        </h2>

        <Link href={routes.challenges} className="btn">
          Get started
        </Link>
      </div>
    </>
  );
}
