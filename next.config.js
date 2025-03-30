/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    experimental: {
        allowedDevOrigins: ["192.168.3.14"],
    },
    output: "export",
    trailingSlash: true,
};

export default nextConfig;
