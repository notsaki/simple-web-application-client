import useContextFactory from "./hooks/useContextFactory";
import {Jwt} from "./domain/entities/jwt.entity";

interface TokenContext {
	token: Jwt | null;
	setToken: (token: Jwt) => void;
	clearToken: () => void;
}

const authContext = useContextFactory<TokenContext>(undefined!)

export const useAuthContext = authContext.useContext;
export const AuthProvider = authContext.ContextProvider;