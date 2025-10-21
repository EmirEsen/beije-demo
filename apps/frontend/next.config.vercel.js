/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    distDir: 'dist',
    experimental: {
        outputFileTracingRoot: '../../',
    },
}

module.exports = nextConfig
