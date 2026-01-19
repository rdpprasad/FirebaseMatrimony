import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { dev, isServer }) => {
    // Enable Fast Refresh in development
    if (dev && !isServer) {
      config.optimization.moduleIds = 'named';
    }
    return config;
  },
};

export default nextConfig;
