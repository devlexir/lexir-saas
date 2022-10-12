// /**
//  * @type {import('next').NextConfig}
//  */
// const { i18n } = require('./next-i18next.config');
// const withPWA = require('next-pwa');
// const runtimeCaching = require('next-pwa/cache');
// module.exports = withPWA({
//   reactStrictMode: true,
//   pwa: {
//     dest: 'public',
//     disable: process.env.NODE_ENV === 'development',
//     runtimeCaching,
//   },
//   i18n,
//   ...(process.env.NODE_ENV === 'production' && {
//     typescript: {
//       ignoreBuildErrors: true,
//     },
//     eslint: {
//       ignoreDuringBuilds: true,
//     },
//   }),
// });

/** @type {import('next').NextConfig} */
//

// const { i18n } = require('./next-i18next.config');

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

const { i18n } = require('./next-i18next.config');
const withTM = require('next-transpile-modules')([
  // Add "math-helpers" to this array:
  'ui',
  'global-ts-types',
]);

module.exports = withTM({
  i18n,
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    esmExternals: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'via.placeholder.com',
      'res.cloudinary.com',
      's3.amazonaws.com',
      '18.141.64.26',
      '127.0.0.1:8000',
      'localhost',
      'picsum.photos',
      'lh3.googleusercontent.com',
      'pixarlaravel.s3.ap-southeast-1.amazonaws.com',
      'www.datocms-assets.com',
      'https://www.datocms-assets.com',
      'aroundthetree.eu',
      'res.cloudinary.com',
      'abs.twimg.com',
      'pbs.twimg.com',
      'avatars.githubusercontent.com',
      'drive.google.com',
      'uploads-ssl.webflow.com',
      'cdn-lexir.s3.eu-west-3.amazonaws.com',
    ],
  },
});
