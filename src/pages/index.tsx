import { graphql, HeadProps, type HeadFC, type PageProps } from "gatsby";
import { Link, useTranslation } from "gatsby-plugin-react-i18next";
import { Code, Github, Globe, Languages, Linkedin, Mail } from "lucide-react";
import * as React from "react";
import Layout from "../components/layout";
import { SEO } from "../components/seo";
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
          <div
            data-aos="fade-right"
            data-aos-delay="200"
            className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 bg-gray-200 dark:bg-white/20"
          >
            {t("full_Stack_developer")}
          </div>

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

          <div
            data-aos="fade-up"
            data-aos-delay="800"
            className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start"
          >
            <Link
              to="/contact"
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:-rotate-1
                bg-blue-600 text-white hover:bg-blue-700"
            >
              <Mail size={18} className="animate-bounce-subtle" />
              {t("contact")}
            </Link>

            <a
              href={`/resume/ahmed-resume-${i18n.language}.pdf`}
              download
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:rotate-1
                bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              <Globe size={18} className="animate-spin-slow" />
              {t("resume")}
            </a>
          </div>

          {/* Social Icons */}
          <div
            data-aos="fade-up"
            data-aos-delay="1000"
            className="mt-8 flex gap-4 justify-center md:justify-start"
          >
            {socialLinks.map((socialLink) => {
              const Icon = Icons[socialLink.icon || "Globe"];
              return (
                <a
                  key={socialLink.name}
                  href={socialLink.link || "#"}
                  target="_blank"
                  className="p-2 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1
                    bg-gray-200 text-gray-900 hover:bg-gray-300
                    dark:bg-white/20 dark:text-white dark:hover:bg-white/30"
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Profile Image */}
        <div data-aos="fade-left" data-aos-delay="600" className="relative">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10 transition-transform duration-500 hover:scale-105 transform hover:rotate-3">
            <img
              src="https://media.licdn.com/dms/image/v2/D4E03AQHrHZ-MYC3nSw/profile-displayphoto-shrink_800_800/B4EZSs3cC9HMAc-/0/1738067004243?e=1753315200&v=beta&t=s6RzTb3AO0ywo2I-ecAE4moQQWoE4BQ4Kbvs1bcWtE0"
              alt="Ahmed"
              width="256px"
              height="256px"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-lg bg-yellow-400 shadow-lg flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-12">
            <Code size={30} color="#1f2937" />
          </div>
          <div className="absolute -top-8 -left-8 w-16 h-16 rounded-lg bg-blue-500/80 backdrop-blur-sm shadow-lg rotate-12 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-0 animate-float">
            <Globe size={24} />
          </div>
          <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 w-14 h-14 rounded-lg bg-purple-500/80 backdrop-blur-sm shadow-lg -rotate-12 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-0 animate-float-delayed">
            <Languages size={20} />
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
