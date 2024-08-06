/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
