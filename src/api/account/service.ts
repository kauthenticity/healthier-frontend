import { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { accountFetcher } from "./fetcher";
import type {
  ISignUpRequest,
  IValidateAccountResponse,
  IValidatePasswordRequest,
  ILoginRequest,
  ILoginResponse,
  IException,
  IUserResponse,
} from "src/interfaces/account";

export const validateEmail = async (email: string) => {
  try {
    const validationData = await accountFetcher.validateEmail(email);

    return validationData;
  } catch (err) {
    if (err instanceof AxiosError && err.response) {
      const { status } = err.response;

      if (status === StatusCodes.BAD_REQUEST) {
        return err.response.data as IValidateAccountResponse;
      }
    }

    throw new Error();
  }
};

export const validatePassword = async (body: IValidatePasswordRequest) => {
  try {
    const validationData = await accountFetcher.validatePassword(body);

    return validationData;
  } catch (err) {
    if (err instanceof AxiosError && err.response) {
      const { status } = err.response;

      if (status === StatusCodes.BAD_REQUEST) {
        return err.response.data as IValidateAccountResponse;
      }
    }

    throw new Error();
  }
};

export const signup = async (body: ISignUpRequest): Promise<IValidateAccountResponse> => {
  try {
    const signupData = await accountFetcher.signUpUser(body);

    return signupData;
  } catch (err) {
    if (err instanceof AxiosError && err.response) {
      const { status } = err.response;

      if (status === StatusCodes.BAD_REQUEST) {
        return err.response.data as IValidateAccountResponse;
      }
    }

    throw new Error();
  }
};

export const loginUser = async (body: ILoginRequest): Promise<ILoginResponse | IException> => {
  try {
    const loginData = await accountFetcher.loginUser(body);

    return loginData;
  } catch (err) {
    if (err instanceof AxiosError && err.response) {
      const { status } = err.response;

      if (status === StatusCodes.UNAUTHORIZED) {
        return err.response.data as IException;
      }
    }

    throw new Error();
  }
};

export const validateToken = async (): Promise<IUserResponse | IException> => {
  try {
    const validationData = await accountFetcher.validateToken();

    return validationData;
  } catch (err) {
    console.log(err);
    console.log(err instanceof AxiosError);
    if (err instanceof AxiosError && err.response) {
      const { status } = err.response;

      if (status === StatusCodes.UNAUTHORIZED) {
        return err.response.data as IException;
      }
    }

    throw new Error();
  }
};

export const logout = async (): Promise<IUserResponse> => {
  const logoutData = await accountFetcher.logout();

  return logoutData;
};
