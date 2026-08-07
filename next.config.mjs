const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.mixkit.co"
      }
    ]
  }
};

export default nextConfig;
