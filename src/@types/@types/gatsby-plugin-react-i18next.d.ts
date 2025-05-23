import type { GatsbyLinkProps } from "gatsby";
import type React from "react";

declare module "gatsby-plugin-react-i18next" {
  export interface LinkProps extends Omit<GatsbyLinkProps<undefined>, "ref"> {
    language?: string;
  }
  export const Link: React.FC<LinkProps>;
}
