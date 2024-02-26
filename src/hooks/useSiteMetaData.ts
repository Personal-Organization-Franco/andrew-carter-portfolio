import { graphql, useStaticQuery } from "gatsby";

export const useSiteMetadata = () => {
  const data = useStaticQuery<Queries.SiteMetadataQueryQuery>(graphql`
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
    title: data.site?.siteMetadata?.title ?? "",
    description: data.site?.siteMetadata?.description ?? "",
  };
};
