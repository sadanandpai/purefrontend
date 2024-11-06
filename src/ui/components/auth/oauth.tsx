import Image from "next/image";
import { signInWithGoogle } from "@/server/actions/auth";
import classes from "./auth-form.module.scss";

export function OAuth() {
  return (
    <div className={classes.oauthForms}>
      <p>Or access using</p>
      <div className={classes.oauthFormsIcons}>
        <form action={signInWithGoogle}>
          <button type="submit">
            <Image src="/google.svg" alt="Google" width={40} height={40} />
          </button>
        </form>
      </div>
    </div>
  );
}
