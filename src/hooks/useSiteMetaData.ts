import { graphql, useStaticQuery } from "gatsby";

export const useSiteMetadata = () => {
  const data = useStaticQuery<Queries.SiteSiteMetadata>(graphql`
    query SiteMetadataQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  return {
    title: data.description ?? "",
    description: data.description ?? "",
  };
};
