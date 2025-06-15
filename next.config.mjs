/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      { hostname: "localhost" },
      { hostname: "randomuser.me" },
    ],
  },
};

export default nextConfig;