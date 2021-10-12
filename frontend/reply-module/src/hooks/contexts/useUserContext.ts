import { User } from "@/types/user";
import { createContext, useContext } from "react";

export const UserContext = createContext<{
  user?: User;
  logout?: () => void;
  refetchUser?: () => void;
  isLoadingUserRequest: boolean;
  isSuccessUserRequest: boolean;
}>({
  user: undefined,
  logout: undefined,
  refetchUser: undefined,
  isLoadingUserRequest: false,
  isSuccessUserRequest: false
});

export const useUserContext = () => useContext(UserContext);
