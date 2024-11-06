import { redirect } from "next/navigation";
import { routes } from "@/common/routes";
import { getLoggedInUser, signOut } from "@/server/actions/auth";
import PasswordUpdate from "@/ui/components/auth/password-update";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await getLoggedInUser();

  if (!user) {
    redirect(routes.signIn);
  }

  return (
    <>
      <ul>
        <li>
          <strong>ID: </strong> {user.$id}
        </li>
        <li>
          <strong>Name:</strong> {user.name}
        </li>
        <li>
          <strong>Email:</strong> {user.email}
        </li>
      </ul>

      <PasswordUpdate />

      <form action={signOut}>
        <button type="submit" className="btn">
          Sign out
        </button>
      </form>
    </>
  );
}
