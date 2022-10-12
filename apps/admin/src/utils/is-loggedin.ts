import Cookies from "js-cookie";

import { ADMIN,SUPER_ADMIN } from "./constants";

export function loggedIn() {
  const token = Cookies.get("auth_token");
  if (!token) return false;
  if (token) {
    const permissions = Cookies.get("auth_permissions");
    if (!permissions?.includes(SUPER_ADMIN) || !permissions?.includes(ADMIN)) {
      return false;
    }
  }
  return true;
}
