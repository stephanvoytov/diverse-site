/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const csp = [
  `default-src 'self'`,
  `img-src 'self' data: https://mc.yandex.ru https://vk.com https://tile.openstreetmap.org https://purecatamphetamine.github.io`,
  `script-src 'self' 'unsafe-eval' 'unsafe-inline' https://mc.yandex.ru https://vk.com`,
  `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
  `font-src 'self' data: https://fonts.gstatic.com https://fonts.googleapis.com`,
  `frame-src 'self' https://*.tina.io https://*.tinajs.io`,
  `connect-src 'self' https://mc.yandex.ru https://vk.com https://tile.openstreetmap.org https://*.tinajs.io https://content.tinajs.io https://identity.tinajs.io https://assets.tinajs.io https://app.tina.io https://cognito-idp.us-east-1.amazonaws.com`,
  `form-action 'self'`,
].join("; ");

const nextConfig = {
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  poweredByHeader: false,
  experimental: {
    inlineCss: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
      {
        source: "/admin/",
        destination: "/admin/index.html",
      },
    ];
  },
};

export default nextConfig;
