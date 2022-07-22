import config from "../app_config/config";
import { IRequestInterface } from "../interfaces/IRequest.interface";
import { ACCESS_TOKEN } from "../helpers/constants";
import { IResponseInterface } from "../interfaces/IResponse.interface";
import axios from "axios";

const API = async <T>({
                        url,
                        method = "GET",
                        headers = {},
                        body
                      }: IRequestInterface): Promise<IResponseInterface<T>> => {
  const token = localStorage.getItem(ACCESS_TOKEN) ?? "";
  const response = await axios({
    url: `${config.apiUrl}${url}`,
    method,
    data: body,
    headers: {
      authorization: token ? `Bearer ${token}` : "",
      "content-type": "application/json",
      ...headers
    }
  });
  // const response = await fetch(`${config.apiUrl}${url}`, {
  //   method,
  //   body,
  //   headers: {
  //     Authorization: token ? `Bearer ${token}` : '',
  //     "Content-Type": "application/json",
  //     ...headers,
  //   },
  // });
  // return await response.json();
  const data: IResponseInterface<T> = response.data;
  return data;
};
export default API;
