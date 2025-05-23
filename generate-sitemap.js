// generate-sitemap.js
const fs = require("fs");
const path = require("path");

const siteUrl = process.env.URL || `http://localhost:9000`;

const languages = ["ar", "de", "it", "en"]; // Your supported languages
const defaultLanguage = "en";

// Define your pages and their "original" paths (without language prefixes)
const pages = [
  { path: "/", priority: 1.0, changefreq: "daily" },
  { path: "/contact", priority: 0.8, changefreq: "weekly" },
  { path: "/projects", priority: 0.8, changefreq: "weekly" },
  { path: "/skills", priority: 0.8, changefreq: "weekly" },
  // Add other non-language-specific pages here if any, e.g., /privacy-policy
];

const generateSitemap = () => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  pages.forEach((page) => {
    // Generate the entry for the default language (English, no /en prefix)
    const defaultLangUrl = `${siteUrl}${page.path}`;

    xml += `
  <url>
    <loc>${defaultLangUrl}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`;

    // Add hreflang links for all language versions of this page
    languages.forEach((lang) => {
      let langUrl;
      if (lang === defaultLanguage) {
        // English (default): no /en prefix
        langUrl = `${siteUrl}${page.path}`;
      } else {
        // Other languages: with /lang prefix
        // Handle root path / for non-default languages correctly (e.g., /es/)
        langUrl = `${siteUrl}/${lang}${page.path === "/" ? "" : page.path}`;
      }
      xml += `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${langUrl}" />`;
    });

    // Add x-default link pointing to the un-prefixed English version
    xml += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultLangUrl}" />`;

    xml += `
  </url>`;

    // Now, explicitly add entries for other languages that *do* have prefixes
    languages
      .filter((lang) => lang !== defaultLanguage)
      .forEach((lang) => {
        const prefixedLangUrl = `${siteUrl}/${lang}${
          page.path === "/" ? "" : page.path
        }`;
        xml += `
  <url>
    <loc>${prefixedLangUrl}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`;

        // Add hreflang for this prefixed version (including itself)
        languages.forEach((innerLang) => {
          let innerLangUrl;
          if (innerLang === defaultLanguage) {
            innerLangUrl = `${siteUrl}${page.path}`;
          } else {
            innerLangUrl = `${siteUrl}/${innerLang}${
              page.path === "/" ? "" : page.path
            }`;
          }
          xml += `
    <xhtml:link rel="alternate" hreflang="${innerLang}" href="${innerLangUrl}" />`;
        });
        // Add x-default as well for prefixed versions
        xml += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultLangUrl}" />`;
        xml += `
  </url>`;
      });
  });

  xml += `
</urlset>`;

  const sitemapPath = path.resolve(__dirname, "public", "sitemap.xml");
  fs.writeFileSync(sitemapPath, xml, "utf8");
  console.log(`Sitemap generated at ${sitemapPath}`);
};

// Run the function
generateSitemap();
