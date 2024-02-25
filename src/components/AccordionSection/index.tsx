import { useAppContext } from "context";
import { useAccordionSection } from "hooks/useAccordionSection";
import { useEffect, useState } from "react";

function AccordionSection() {
  const accordionSectionData = useAccordionSection();
  const { expandAll, toggleExpandAll, passwordIsSet } = useAppContext();

  console.log("passwordIsSet", passwordIsSet);

  const {
    projectsIndexText = "",
    projectsPasswordText = "",
    expandAllText = "",
    collapseAllText = "",
  } = accordionSectionData || {};

  return (
    <div className="-mt-16">
      <p className="font-normal text-grey-2 text-lg mb-2">
        {projectsIndexText}
      </p>
      {!passwordIsSet && (
        <p className="font-normal text-black text-lg">{projectsPasswordText}</p>
      )}
      {passwordIsSet ? (
        <button
          type="button"
          className="font-normal text-black text-lg"
          onClick={toggleExpandAll}
        >
          {expandAll ? collapseAllText : expandAllText}
        </button>
      ) : null}
    </div>
  );
}

export default AccordionSection;
