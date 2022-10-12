import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { Console } from 'console';

export default function middleware(req: NextRequest) {
  // Clone the request url
  // const cookies = req.cookies; // Get
  // const geo = req.geo;
  // const ip = req.ip;
  const url = req.nextUrl;

  // Get pathname of request (e.g. /blog-slug)
  let { pathname } = req.nextUrl;

  // Get hostname of request (e.g. demo.localhost:3002)
  const hostname = req.headers.get('host');

  if (!hostname)
    return new Response(null, {
      status: 400,
      statusText: 'No hostname found in request headers',
    });

  const currentHost =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname.replace(`.lexir.com`, '')
      : hostname.replace(`.${process.env.NEXT_PUBLIC_HOSTNAME}`, '');

  if (pathname.startsWith(`/_sites`))
    return new Response(null, {
      status: 404,
    });

  // Redirect the admin panel to the admin panel
  if (pathname.endsWith('/admin/')) {
    pathname = pathname.replace('/admin', '');
    url.pathname = `/_sites/${currentHost}${pathname}`;
    return NextResponse.rewrite(url);
  }

  // Redirect the admin to the admin panel
  if (
    pathname.startsWith('/') &&
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/icons') &&
    !pathname.startsWith('/api')
  ) {
    url.pathname = `/_sites/${currentHost.replace('.admin', '')}${pathname}`;
    return NextResponse.rewrite(url);
  }
}

// // !currentHost.match('admin')
// console.log(currentHost);
// // url.href = `http://baldoria.localhost:3009/get-started`;
// // console.s();
// pathname = pathname.replace('/admin', '');
// console.log(pathname);
//
//
//TO IMPLEMENT
// if (!pathname.includes('.') && !pathname.startsWith('/api')) {
//   // If its a SAAS Dashboard
//   if (req.nextUrl.href.includes('/_next/image')) {
//     return NextResponse.rewrite(
//       req.nextUrl.href.replace('/_next/image', '/_next/image')
//     );
//   }

//   if (currentHost == 'app') {
//     url.pathname = `/app${pathname}`;
//     return NextResponse.rewrite(url);
//   }

//   url.pathname = `/_sites/${currentHost}${pathname}`;
//   return NextResponse.rewrite(url);
// }

// if (
//   pathname === '/login' &&
//   (req.cookies['next-auth.session-token'] ||
//     req.cookies['__Secure-next-auth.session-token'])
// ) {
//   url.pathname = '/'
//   return NextResponse.redirect(url)
// }
