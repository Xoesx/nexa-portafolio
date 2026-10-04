import type { MetadataRoute } from "next";
import { SITIO } from "./_data/sitio";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/demos/restaurante/admin", "/demos/restaurante/api/"],
    },
    sitemap: `${SITIO.url}/sitemap.xml`,
    host: SITIO.url,
  };
}
