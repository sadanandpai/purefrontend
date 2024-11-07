import { Models } from "node-appwrite";
import { getLoggedInUser } from "@/server/actions/auth";
import { createContext, useEffect, useState } from "react";

interface AppContextType {
  user: null | Models.Preferences;
}

export const appContext = createContext<AppContextType>({
  user: null,
});

interface Props {
  children: React.ReactNode;
}

export function AppContextProvider({ children }: Props) {
  const [user, setUser] = useState<null | Models.Preferences>(null);

  useEffect(() => {
    getLoggedInUser().then((user) => {
      setUser(user);
    });
  }, []);

  return <appContext.Provider value={{ user }}>{children}</appContext.Provider>;
}
