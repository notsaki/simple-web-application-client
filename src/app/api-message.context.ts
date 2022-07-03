import useContextFactory from "./hooks/useContextFactory";
import React from "react";

/**
 * This context is used to hold response error messages from the API. Because most of the errors are common among the
 * endpoints, they should be handled globally.
 */

const apiMessageContext = useContextFactory<(value: string[]) => void>(undefined!);

export const useApiMessage = apiMessageContext.useContext;
export const ApiMessageProvider = apiMessageContext.ContextProvider;