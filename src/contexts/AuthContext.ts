import { createContext } from "react";
import { LoginCredentials } from "../config/interfaces/props/ILoginFormProps";
import { RegisterCredentials } from "../config/interfaces/props/IRegisterFormProps";
import { IUserInterface } from "../config/interfaces/IUser.interface";
import { IUserAuthenticationResponse } from "../config/interfaces/responses/IUserAuthenticationResponse.interface";
import { ITravelerReview } from "../config/interfaces/ITravelerReview.interface";
import { ICompanyInterface } from "../config/interfaces/ICompany.interface";

interface AuthContextInterface {
  isLoggedIn: boolean;
  user: IUserInterface;
  traveler?: ITravelerReview;
  company?: ICompanyInterface;
  logout: () => void;
  login: (credentials: LoginCredentials) => Promise<void>;
  getUser: () => Promise<void>;
  updateUser: (userData: IUserInterface) => Promise<void>;
  updateProfilePicture: (file?: File) => Promise<void>;
  updateCoverPicture: (file?: File) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
  makeAuth: (data: IUserAuthenticationResponse) => void;
}

export const DEFAULT_AUTH_CONTEXT_STATE: AuthContextInterface = {
  isLoggedIn: false,
  user: {
    id: 0,
    profile_picture: "",
    name: "",
    type: ""
  },
  logout: () => {
  },
  login: async (credentials: LoginCredentials) => {
  },
  getUser: async () => {
  },
  updateUser: async (userData: IUserInterface) => {
  },
  updateProfilePicture: async (file?: File) => {
  },
  updateCoverPicture: async (file?: File) => {
  },
  register: async (credentials: RegisterCredentials) => {
  },
  changePassword: async (newPassword: string) => {
  },
  makeAuth: (data: IUserAuthenticationResponse) => {
  }
};
const AuthContext = createContext(DEFAULT_AUTH_CONTEXT_STATE);
export default AuthContext;
