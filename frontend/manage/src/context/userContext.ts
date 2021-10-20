import { User } from "@/types/user";
import { createContext, useContext } from "react";

export const UserContext = createContext<{
  user?: User;
  logout?: () => void;
  refetchUser?: () => void;
  isLoadingUserRequest: boolean;
  isSuccessUserRequest: boolean;
  refetchAccessToken?: () => void;
  accessToken?: string;
}>({
  user: undefined,
  logout: undefined,
  refetchUser: undefined,
  isLoadingUserRequest: false,
  isSuccessUserRequest: false,
  refetchAccessToken: undefined,
  accessToken: undefined
});

export const useUserContext = () => useContext(UserContext);
