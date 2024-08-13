/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
        },
    ],
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/',
            },
            {
                source: `/:shortCode`,
                destination: '/api/url/redirect/:shortCode',
            }
        ]
    }
};

export default nextConfig;
