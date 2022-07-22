import { ComponentType } from "react";

export interface IRoutePropsInterface {
  component: ComponentType<any>;
  [key: string]: any;
}
