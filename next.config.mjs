/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "factory-universe-co.mo.cloudinary.net",
      "45.33.6.167",
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.manifest\.json$/,
        use: ["webpack-manifest-plugin/src/lib/WebpackManifestInserter"],
      });
    }
    return config;
  },
  async headers() {
    return [
      {
        source: '/.well-known/apple-app-site-association',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json'
          }
        ]
      }
    ];
  },
};

export default nextConfig;
