import { Models } from "node-appwrite";
import { signOut } from "@/server/actions/auth";
import { Button, Flex } from "@radix-ui/themes";
import { PasswordUpdate } from "./password-update";
import { NameUpdate } from "./name-update";
import { EmailUpdate } from "./email-update";
import classes from "./profile.module.scss";
import { EmailVerification } from "./email-verification";
import { PhoneUpdate } from "./phone-update";
import { PhoneVerification } from "./phone-verification";

interface Props {
  user: Models.User<Models.Preferences>;
}

export function Profile({ user }: Props) {
  return (
    <main className={classes.main}>
      <NameUpdate name={user.name} />
      <PasswordUpdate />
      <EmailUpdate
        email={user.email}
        emailVerification={user.emailVerification}
      />
      <PhoneUpdate
        phone={user.phone}
        phoneVerification={user.phoneVerification}
      />

      <Flex gap="2">
        <EmailVerification />
        <PhoneVerification />

        <form action={signOut}>
          <Button type="submit" color="tomato">
            Sign out
          </Button>
        </form>
      </Flex>
    </main>
  );
}
