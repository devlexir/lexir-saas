/** @type {import('next').NextConfig} */
//

// const { i18n } = require('./next-i18next.config');

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

module.exports = {
  eslint: {
    dirs: ['src'],
  },
  productionBrowserSourceMaps: true,

  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    esmExternals: false,
  },
  // i18n,
  // pwa: {
  //   disable: false, //process.env.NODE_ENV === "development",
  //   dest: 'public',
  //   runtimeCaching,
  //   buildExcludes: [/middleware-manifest.json$/],
  // },

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
  typescript: {
    ignoreBuildErrors: true,
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  // swcMinify: false,
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/i,
  //     issuer: /\.[jt]sx?$/,
  //     use: [
  //       {
  //         loader: '@svgr/webpack',
  //         options: {
  //           typescript: true,
  //           icon: true,
  //         },
  //       },
  //     ],
  //   });

  //   return config;
  // },
};
