import React from "react";

jest.spyOn(React, "createContext");
jest.spyOn(React, "useContext");

export const UserContext = {
  user: undefined,
  logout: undefined,
  refetchUser: undefined,
  isLoadingUserRequest: false,
  isSuccessUserRequest: false
};

export const useUserContext = jest.fn().mockImplementation(() => UserContext);
