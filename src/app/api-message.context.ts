import useContextFactory from "./hooks/useContextFactory";
import React from "react";

const apiMessageContext = useContextFactory<React.Dispatch<React.SetStateAction<string[]>>>(undefined!);

export const useApiMessage = apiMessageContext.useContext;
export const ApiMessageProvider = apiMessageContext.ContextProvider;