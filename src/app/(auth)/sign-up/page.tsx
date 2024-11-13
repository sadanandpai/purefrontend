import { redirect } from "next/navigation";
import { SignUp } from "@/ui/components/modules/auth/sign-up";
import { getLoggedInUser } from "@/server/actions/auth";
import { routes } from "@/common/routes";

export default async function SignUpPage() {
  const user = await getLoggedInUser();
  if (user) {
    redirect(routes.profile);
  }

  return <SignUp />;
}
