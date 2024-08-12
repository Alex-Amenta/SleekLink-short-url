/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
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
