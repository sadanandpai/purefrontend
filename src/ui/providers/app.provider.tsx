import { useEffect, useState } from "react";
import { Models } from "node-appwrite";
import { useSearchParams } from "next/navigation";
import { appContext } from "@/ui/context/app.context";
import { getLoggedInUser } from "@/server/actions/auth";

interface Props {
  children: React.ReactNode;
}

export function AppProvider({ children }: Props) {
  const [user, setUser] = useState<null | Models.Preferences>(null);
  const searchParams = useSearchParams();
  const authParam = searchParams.get("auth");

  function setLoggedInUser() {
    getLoggedInUser().then((user) => {
      setUser(user);
    });
  }

  useEffect(() => {
    setLoggedInUser();
  }, []);

  useEffect(() => {
    if (authParam === "true" && user === null) {
      setLoggedInUser();
    } else if (authParam === "false" && user !== null) {
      setUser(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authParam]);

  return <appContext.Provider value={{ user }}>{children}</appContext.Provider>;
}
