import { graphql, HeadProps, type HeadFC, type PageProps } from "gatsby";
import { Link, useTranslation } from "gatsby-plugin-react-i18next";
import {
  ArrowRight,
  Code,
  Github,
  Globe,
  Languages,
  Linkedin,
  Mail,
} from "lucide-react";
import * as React from "react";
import Layout from "../components/layout";
import { SEO } from "../components/seo";
import getIcon from "../utils/get-icon";
const Icons: Record<string, React.ElementType> = {
  Code,
  Github,
  Globe,
  Languages,
  Linkedin,
  Mail,
};

const IndexPage: React.FC<PageProps<Queries.IndexPageQuery>> = ({ data }) => {
  const { t, i18n } = useTranslation();
  const socialLinks = data.allSocialLinksYaml.nodes;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto gap-10 px-6 py-20">
        {/* Text */}
        <div className="text-center md:text-start max-w-xl">
          <h1
            data-aos="fade-right"
            data-aos-delay="400"
            className="text-5xl md:text-6xl font-extrabold leading-tight"
          >
            {t("greeting")}
            <span className="inline-block animate-wave origin-bottom-right">
              👋
            </span>
          </h1>

          <p
            data-aos="fade-right"
            data-aos-delay="600"
            className="mt-4 text-lg md:text-xl opacity-90"
          >
            {t("bio")}
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
            <Link
              to="/contact"
              className="flex items-center gap-2 rounded-lg font-medium hover:scale-105 hover:-rotate-1"
            >
              {t("contact")}
              <ArrowRight size={18} className="animate-bounce-subtle" />
            </Link>
          </div>
        </div>

        {/* Profile Image */}
        <div className="relative">
          <div className="flex flex-col gap-4 justify-center items-center text-center rounded-3xl bg-white dark:bg-slate-800 p-8 shadow-xl">
            <img
              src="https://media.licdn.com/dms/image/v2/D4E03AQHrHZ-MYC3nSw/profile-displayphoto-shrink_800_800/B4EZSs3cC9HMAc-/0/1738067004243?e=1753315200&v=beta&t=s6RzTb3AO0ywo2I-ecAE4moQQWoE4BQ4Kbvs1bcWtE0"
              alt="Ahmed"
              width="256px"
              height="256px"
              className="w-40 h-w-40 object-cover block rounded-full border-2 border-blue-500"
            />
            <div>
              <h2 className="text-3xl">Ahmed Elbilal</h2>
              <p>Full Stack Developer</p>
            </div>

            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => {
                const Icon = getIcon(social.icon);
                return (
                  <a
                    key={social.name}
                    href={social.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    aria-label={social.name || ""}
                  >
                    <Icon />
                    <span>{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC<Queries.SkillsPageQuery> = ({ location, data }) => {
  const localeNode = data.locales.edges.find(
    (e) => e.node.ns === "translation"
  )?.node;

  if (!localeNode?.data || !localeNode?.language) {
    return <SEO location={location} />;
  }

  // Access to translation
  const t = JSON.parse(localeNode.data);

  const title = `${t["ahmed"]} | ${t["full_Stack_developer"]}`;

  const description = t["portfolio_description"];

  const keywords = t["portfolio_keywords"];

  return (
    <SEO
      location={location}
      title={title}
      description={description}
      keywords={keywords}
      lang={localeNode.language}
    />
  );
};

export const query = graphql`
  query IndexPage($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }

    allSocialLinksYaml {
      nodes {
        name
        link
        icon
      }
    }
  }
`;
