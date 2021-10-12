import { User } from "@/types/user";
import { createContext } from "react";

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
