import useContextFactory from "./hooks/useContextFactory";
import React from "react";

const authContext = useContextFactory<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>(undefined!)

export const useAuthContext = authContext.useContext;
export const AuthProvider = authContext.ContextProvider;