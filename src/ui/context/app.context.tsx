import { createContext } from "react";
import { Models } from "node-appwrite";

interface AppContextType {
  user: null | Models.Preferences;
}

export const appContext = createContext<AppContextType>({
  user: null,
});
