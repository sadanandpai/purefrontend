import { NavBar } from "@/ui/components/common/nav-bar/nav-bar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="text-center">
        <p className="mb-8 text-4xl">
          Prepare for your next frontend coding interview
        </p>

        <Link href="/challenge/1" className="btn">
          Get started
        </Link>
      </div>
    </>
  );
}
