/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
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

  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Content-Security-Policy', value: "frame-ancestors 'self'; object-src 'none'; base-uri 'self'" },
      ],
    }];
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
