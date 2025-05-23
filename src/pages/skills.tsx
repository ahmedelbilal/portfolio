import { graphql, HeadProps, type HeadFC, type PageProps } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import * as React from "react";
import Layout from "../components/layout";
import getIcon from "../utils/get-icon";
import { SEO } from "../components/seo";

// Define the skill interface
interface Skill {
  name: string;
  logo: string;
}

// Define the category interface
interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
  color: string;
}

const SkillsPage: React.FC<PageProps<Queries.SkillsPageQuery>> = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );
  const { t } = useTranslation();

  const skillCategories = data.allSkillsYaml.nodes as SkillCategory[];

  // Select the first category by default
  React.useEffect(() => {
    if (skillCategories.length > 0) {
      setSelectedCategory(skillCategories[0].name);
    }
  }, []);

  const currentCategory = React.useMemo(
    () => skillCategories.find((cat) => cat.name === selectedCategory),
    [selectedCategory]
  );

  // Render skill card
  const renderSkillCard = (skill: Skill, index: number) => {
    return (
      <div
        key={skill.name}
        data-aos="fade-up"
        data-aos-delay={index * 100}
        className="group rounded-xl shadow-lg hover:shadow-xl backdrop-blur-sm p-4 flex flex-col items-center transition-all duration-500 hover:scale-105 hover:-translate-y-1 dark:bg-gray-800/50"
      >
        <div className="w-16 h-16 mb-3 flex items-center justify-center">
          <img
            src={skill.logo}
            alt={skill.name}
            className="max-w-full max-h-full transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <h3 className="font-medium text-lg">{skill.name}</h3>
      </div>
    );
  };

  return (
    <Layout>
      {/* Page Header */}
      <header className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1
          data-aos="fade-up"
          data-aos-delay="300"
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          {t("skills_title")}
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay="400"
          className="max-w-2xl mx-auto text-lg opacity-90"
        >
          {t("skills_description")}
        </p>
      </header>

      {/* Skill Categories */}
      <section className="max-w-6xl mx-auto px-6 mb-12">
        <div
          data-aos="fade-up"
          data-aos-delay="500"
          className="flex flex-wrap gap-4 justify-center"
        >
          {skillCategories.map((category) => {
            const CategoryIcon = getIcon(category.icon);

            return (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.name
                    ? `bg-gradient-to-r ${category.color} text-white`
                    : "dark:bg-gray-800 dark:hover:bg-gray-700 bg-white/10 hover:bg-white/20"
                }`}
              >
                <CategoryIcon />
                {t(category.name)}
              </button>
            );
          })}
        </div>
      </section>

      {/* Skills Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        {currentCategory && (
          <div>
            <h2
              data-aos="fade-right"
              data-aos-delay="600"
              className="text-2xl font-bold mb-8 flex items-center gap-3"
            >
              {currentCategory.icon &&
                (() => {
                  const Icon = getIcon(currentCategory.icon);
                  return <Icon size={24} />;
                })()}
              {t(currentCategory.name)} {t("technologies")}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {currentCategory.skills.map(renderSkillCard)}
            </div>
          </div>
        )}
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

  // Access to translation
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
