/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.ignoreWarnings = [
            {
                module: /sequelize/, //a Regexp
            }
        ];
        return config;
    }
};

export default nextConfig;
