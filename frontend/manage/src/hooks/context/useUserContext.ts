import { UserContext } from "@/context/userContext";
import { useContext } from "react";

export const useUserContext = () => useContext(UserContext);
