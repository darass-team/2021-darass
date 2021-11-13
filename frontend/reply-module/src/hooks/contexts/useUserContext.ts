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
  }
);

export const useUserContext = () => useContext(UserContext);
