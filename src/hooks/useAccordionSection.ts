import { graphql, useStaticQuery } from "gatsby";

export const useAccordionSection = () => {
  const data = useStaticQuery<Queries.AccordionSectionQuery>(graphql`
    query AccordionSection {
      contentfulAccordionSection {
        projectsIndexText
        projectsPasswordText
        expandAllText
        collapseAllText
        accordions {
          year
          company
          project
          projectIsProtected
          projectInformation {
            raw
          }
          role
          type
          layout {
            type
            layout {
              ... on ContentfulImageCarousel7030 {
                carouselImages {
                  gatsbyImageData(
                    layout: CONSTRAINED
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                  url
                }
                singleImage {
                  gatsbyImageData(
                    layout: CONSTRAINED
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
              }
              ... on ContentfulVideoCarousel2080 {
                video {
                  url
                }
                carouselImages {
                  url
                }
              }
              ... on ContentfulOneImageOneVideo5050 {
                name
                imagePositionedOnTheLeft
                imageAndVideo {
                  file {
                    contentType
                    url
                  }
                  gatsbyImageData(
                    layout: CONSTRAINED
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
              }
            }
          }
        }
      }
    }
  `);

  return data.contentfulAccordionSection;
};
