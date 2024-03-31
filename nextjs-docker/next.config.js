/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'
console.log({ isProd })

module.exports = {
  output: "standalone",
  assetPrefix: isProd ? "/next/" : '',
};
