import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use standalone output so Docker runtime only needs the minimal server bundle.
  output: "standalone",
};

export default nextConfig;
