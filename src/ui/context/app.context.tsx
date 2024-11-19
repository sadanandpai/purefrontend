import { createContext } from "react";
import { Models } from "node-appwrite";

interface AppContextType {
  user: null | Models.User<Models.Preferences>;
  userDataLoading: boolean;
  resetLoggedInUser: () => void;
}

export const appContext = createContext<AppContextType>({
  user: null,
  userDataLoading: false,
  resetLoggedInUser: () => null,
});
