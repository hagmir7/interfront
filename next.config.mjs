/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'app.intercocina.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dev.intercocina.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'intercocina.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.intercocina.com', // fixed typo: was "wwww"
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**',
      },
    ],
  },

  experimental: {
    workerThreads: false,
    cpus: 1,
  },

  async redirects() {
    return [
      // non-www → www (host-based redirect)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'intercocina.com',
          },
        ],
        destination: 'https://www.intercocina.com/:path*',
        permanent: true, // 301
      },
    ];
  },
};

export default nextConfig;