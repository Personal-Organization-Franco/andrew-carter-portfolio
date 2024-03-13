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
          projectInformationTitle
          projectInformation {
            raw
          }
          role
          type
          layout {
            type
            layout {
              ... on ContentfulVideoCarousel2080 {
                video {
                  url
                }
                carouselImages {
                  url
                }
              }
              ... on ContentfulOneImageOneVideo5050 {
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
                  height
                  size
                }
              }
              ... on ContentfulVariableWidthCarouselImages {
                variableWidthImages {
                  gatsbyImageData(
                    layout: CONSTRAINED
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                  url
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
