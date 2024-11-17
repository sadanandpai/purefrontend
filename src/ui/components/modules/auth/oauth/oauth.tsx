import Image from "next/image";
import { signInWithOAuth } from "@/server/actions/auth";
import { Button } from "@radix-ui/themes";
import classes from "./oauth.module.scss";

export function OAuth() {
  return (
    <div className={classes.oauthForms}>
      <p>Or access using</p>
      <div className={classes.oauthFormsIcons}>
        <form action={() => signInWithOAuth("Google")}>
          <Button type="submit" variant="ghost">
            <Image src="/google.svg" alt="Google" width={40} height={40} />
          </Button>
        </form>

        <form action={() => signInWithOAuth("Github")}>
          <Button type="submit" variant="ghost">
            <Image src="/github.svg" alt="Github" width={40} height={40} />
          </Button>
        </form>
      </div>
    </div>
  );
}
