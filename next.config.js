const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['k.kakaocdn.net'],
  },
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

module.exports = withPWA(nextConfig);
