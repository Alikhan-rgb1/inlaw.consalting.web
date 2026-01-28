import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    qualities: [75, 100],
  },
  allowedDevOrigins: ["192.168.0.105", "192.168.0.100"],
};

export default nextConfig;
