import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export served by GitHub Pages at the custom-domain root
  // (encryptor.temrevil.com) — no basePath/assetPrefix needed.
  output: 'export',
  images: { unoptimized: true },
};

export default nextConfig;
