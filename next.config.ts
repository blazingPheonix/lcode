// next.config.js
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // move turbopack out of `experimental` into top-level
  turbopack: {
    // absolute path to your app directory
    root: path.resolve(__dirname),
    // other turbopack options (rules, resolveAlias, etc.) go here
  },
};

module.exports = nextConfig;
