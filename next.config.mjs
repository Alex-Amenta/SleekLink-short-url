/** @type {import('next').NextConfig} */
const nextConfig = {
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
