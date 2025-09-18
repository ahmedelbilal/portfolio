import type { GatsbyConfig } from "gatsby";

const siteUrl = process.env.URL || `http://localhost:8000`;

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Ahmed | Full Stack Developer`,
    siteUrl: siteUrl,
    description: `Ahmed's personal portfolio showcasing projects, skills, and contact information.`,
    author: `Ahmed`,
    twitterUsername: `@ahmed_codes_dev`,
    image: `/og.png`,
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-postcss",
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locales`,
        languages: [`ar`, `en`, `it`, `de`],
        defaultLanguage: `en`,
        siteUrl: siteUrl,
        i18nextOptions: {
          detection: {
            order: [
              "querystring",
              "cookie",
              "localStorage",
              "navigator",
              "htmlTag",
            ],
            caches: ["cookie"],
          },
          interpolation: {
            escapeValue: false,
          },
          nsSeparator: false,
          ns: ["translation", "projects", "contact"],
          defaultNS: "translation",
        },
        pages: [
          {
            matchPath: "/:lang?/index",
            getLanguageFromPath: true,
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `locales`,
        path: `${__dirname}/locales`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data`,
      },
    },
    `gatsby-transformer-yaml`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: siteUrl, // Replace with your actual domain
        sitemap: `${siteUrl}/sitemap.xml`, // Or /sitemap.xml if you're using a single file
        policy: [
          { userAgent: "*", allow: "/" }, // Allow all crawlers to crawl all content
          // You can add specific disallows here if needed
          {
            userAgent: "*",
            disallow: [
              "/404/",
              "/dev-404-page/",
              "/offline-plugin-app-shell-fallback/",
            ],
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `tomato`,
        // Disable the loading spinner.
        showSpinner: false,
      },
    },
  ],
};

export default config;
