import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        BACKEND_URL: process.env.BACKEND_URL,
        AUTH_TOKEN: process.env.AUTH_TOKEN,
    },
};

export default nextConfig;
