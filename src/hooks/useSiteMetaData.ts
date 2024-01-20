import { graphql, useStaticQuery } from "gatsby";

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query SiteMetadataQuery {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `);

  return {
    title: data.site?.siteMetadata?.title ?? "Andrew Carter",
    description: data.site?.siteMetadata?.description ?? "",
    siteUrl: data.site?.siteMetadata?.siteUrl ?? "",
  };
};
