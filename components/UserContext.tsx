import { createContext, useContext } from "react";
import { User } from "firebase/auth";

type UserContextType = {
  user: User | null;
  isSubscribed: boolean | "premium" | "premium-plus";
  openAuth: () => void;
};

const UserContext = createContext<UserContextType>({ user: null, isSubscribed: false, openAuth: () => {} });

export const useUser = () => useContext(UserContext);
export default UserContext;