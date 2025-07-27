/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL'
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors *;"
          }
        ],
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.csv$/,
      use: ['raw-loader'],
    });
    return config;
  },
};

module.exports = nextConfig;