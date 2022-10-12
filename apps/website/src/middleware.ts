import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  // Clone the request url
  const url = req.nextUrl;

  // Get pathname of request (e.g. /blog-slug)
  const { pathname } = req.nextUrl;

  // Get hostname of request (e.g. demo.localhost:3002)
  const hostname = req.headers.get('host');

  if (!hostname)
    return new Response(null, {
      status: 400,
      statusText: 'No hostname found in request headers',
    });

  const currentHost =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname.replace(`.${process.env.NEXT_PUBLIC_HOSTNAME}`, '')
      : hostname.replace(`.${process.env.NEXT_PUBLIC_HOSTNAME}`, '');

  if (pathname.startsWith(`/_sites`))
    return new Response(null, {
      status: 404,
    });

  if (!pathname.includes('.') && !pathname.startsWith('/api')) {
    // If its a SAAS Dashboard
    if (currentHost == 'app') {
      url.pathname = `/app${pathname}`;
      return NextResponse.rewrite(url);
    }

    console.log(url.pathname);

    let redirectFlag = false;
    if (
      hostname === `${process.env.NEXT_PUBLIC_HOSTNAME}` ||
      hostname === `www.${process.env.NEXT_PUBLIC_HOSTNAME}`
    ) {
      if (url.pathname === '/') {
        url.pathname = `/`;
      } else if (url.pathname === `/_next/image/`) {
        url.pathname = `/_next/image/`;
      } else if (url.pathname === `/saas/account-details/`) {
        url.pathname = `/saas/account-details/`;
      } else if (url.pathname === `/saas/billing-profile/`) {
        url.pathname = `/saas/billing-profile/`;
      } else if (url.pathname === `/saas/brand/`) {
        url.pathname = `/saas/brand/`;
      } else if (url.pathname === `/get-started/`) {
        url.pathname = `/get-started/`;
      } else if (url.pathname === `${pathname}`) {
        redirectFlag = true;
        url.href = `https://shop.lexir.com/${pathname}`;
      }
      if (redirectFlag) {
        return NextResponse.redirect(
          new URL(`https://shop.lexir.com/${pathname}`)
        );
      } else {
        return NextResponse.rewrite(url);
      }
    }

    url.pathname = `/_sites/${currentHost}${pathname}`;
    return NextResponse.rewrite(url);
  }
}
