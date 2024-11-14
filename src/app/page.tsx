import { routes } from "@/common/routes";
import { NavBar } from "@/ui/components/common/nav-bar/nav-bar";
import { RadixNextLink } from "@/ui/components/core/radix-next-link/radix-next-link";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="text-center">
        <h2 className="mb-8 text-6xl">
          Prepare for your next frontend coding interview
        </h2>

        <RadixNextLink href={routes.challenges}>Get started</RadixNextLink>
      </div>
    </>
  );
}
