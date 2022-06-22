import useContextFactory from "./hooks/useContextFactory";
import {UserDao} from "./domain/dao";

export interface DependencyContext {
	daos: {
		userDao: UserDao;
	};
}

const context = useContextFactory<DependencyContext>(undefined!)

export const useDependencyContext = context.useContext;
export const DependencyProvider = context.ContextProvider;