import { createContext, useContext } from "react";
import { User } from "firebase/auth";

type UserContextType = {
  user: User | null;
  isSubscribed: boolean;
  openAuth: () => void;
};

const UserContext = createContext<UserContextType>({ user: null, isSubscribed: false, openAuth: () => {} });

export const useUser = () => useContext(UserContext);
export default UserContext;