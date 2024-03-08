/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'


module.exports = {
  output: "standalone",
  basePath: '/next',
  assetPrefix: isProd ? "/next/" : '',
};
