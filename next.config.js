/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "localhost",
            "scontent-dfw5-1.cdninstagram.com",
            "scontent-iev1-1.cdninstagram.com",
            "scontent-lhr8-1.cdninstagram.com",
            "scontent-xx4-1.cdninstagram.com",
            "scontent-gru1-1.cdninstagram.com",
        ],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                bufferutil: false,
                "utf-8-validate": false,
                ws: false,
                fs: false,
                net: false,
                tls: false,
            };
        }
        return config;
    },
};

module.exports = nextConfig;
