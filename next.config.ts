import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.NEXT_EXPORT === "true" ? { output: "export" } : {}),
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      { source: "/case-studies/deepastro", destination: "/case-studies/deepastro/index.html" },
      { source: "/case-studies/tradex", destination: "/case-studies/tradex/index.html" },
      { source: "/case-studies/pathwise", destination: "/case-studies/pathwise/index.html" },
      { source: "/case-studies/designos", destination: "/case-studies/designos/index.html" },
      { source: "/case-study/deepastro", destination: "/case-studies/deepastro/index.html" },
      { source: "/case-study/tradex", destination: "/case-studies/tradex/index.html" },
      { source: "/case-study/pathwise", destination: "/case-studies/pathwise/index.html" },
      { source: "/case-study/designos", destination: "/case-studies/designos/index.html" },
    ];
  },
};

export default nextConfig;
