import { getBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config"; // assuming you have siteConfig.url
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = await getBlogPosts();
  const domain = siteConfig.url; // ✅ hardcoded base URL

  return [
    {
      url: `${domain}`,
      lastModified: new Date(),
    },
    ...allPosts.map((post) => ({
      url: `${domain}/blog/${post.slug}`,
      lastModified: new Date(), // you can also use post.publishedAt here if accurate
    })),
  ];
}
