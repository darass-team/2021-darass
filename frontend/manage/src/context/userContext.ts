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
  setUser?: (user?: User) => void;
  isActiveAccessToken?: boolean;
  isUserFetched?: boolean;
}>({
  user: undefined,
  logout: undefined,
  refetchUser: undefined,
  isLoadingUserRequest: false,
  isSuccessUserRequest: false,
  refetchAccessToken: undefined,
  accessToken: undefined,
  setUser: undefined,
  isActiveAccessToken: undefined,
  isUserFetched: undefined
});

export const useUserContext = () => useContext(UserContext);
