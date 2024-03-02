/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["res.cloudinary.com"], // Add your cloudinary hostname here
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
                pathname: "/df3iuo3n2/**",
            },
        ],
    },
};


export default nextConfig;
