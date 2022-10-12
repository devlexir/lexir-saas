import User from "@repositories/user";
import { RegisterInput } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation } from "react-query";

export interface IRegisterVariables {
  variables: RegisterInput;
}

export const useRegisterMutation = () => {
  return useMutation(({ variables }: IRegisterVariables) =>
    User.register(API_ENDPOINTS.REGISTER, variables)
  );
};
