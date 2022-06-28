import useContextFactory from "./hooks/useContextFactory";
import {AuthDao, UserDao} from "./domain/dao";

export interface DependencyContext {
	daos: {
		userDao: UserDao;
		authDao: AuthDao;
	};
}

const context = useContextFactory<DependencyContext>(undefined!)

export const useDependencyContext = context.useContext;
export const DependencyProvider = context.ContextProvider;