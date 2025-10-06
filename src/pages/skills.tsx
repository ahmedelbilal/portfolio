seeimport { graphql, type HeadFC, type PageProps } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import * as React from "react";
import Layout from "../components/layout";
import { SEO } from "../components/seo";
import getIcon from "../utils/get-icon";

interface Skill {
  name: string;
  logo: string;
}

interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
  color: string;
}

const SkillsPage: React.FC<PageProps<Queries.SkillsPageQuery>> = ({ data }) => {
  const { t } = useTranslation();

  const skillCategories = data.allSkillsYaml.nodes as SkillCategory[];

  const renderSkillCard = (skill: Skill, index: number) => {
    return (
      <div
        key={skill.name}
        className="bg-white dark:bg-slate-800 group rounded-3xl backdrop-blur-sm p-4 flex flex-col items-center hover:-translate-y-1"
      >
        <div className="w-16 h-16 mb-3 flex items-center justify-center -mt-10">
          <img
            src={skill.logo}
            alt={skill.name}
            className="max-w-full max-h-full transition-transform group-hover:scale-110"
          />
        </div>

        <h3 className="font-medium">{skill.name}</h3>
      </div>
    );
  };

  return (
    <Layout>
      {/* Skills Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20 space-y-12 mt-10">
        {skillCategories.map((currentCategory) => (
          <div>
            <h2 className="text-2xl font-bold mb-10 flex items-center gap-3">
              {currentCategory.icon &&
                (() => {
                  const Icon = getIcon(currentCategory.icon);
                  return <Icon className="text-blue-500" size={24} />;
                })()}
              {t(currentCategory.name)} {t("technologies")}
            </h2>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-6 gap-y-10">
              {currentCategory.skills.map(renderSkillCard)}
            </div>
          </div>
        ))}
      </section>
    </Layout>
  );
};

export default SkillsPage;

export const Head: HeadFC<Queries.SkillsPageQuery> = ({ location, data }) => {
  const localeNode = data.locales.edges.find(
    (e) => e.node.ns === "translation"
  )?.node;

  if (!localeNode?.data || !localeNode?.language) {
    return <SEO location={location} />;
  }

  const t = JSON.parse(localeNode.data);

  const title = `${t["ahmed"]} | ${t["skills"]}`;

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
  query SkillsPage($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }

    allSkillsYaml {
      nodes {
        name
        icon
        color
        skills {
          name
          logo
        }
      }
    }
  }
`;
