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
        hostname: 'wwww.intercocina.com',
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
    cpus: 1
  },

  // turbopack: {
  //   root: '/home/nepi6015',
  // },

};

export default nextConfig;