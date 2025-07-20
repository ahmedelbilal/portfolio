import { graphql, HeadProps, type HeadFC, type PageProps } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { CheckCircle, Clock, Send, X } from "lucide-react";
import * as React from "react";
import Layout from "../components/layout";
import getIcon from "../utils/get-icon";
import { SEO } from "../components/seo";

const ContactPage: React.FC<PageProps<Queries.ContactPageQuery>> = ({
  data,
}) => {
  const { t } = useTranslation("contact");
  const socialLinks = data.allSocialLinksYaml.nodes;

  const [formStatus, setFormStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mdkgjrbj", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setFormStatus("success");
        form.reset();
      } else {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error) {
      setFormStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Form submission failed"
      );
    }
  };

  // Reset status message
  React.useEffect(() => {
    if (formStatus === "success" || formStatus === "error") {
      const timer = setTimeout(() => {
        setFormStatus("idle");
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  const renderStatusMessage = () => {
    if (formStatus === "idle") return null;

    const statusConfig = {
      loading: {
        icon: <Clock className="text-blue-500 animate-pulse" size={24} />,
        title: "Sending Message...",
        message: "Please wait while we process your message.",
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
        borderColor: "border-blue-300 dark:border-blue-700",
      },
      success: {
        icon: <CheckCircle className="text-green-500" size={24} />,
        title: "Message Sent!",
        message: "Thank you for your message. I'll get back to you shortly.",
        bgColor: "bg-green-100 dark:bg-green-900/30",
        borderColor: "border-green-300 dark:border-green-700",
      },
      error: {
        icon: <X className="text-red-500" size={24} />,
        title: "Error",
        message: errorMessage || "Something went wrong. Please try again.",
        bgColor: "bg-red-100 dark:bg-red-900/30",
        borderColor: "border-red-300 dark:border-red-700",
      },
    };

    const config = statusConfig[formStatus];

    return (
      <div
        className={`rounded-lg p-4 mb-6 border dark:border-none ${config.bgColor} ${config.borderColor} flex items-start gap-3 animate-fade-in`}
      >
        {config.icon}
        <div>
          <h4 className="font-medium">{config.title}</h4>
          <p className="text-sm opacity-80">{config.message}</p>
        </div>
        {formStatus !== "loading" && (
          <button
            onClick={() => setFormStatus("idle")}
            className="ml-auto p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>
    );
  };

  return (
    <Layout>
      {/* Section */}
      <section className="max-w-6xl mx-auto px-6 pb-20 mt-10">
        <div className="grid md:grid-cols-5 gap-10">
          {/* Contact Form */}
          <div className="md:col-span-3">
            <div className="bg-white backdrop-blur-sm dark:bg-slate-800 rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Send size={20} className="text-blue-500" />
                {t("send_me_message")}
              </h2>

              {renderStatusMessage()}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      {t("your_name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border dark:border-none border-transparent focus:border-blue-500 focus:outline-none"
                      disabled={formStatus === "loading"}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      {t("your_email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border dark:border-none border-transparent focus:border-blue-500 focus:outline-none"
                      disabled={formStatus === "loading"}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("subject")}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border dark:border-none border-transparent focus:border-blue-500 focus:outline-none"
                    disabled={formStatus === "loading"}
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border dark:border-none border-transparent focus:border-blue-500 focus:outline-none resize-none"
                    disabled={formStatus === "loading"}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2 hover:scale-102 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formStatus === "loading" ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      {t("send_message")}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-2">
            <div className="bg-white backdrop-blur-sm dark:bg-slate-800 rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6">
                {t("connect_with_me")}
              </h2>

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

            <div className="mt-8 p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30 border dark:border-none border-blue-300 dark:border-blue-700">
              <h3 className="font-medium flex items-center gap-2">
                <Clock size={18} className="text-blue-600" />
                {t("current_availability")}
              </h3>
              <p className="mt-2 text-sm">{t("availability_text")}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;

export const Head: HeadFC<Queries.ContactPageQuery> = ({ location, data }) => {
  const localeNode = data.locales.edges.find(
    (e) => e.node.ns === "translation"
  )?.node;

  if (!localeNode?.data || !localeNode?.language) {
    return <SEO location={location} />;
  }

  // Access to translation
  const t = JSON.parse(localeNode.data);

  const title = `${t["ahmed"]} | ${t["contact"]}`;

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
  query ContactPage($language: String!) {
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
