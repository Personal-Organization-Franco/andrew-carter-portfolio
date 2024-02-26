import { Fragment, useCallback } from "react";

import { useAppContext } from "context";
import { useAccordionSection } from "hooks/useAccordionSection";
import { AccordionContent } from "./AccordionContent";
import PadlockGray from "assets/padlockgray.svg";

function Accordion() {
  const {
    expandAll,
    toggleExpandAll,
    activeIndex,
    passwordIsSet,
    setActiveIndex,
  } = useAppContext();
  const accordionSectionData = useAccordionSection();

  const isActiveIndex = useCallback(
    (index: number) => {
      return index === activeIndex;
    },
    [activeIndex],
  );

  const handleAccordionHeaderClick =
    (index: number, projectIsProtected: boolean) => () => {
      if (projectIsProtected) return;
      if (expandAll) {
        toggleExpandAll();
        setActiveIndex(null);
        setActiveIndex(index);
        return;
      }
      if (isActiveIndex(index)) {
        setActiveIndex(null);
        return;
      }

      setActiveIndex(index);
    };
  const accordions = accordionSectionData?.accordions || [];
  return (
    <>
      <div className="grid grid-cols-[2fr_3fr_6fr_5fr]">
        {/* Grid header */}
        <div>
          <p className="font-normal text-grey-2 text-lg">Year</p>
        </div>
        <div>
          <p className="font-normal text-grey-2 text-lg">Company</p>
        </div>
        <div>
          <p className="font-normal text-grey-2 text-lg">Type</p>
        </div>
        <div>
          <p className="font-normal text-grey-2 text-lg">Project</p>
        </div>
      </div>
      {accordions.map((accordion, index) => {
        const shouldDisplayContent = isActiveIndex(index) || expandAll;
        const borderClass = !shouldDisplayContent
          ? "border-b border-grey-1"
          : "";
        const accordionHeaderTextColour =
          shouldDisplayContent || activeIndex === null
            ? "text-black"
            : "text-grey-2";

        const project = accordion?.project;
        const year = accordion?.year;
        const company = accordion?.company;
        const type = accordion?.type;
        const projectIsProtected =
          (accordion?.projectIsProtected ?? false) && !passwordIsSet;

        const cursorClass = projectIsProtected
          ? "cursor-not-allowed"
          : "cursor-pointer";

        return (
          <Fragment
            key={`${project}${year}${type}${company}${
              Date.now().toString(36) +
              Math.floor(
                Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12),
              ).toString(36)
            }`}
          >
            <div
              onClick={
                !projectIsProtected
                  ? handleAccordionHeaderClick(index, projectIsProtected)
                  : undefined
              }
              className={`grid grid-cols-[2fr_3fr_6fr_5fr] ${cursorClass} ${borderClass} pt-1.5 pb-2`}
              title={
                projectIsProtected
                  ? "Enter password to see the project"
                  : undefined
              }
            >
              <div>
                <p
                  className={`font-normal text-lg ${accordionHeaderTextColour}`}
                >
                  {year}
                </p>
              </div>
              <div>
                <p
                  className={`font-normal text-lg ${accordionHeaderTextColour}`}
                >
                  {company}
                </p>
              </div>
              <div>
                <p
                  className={`font-normal text-lg ${accordionHeaderTextColour}`}
                >
                  {type}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p
                  className={`font-normal text-lg ${accordionHeaderTextColour}`}
                >
                  {project}
                </p>
                {projectIsProtected && (
                  <PadlockGray className="ml-auto fill-grey-2" />
                )}
              </div>
            </div>
            {shouldDisplayContent && <AccordionContent index={index} />}
          </Fragment>
        );
      })}
    </>
  );
}

export default Accordion;
