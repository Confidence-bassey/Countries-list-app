import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    styledComponents: true, // Enables better SSR support for styled-components
  },
};

export default nextConfig;
