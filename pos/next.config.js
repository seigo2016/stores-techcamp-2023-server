/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["tailwindui.com", "www.doutor.co.jp", "sarutahiko.jp"],
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
