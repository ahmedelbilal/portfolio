import React, { useMemo } from "react";
import { Link as GatsbyLink, GatsbyLinkProps } from "gatsby";
import { useI18next } from "gatsby-plugin-react-i18next";

// Define props for our MultilingualLink component
export interface MultilingualLinkProps
  extends Omit<GatsbyLinkProps<any>, "ref"> {
  /**
   * Target language code (optional)
   * If not provided, will use current language
   */
  language?: string;

  /**
   * Whether to preserve the query parameters when changing language
   */
  preserveQuery?: boolean;

  /**
   * Class name to apply when link points to current page
   */
  activeClassName?: string;
}

/**
 * MultilingualLink component that combines Gatsby's Link with language switching capabilities
 */
export const MultilingualLink: React.FC<MultilingualLinkProps> = ({
  to,
  language,
  preserveQuery = true,
  activeClassName = "active",
  partiallyActive,
  children,
  ...rest
}) => {
  const {
    languages,
    language: currentLanguage,
    originalPath,
    defaultLanguage,
  } = useI18next();

  // Calculate the final destination URL with language consideration
  const finalTo = useMemo(() => {
    // If it's an external link (starts with http, mailto, tel, etc.), don't modify
    if (typeof to === "string" && /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(to)) {
      return to;
    }

    // Get the target language (use provided language or current language)
    const targetLang = language || currentLanguage;

    // Handle string destinations
    if (typeof to === "string") {
      // Extract path and query
      const [path, query] = to.split("?");

      // Create base path with language prefix (unless it's default language)
      const basePath =
        targetLang === defaultLanguage
          ? path
          : `/${targetLang}${path.startsWith("/") ? path : `/${path}`}`;

      // Add query parameters if they exist and should be preserved
      return preserveQuery && query ? `${basePath}?${query}` : basePath;
    }
    // Handle object destinations
    else if (typeof to === "object" && to !== null) {
      const pathname = to.pathname || "";

      // Apply language prefix to pathname
      const langPath =
        targetLang === defaultLanguage
          ? pathname
          : `/${targetLang}${
              pathname.startsWith("/") ? pathname : `/${pathname}`
            }`;

      return {
        ...to,
        pathname: langPath,
      };
    }

    return to;
  }, [to, language, currentLanguage, defaultLanguage, preserveQuery]);

  // Safely handle the props that were causing TypeScript errors
  const safeProps = {
    ...rest,
    placeholder: undefined,
    onResize: undefined,
    onResizeCapture: undefined,
    onPointerEnterCapture: undefined,
    onPointerLeaveCapture: undefined,
    to: finalTo,
    activeClassName,
    partiallyActive,
  };

  return <GatsbyLink {...safeProps}>{children}</GatsbyLink>;
};

// Example usage:
/*
// Basic usage with current language
<MultilingualLink to="/about">About</MultilingualLink>

// Change language while navigating
<MultilingualLink to="/products" language="es">Products in Spanish</MultilingualLink>

// With active styling
<MultilingualLink to="/blog" activeClassName="current-page">Blog</MultilingualLink>
*/
