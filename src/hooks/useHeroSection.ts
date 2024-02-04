import { graphql, useStaticQuery } from "gatsby";

export const useHeroSection = () => {
  const data = useStaticQuery<Queries.HeroSectionQuery>(graphql`
    query HeroSection {
      contentfulHomePage {
        heroSection {
          heroText {
            raw
          }
          watchOverlay {
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
          watchBackground {
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  `);

  return data.contentfulHomePage;
};
