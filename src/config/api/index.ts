import config from "../app_config/config";
import {IRequestInterface} from "../interfaces/IRequest.interface";
import {ACCESS_TOKEN} from "../helpers/constants";
import {IResponseInterface} from "../interfaces/IResponse.interface";

const API = async <T>({url, method = "GET", headers = {}, body}: IRequestInterface): Promise<IResponseInterface<T>> => {
  const token = localStorage.getItem(ACCESS_TOKEN) ?? '';
  const response = await fetch(`${config.apiUrl}${url}`, {
    method,
    body,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      "Content-Type": "application/json",
      ...headers,
    },
  });
  return await response.json();
}
export default API;
