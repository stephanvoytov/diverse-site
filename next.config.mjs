/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const csp = [
  `default-src 'self'`,
  `img-src 'self' data: https://mc.yandex.ru https://vk.com https://tile.openstreetmap.org https://purecatamphetamine.github.io https://us-assets.i.posthog.com https://assets.tina.io`,
  `script-src 'self' 'unsafe-eval' 'unsafe-inline' https://mc.yandex.ru https://vk.com https://us-assets.i.posthog.com`,
  `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
  `font-src 'self' data: https://fonts.gstatic.com https://fonts.googleapis.com`,
  `frame-src 'self' https://*.tina.io https://*.tinajs.io`,
  `frame-ancestors 'self' https://*.tinajs.io`,
  `connect-src 'self' https://mc.yandex.ru https://vk.com https://tile.openstreetmap.org https://*.tinajs.io https://content.tinajs.io https://identity.tinajs.io https://identity-v2.tinajs.io https://assets.tinajs.io https://app.tina.io https://cognito-idp.us-east-1.amazonaws.com https://s3.us-east-1.amazonaws.com https://us-assets.i.posthog.com https://us.i.posthog.com`,
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
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
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
