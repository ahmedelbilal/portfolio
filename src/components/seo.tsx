// src/components/SEO.tsx
import React, { PropsWithChildren } from "react";
import { useSiteMetadata } from "../hooks/use-site-metadata";

type SeoProps = {
  title?: string;
  description?: string;
  lang?: string; // Optional: language for the HTML tag if needed
  keywords?: string;
  location: { pathname: string };
};

export const SEO: React.FC<PropsWithChildren<SeoProps>> = ({
  title,
  description,
  children,
  location,
  lang,
  keywords,
}) => {
  const {
    title: defaultTitle,
    description: defaultDescription, // get the raw key or fallback description here
    siteUrl,
    twitterUsername,
  } = useSiteMetadata();

  // --- Canonical URL Logic (Leveraging i18n context) ---
  let canonicalUrl: string;
  const currentPathname = location.pathname;

  let originalPath = currentPathname;

  if (lang != "en") {
    originalPath = currentPathname.substring(3);
  }

  canonicalUrl = `${siteUrl}${currentPathname}`;

  // SEO metadata for Open Graph, Twitter, etc.
  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `/images/og-${lang}.png`,
    url: `${siteUrl}${currentPathname}`, // Use the actual current URL for Open Graph/Twitter
    twitterUsername,
  };

  return (
    <>
      {/* Set the html lang attribute based on current language */}
      <html lang={lang || "en"} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={keywords} />
      <meta name="image" content={seo.image} />
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={seo.twitterUsername} />
      {/* Canonical Tag (THIS IS THE KEY ADDITION) */}
      <link rel="canonical" href={canonicalUrl} />
      {["ar", "de", "it"].map((lang) => (
        <link
          rel="alternate"
          hrefLang={lang}
          href={`${siteUrl}${originalPath}${lang}`}
        />
      ))}
      {["en", "x-default"].map((lang) => (
        <link
          rel="alternate"
          hrefLang={lang}
          href={`${siteUrl}${originalPath}`}
        />
      ))}

      <link rel="icon" href="/images/ahmed.png" />
      {children}
    </>
  );
};
