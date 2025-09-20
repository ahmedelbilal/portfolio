import { graphql, type HeadFC, type PageProps } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { ExternalLink, Folder, Github } from "lucide-react";
import * as React from "react";
import Layout from "../components/layout";
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
  const { t } = useTranslation();
  const projects = data.allProjectsYaml.nodes as Project[];

  const renderProjectCard = (project: Project, index: number) => (
    <div
      key={project.projectId}
      className="bg-white dark:bg-slate-800 relative overflow-hidden rounded-3xl shadow-xl"
    >
      <div className="relative overflow-hidden h-60">
        <img
          src={project.image}
          alt={t(`${project.projectId}.title`)}
          className="w-full h-full object-cover border-b dark:border-none"
        />

        <div className="absolute top-4 right-4 flex gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full cursor-target bg-black backdrop-blur-sm transform hover:scale-110"
            >
              <Github size={18} className="text-white" />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full cursor-target bg-black backdrop-blur-sm transform hover:scale-110"
            >
              <ExternalLink size={18} className="text-white" />
            </a>
          )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2 group-hover:text-blue-500 dark:group-hover:text-blue-400">
          {t(`${project.projectId}.title`)}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {t(`${project.projectId}.description`)}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
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
      <section className="max-w-6xl mx-auto px-6 pb-20 mt-10">
        <h2 className="text-2xl font-bold mb-10 flex items-center gap-3">
          <Folder className="text-blue-500" size={24} /> {t("showcase")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => renderProjectCard(project, index))}
        </div>
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
