import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bfk51v7csb.ufs.sh",
        port: "",
        pathname: "/f/**",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
