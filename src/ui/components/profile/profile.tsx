import { Models } from "node-appwrite";
import { signOut } from "@/server/actions/auth";
import { Button } from "@radix-ui/themes";
import { PasswordUpdate } from "./password-update";
import { NameUpdate } from "./name-update";
import { EmailUpdate } from "./email-update";
import classes from "./profile.module.scss";

interface Props {
  user: Models.User<Models.Preferences>;
}

export function Profile({ user }: Props) {
  return (
    <main className={classes.main}>
      <NameUpdate name={user.name} />
      <PasswordUpdate />
      <EmailUpdate email={user.email} />

      <form action={signOut}>
        <Button type="submit">Sign out</Button>
      </form>
    </main>
  );
}
