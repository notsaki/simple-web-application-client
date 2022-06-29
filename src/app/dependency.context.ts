import useContextFactory from "./hooks/useContextFactory";
import {AuthDao, UserDao} from "./domain/dao";

/**
 * An object that holds all the required implementations and data that need to be accessed throught the whole app.
 */
export interface DependencyContext {
	daos: {
		userDao: UserDao;
		authDao: AuthDao;
	};
}

const context = useContextFactory<DependencyContext>(undefined!)

export const useDependencyContext = context.useContext;
export const DependencyProvider = context.ContextProvider;