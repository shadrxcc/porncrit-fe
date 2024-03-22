/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "res.cloudinary.com",
            "cdn77-pic.xvideos-cdn.com",
            "img-egc.xvideos-cdn.com",
            "gcore-pic.xvideos-cdn.com",
            "ei.phncdn.com",
            "ei-ph.rdtcdn.com"
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
            {
                protocol: 'https',
                hostname: 'gcore-pic.xvideos-cdn.com',
                port: '',
                pathname: '/videos/**',
            },
            {
                protocol: 'https',
                hostname: 'ei.phncdn.com',
                port: '',
                pathname: '/videos/**',
            },
            {
                protocol: 'https',
                hostname: 'ei-ph.rdtcdn.com',
                port: '',
                pathname: '/videos/**',
            },
        ],
    },
};


export default nextConfig;
