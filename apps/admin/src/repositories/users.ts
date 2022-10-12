import { UserInput, CreateUsers, UpdateUsers } from "@ts-types/generated";

import Base from "./base";

class Users extends Base<CreateUsers, UpdateUsers> {
  create = async (url: string, variables: UserInput) => {
    return this.http<UserInput>(url, "post", variables);
  };
}

export default new Users();
