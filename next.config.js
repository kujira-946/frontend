/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: "/logbook",
        destination: "/dashboard/logbooks",
        permanent: true,
      },
      {
        source: "/logbooks",
        destination: "/dashboard/logbooks",
        permanent: true,
      },
      {
        source: "/review",
        destination: "/dashboard/reviews",
        permanent: true,
      },
      {
        source: "/reviews",
        destination: "/dashboard/reviews",
        permanent: true,
      },
      {
        source: "/setting",
        destination: "/dashboard/settings",
        permanent: true,
      },
      {
        source: "/settings",
        destination: "/dashboard/settings",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
