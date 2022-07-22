import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { IRoutePropsInterface } from "../../config/interfaces/props/IRouteProps.interface";

const TravelerRoute = ({component: Component, ...rest}: IRoutePropsInterface) => {
  const {user} = useAuth();
  if (user.type === 'traveler') {
    return <Component {...rest} />
  }
  return <Navigate to={"/"} />
}
export default TravelerRoute;
