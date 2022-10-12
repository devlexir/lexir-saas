import SSRCookie from 'cookie';
import Cookie from 'js-cookie';

import {
  ADMIN,
  AUTH_CRED,
  PERMISSIONS,
  STAFF,
  STORE_OWNER,
  SUPER_ADMIN,
  BRAND,
  TOKEN,
} from './constants';

export const allowedRoles = [SUPER_ADMIN, ADMIN, STORE_OWNER, STAFF, BRAND];
export const adminAndOwnerOnly = [SUPER_ADMIN, STORE_OWNER];
export const adminOwnerAndStaffOnly = [SUPER_ADMIN, STORE_OWNER, STAFF];
export const superAdminOnly = [SUPER_ADMIN];
export const superAdminAndAdminOnly = [SUPER_ADMIN, ADMIN];
export const superAdminAndAdminAndBrandOnly = [SUPER_ADMIN, ADMIN, BRAND];
export const adminOnly = [ADMIN];
export const brandOnly = [BRAND];
export const ownerOnly = [STORE_OWNER];

export function setAuthCredentials(token: string, permissions: any) {
  Cookie.set(AUTH_CRED, JSON.stringify({ token, permissions }));
}

export function getAuthCredentials(context?: any): {
  token: string | null;
  permissions: string[] | null;
} {
  let authCred;
  if (context) {
    authCred = parseSSRCookie(context)[AUTH_CRED];
  } else {
    authCred = Cookie.get(AUTH_CRED);
  }
  if (authCred) {
    return JSON.parse(authCred);
  }
  return { token: null, permissions: null };
}

export function parseSSRCookie(context: any) {
  return SSRCookie.parse(context.req.headers.cookie ?? '');
}

export function hasAccess(
  _allowedRoles: string[],
  _userPermissions: string[] | undefined | null
) {
  if (_userPermissions) {
    return Boolean(
      _allowedRoles?.find((aRole) => _userPermissions.includes(aRole))
    );
  }
  return false;
}
export function isAuthenticated(_cookies: any) {
  return (
    !!_cookies[TOKEN] &&
    Array.isArray(_cookies[PERMISSIONS]) &&
    !!_cookies[PERMISSIONS].length
  );
}
