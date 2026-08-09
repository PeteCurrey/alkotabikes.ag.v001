import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy-Report-Only",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self';",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/dealers", destination: "/partners", permanent: true },
      { source: "/dealers/find", destination: "/partners/find", permanent: true },
      { source: "/bikes", destination: "/bikes/project-01", permanent: true },
      { source: "/support", destination: "/ownership", permanent: true },
      { source: "/support/owners", destination: "/ownership", permanent: true },
      { source: "/support/technical", destination: "/ownership", permanent: true },
      { source: "/journal/project-01", destination: "/journal?tag=programme", permanent: true },
      { source: "/racing/dispatch", destination: "/journal?tag=racing", permanent: true },
    ];
  },
};

export default nextConfig;
