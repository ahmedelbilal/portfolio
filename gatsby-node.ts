import type { GatsbyNode } from "gatsby";

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    const { createTypes } = actions;
    createTypes(`
    type SitePage implements Node {
      context: SitePageContext
    }
    type SitePageContext {
      i18n: i18nContext
    }
    type i18nContext {
      language: String
      languages: [String]
      defaultLanguage: String
      originalPath: String
      routed: Boolean
      generateDefaultLanguagePage: Boolean
    }
  `);
  };
