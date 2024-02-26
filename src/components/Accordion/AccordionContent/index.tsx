import { useAppContext } from "context";
import { useAccordionSection } from "hooks/useAccordionSection";

export function AccordionContent({ index }: { index: number }) {
  const { activeIndex } = useAppContext();
  const accordionSectionData = useAccordionSection();
  const accordionDatum =
    accordionSectionData?.accordions?.[activeIndex || index];

  const LAYOUT = accordionDatum?.layout?.layout;
  console.log(LAYOUT);

  const renderAccordionContent = () => {
    const layout5050 = LAYOUT && "imagePositionedOnTheLeft" in LAYOUT;
    if (layout5050) {
      const imagePositionedOnTheLeft = LAYOUT?.imagePositionedOnTheLeft;
      return (
        <div>
          <div>IMAGE POSITIONED ON THE LEFT?</div>
        </div>
      );
    }
    return <div></div>;
  };

  return (
    <div>
      CONTENT OF THE SELECTED ACCORDION{" "}
      {JSON.stringify(accordionDatum, null, 2)}
      {renderAccordionContent()}
    </div>
  );
}
