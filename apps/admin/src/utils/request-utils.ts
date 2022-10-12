import SSRCookie from 'cookie';
import Cookie from 'js-cookie';

export const SUBDOMAIN = 'SUBDOMAIN';

export function setSubdomain(subdomain: string) {
  subdomain = subdomain.split('.')[0];
  Cookie.set(SUBDOMAIN, JSON.stringify({ subdomain }));
}

export function getSubdomain(context?: any): {
  subdomain: string;
} {
  let subdomain;
  if (context) {
    subdomain = parseSSRCookie(context)[SUBDOMAIN];
  } else {
    subdomain = Cookie.get(SUBDOMAIN);
  }
  if (subdomain) {
    return JSON.parse(subdomain);
  }
  return { subdomain: 'admin' };
}

export function parseSSRCookie(context: any) {
  return SSRCookie.parse(context.req.headers.cookie ?? '');
}
