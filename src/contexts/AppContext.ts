import {createContext} from "react";
import {APP_NAME} from "../config/helpers/constants";
export const DEFAULT_APP_CONTEXT_STATE = {
  pageTitle: APP_NAME,
  setPageTitle: (title: string) => {}
};
const AppContext = createContext(DEFAULT_APP_CONTEXT_STATE);
export default AppContext;
