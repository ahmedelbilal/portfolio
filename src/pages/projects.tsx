import { graphql, HeadProps, Link, type HeadFC, type PageProps } from "gatsby";
import { ArrowUpRight, Code, ExternalLink, Github, Globe } from "lucide-react";
import * as React from "react";
import Layout from "../components/layout";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { SEO } from "../components/seo";

// Define the project interface
interface Project {
  projectId: string;
  tags: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
}

const ProjectsPage: React.FC<PageProps<Queries.ProjectsPageQuery>> = ({
  data,
}) => {
  const [filter, setFilter] = React.useState<string | null>(null);
  const { t } = useTranslation();
  const projects = data.allProjectsYaml.nodes as Project[];

  const filterTags = React.useMemo(
    () =>
      Array.from(new Set(projects.flatMap((project) => project.tags))).sort(),
    [projects]
  );

  const filteredProjects = React.useMemo(
    () =>
      filter
        ? projects.filter((project) => project.tags.includes(filter))
        : projects,
    [filter]
  );

  const renderProjectCard = (project: Project, index: number) => (
    <div
      key={project.projectId}
      data-aos="fade-up"
      data-aos-delay={index * 100 + 300}
      className="bg-white dark:bg-slate-800 relative overflow-hidden rounded-3xl transition-all duration-700 shadow-xl"
    >
      <div className="relative overflow-hidden h-60">
        <img
          src={project.image}
          alt={t(`${project.projectId}.title`)}
          className="w-full h-full object-cover transition-transform duration-500 border-b dark:border-none"
        />

        <div className="absolute top-4 right-4 flex gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-black backdrop-blur-sm transition-all duration-300 transform hover:scale-110"
            >
              <Github size={18} className="text-white" />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-black backdrop-blur-sm transition-all duration-300 transform hover:scale-110"
            >
              <ExternalLink size={18} className="text-white" />
            </a>
          )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
          {t(`${project.projectId}.title`)}
          <ArrowUpRight
            size={16}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {t(`${project.projectId}.description`)}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              onClick={() => setFilter(tag === filter ? null : tag)}
              className={`px-3 py-1 text-xs font-medium rounded-full cursor-pointer transition-all duration-300 hover:scale-105 ${
                tag === filter
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <header className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          {t("projects_title")}
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay="300"
          className="max-w-2xl mx-auto text-lg opacity-90"
        >
          {t("projects_description")}
        </p>
      </header>

      <section className="max-w-6xl mx-auto px-6 mb-12">
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="flex flex-wrap gap-3 justify-center"
        >
          <button
            onClick={() => setFilter(null)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 text-sm font-medium ${
              filter === null
                ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white"
                : "dark:bg-gray-800 dark:hover:bg-gray-700 bg-white/10 hover:bg-white/20"
            }`}
          >
            All Projects
          </button>

          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag === filter ? null : tag)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 text-sm font-medium ${
                tag === filter
                  ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white"
                  : "dark:bg-gray-800 dark:hover:bg-gray-700 bg-white/10 hover:bg-white/20"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) =>
            renderProjectCard(project, index)
          )}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12" data-aos="fade-up">
            <div className="inline-flex justify-center items-center w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <Code size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              No projects match your selected filter. Try another filter or view
              all projects.
            </p>
            <button
              onClick={() => setFilter(null)}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              View All Projects
            </button>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default ProjectsPage;

export const Head: HeadFC<Queries.ProjectsPageQuery> = ({ location, data }) => {
  const localeNode = data.locales.edges.find(
    (e) => e.node.ns === "translation"
  )?.node;

  if (!localeNode?.data || !localeNode?.language) {
    return <SEO location={location} />;
  }

  // Access to translation
  const t = JSON.parse(localeNode.data);

  const title = `${t["ahmed"]} | ${t["projects"]}`;

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
  query ProjectsPage($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }

    allProjectsYaml {
      nodes {
        projectId
        tags
        image
        demoUrl
        githubUrl
      }
    }
  }
`;
