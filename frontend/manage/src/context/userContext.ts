import { User } from "@/types/user";
import { createContext, useContext } from "react";

export const UserContext = createContext(
  {} as {
    user?: User;
    logout: () => void;
    refetchUser: () => void;
    isLoadingUserRequest: boolean;
    isSuccessUserRequest: boolean;
    refetchAccessToken: () => void;
    accessToken?: string;
    setUser: (user?: User) => void;
    isActiveAccessToken: boolean;
    isUserFetched: boolean;
  }
);

export const useUserContext = () => useContext(UserContext);
