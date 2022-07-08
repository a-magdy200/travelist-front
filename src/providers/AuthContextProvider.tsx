import {ComponentProps, useState} from "react";
import AuthContext from "../contexts/AuthContext";
import {IUserInterface} from "../config/interfaces/IUser.interface";
import {ACCESS_TOKEN} from "../config/helpers/constants";
import {useNavigate} from "react-router-dom";

const AuthContextProvider = ({children}: ComponentProps<any>) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<IUserInterface>({});
  const navigate = useNavigate();
  const authContextValue = {
    isLoggedIn,
    user: userDetails,
    logout: () => {
      setIsLoggedIn(false);
      setUserDetails({});
      navigate("/");
    },
    login: (user: IUserInterface, token: string = '') => {
      setIsLoggedIn(true);
      setUserDetails(user);
      localStorage.setItem(ACCESS_TOKEN, token);
      navigate("/");
    }
  };
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthContextProvider;
