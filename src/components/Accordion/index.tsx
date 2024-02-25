import { useAppContext } from "context";
import { useCallback } from "react";

function Accordion() {
  const { expandAll, toggleExpandAll, activeIndex, setActiveIndex } =
    useAppContext();
  const ACCORDION_ENTRIES = [1, 2, 3, 4, 5];

  const isActiveIndex = useCallback(
    (index: number) => {
      return index === activeIndex;
    },
    [activeIndex],
  );

  const handleAccordionHeaderClick = (index: number) => () => {
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

  return (
    <>
      <div className="grid grid-cols-[2fr 3fr 6fr 5fr] grid-flow-col">
        {/* Grid header */}
        <div className="col-span-2">
          <p className="font-normal text-grey-2 text-lg">Year</p>
        </div>
        <div className="col-span-3">
          <p className="font-normal text-grey-2 text-lg">Company</p>
        </div>
        <div className="col-span-6">
          <p className="font-normal text-grey-2 text-lg">Type</p>
        </div>
        <div className="col-span-5">
          <p className="font-normal text-grey-2 text-lg">Project</p>
        </div>
      </div>
      {ACCORDION_ENTRIES.map((entry, index) => {
        const shouldDisplayContent = isActiveIndex(index) || expandAll;
        const borderClass = !shouldDisplayContent
          ? "border-b border-grey-1"
          : "";
        const accordionHeaderTextColour =
          shouldDisplayContent || activeIndex === null
            ? "text-black"
            : "text-grey-2";

        return (
          <>
            <div
              key={entry.toString(16)}
              onClick={handleAccordionHeaderClick(index)}
              className={`grid grid-cols-[2fr 3fr 6fr 5fr] grid-flow-col cursor-pointer ${borderClass}`}
            >
              <div className="col-span-2">
                <p
                  className={`font-normal text-lg ${accordionHeaderTextColour}`}
                >
                  Year
                </p>
              </div>
              <div className="col-span-3">
                <p
                  className={`font-normal text-lg ${accordionHeaderTextColour}`}
                >
                  Company
                </p>
              </div>
              <div className="col-span-6">
                <p
                  className={`font-normal text-lg ${accordionHeaderTextColour}`}
                >
                  Type
                </p>
              </div>
              <div className="col-span-5">
                <p
                  className={`font-normal text-lg ${accordionHeaderTextColour}`}
                >
                  Project
                </p>
              </div>
            </div>
            {shouldDisplayContent && (
              <div className="">CONTENT OF THE SELECTED ACCORDION</div>
            )}
          </>
        );
      })}
    </>
  );
}

export default Accordion;
