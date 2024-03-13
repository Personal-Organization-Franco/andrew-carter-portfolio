import Accordion from "components/Accordion";
import { useAppContext } from "context";
import { useAccordionSection } from "hooks/useAccordionSection";

function AccordionSection() {
  const accordionSectionData = useAccordionSection();
  const { expandAll, setActiveIndex, toggleExpandAll, passwordIsSet } =
    useAppContext();

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
        <p className="font-normal text-black text-lg mb-16">
          {projectsPasswordText}
        </p>
      )}
      {passwordIsSet ? (
        <button
          type="button"
          className="font-normal text-black text-lg mb-16"
          onClick={() => {
            toggleExpandAll();
            setActiveIndex(null);
          }}
        >
          {expandAll ? collapseAllText : expandAllText}
        </button>
      ) : null}
      <Accordion />
    </div>
  );
}

export default AccordionSection;
