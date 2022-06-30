import useContextFactory from "./hooks/useContextFactory";

const authContext = useContextFactory<[boolean, (value: boolean) => void]>(undefined!)

export const useSessionStateContext = authContext.useContext;
export const SessionStateProvider = authContext.ContextProvider;