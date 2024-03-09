/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "res.cloudinary.com",
            "cdn77-pic.xvideos-cdn.com",
            "img-egc.xvideos-cdn.com"
        ],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
                pathname: "/df3iuo3n2/**",
            },
            {
                protocol: 'https',
                hostname: 'cdn77-pic.xvideos-cdn.com',
                port: '',
                pathname: '/videos/**',
            },
            {
                protocol: 'https',
                hostname: 'img-egc.xvideos-cdn.com',
                port: '',
                pathname: '/videos/**',
            },
        ],
    },
};


export default nextConfig;
