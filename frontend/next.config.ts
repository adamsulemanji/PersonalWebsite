const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isProduction
    ? {
        output: 'export',
        distDir: 'build',
      }
    : {}),
  // This app lives in a subdirectory of the repo (the CDK project is the root,
  // and has its own lockfile). Pin the tracing root so Next doesn't warn about
  // multiple lockfiles or guess the wrong workspace root.
  outputFileTracingRoot: __dirname,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
};

module.exports = nextConfig;
