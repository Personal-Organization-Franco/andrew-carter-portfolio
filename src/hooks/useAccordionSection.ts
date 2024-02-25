import { graphql, useStaticQuery } from "gatsby";

export const useAccordionSection = () => {
  const data = useStaticQuery<Queries.AccordionSectionQuery>(graphql`
    query AccordionSection {
      contentfulAccordionSection {
        projectsIndexText
        projectsPasswordText
        expandAllText
        collapseAllText
      }
    }
  `);

  return data.contentfulAccordionSection;
};
