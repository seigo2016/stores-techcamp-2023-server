/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["sarutahiko.jp"],
  },
  async redirects() {
    return [
      {
        source: "/", // リダイレクト元のURL
        destination: "/product", // リダイレクト先のURL
        permanent: true, // 永続的なリダイレクトかのフラグ
      },
    ];
  },
};

module.exports = nextConfig;
