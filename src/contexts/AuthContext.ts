import {createContext} from "react";
import {IUserInterface} from "../config/interfaces/IUser.interface";
export const DEFAULT_AUTH_CONTEXT_STATE = {
  isLoggedIn: false,
  user: {},
  logout: () => {},
  login: (user: IUserInterface, token: string) => {},
};
const AuthContext = createContext(DEFAULT_AUTH_CONTEXT_STATE);
export default AuthContext;
