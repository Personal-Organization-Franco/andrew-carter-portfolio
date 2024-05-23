import { graphql, useStaticQuery } from "gatsby";

export const useFooterTabs = () => {
  const data = useStaticQuery<Queries.FooterTabsQuery>(graphql`
    query FooterTabs {
      contentfulFooterTabs {
        tabs {
          tabHeader {
            content
            name
          }
          tabContent {
            contentType
            simpleContent {
              raw
            }
            email
            contentRows {
              title
              years
              description {
                name
                descriptionTitle {
                  title
                }
                descriptionContent {
                  descriptionContent
                }
              }
            }
          }
        }
      }
    }
  `);

  return data.contentfulFooterTabs;
};
