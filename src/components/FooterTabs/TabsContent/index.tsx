import { Fragment } from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";

import { useAppContext } from "context";
import { useFooterTabs } from "hooks/useFooterTabs";
import { randomId } from "utils/randomId";

export function TabsContent() {
  const { footerTabsActiveIndex } = useAppContext();
  const data = useFooterTabs();

  const currentTabContent = data?.tabs?.[footerTabsActiveIndex]?.tabContent;
  currentTabContent?.contentType;
  console.log("currentTabContent", currentTabContent);
  function renderContent() {
    if (!currentTabContent) return null;
    switch (currentTabContent.contentType) {
      case "SIMPLE_CONTENT":
        return (
          <div className="pl-1.5 text-lg">
            {renderRichText(currentTabContent.simpleContent ?? { raw: "" })}
          </div>
        );
      case "EMAIL_CONTENT":
        return null;

      case "CONTENT_ROW":
        return currentTabContent.contentRows?.map(row => {
          const description = row?.description;
          const descriptionContentPadding =
            description?.descriptionTitle?.length &&
            description?.descriptionContent?.descriptionContent?.length
              ? "pt-7"
              : "";
          return (
            <div
              className="grid grid-cols-[5fr_6fr_5fr] text-lg pl-1"
              key={`${row?.title}${randomId()}`}
            >
              <div className="text-black">{row?.title}</div>
              <div className="pb-10">
                {description?.descriptionTitle?.map(title => {
                  return (
                    <div
                      className="text-black"
                      key={`${title?.title}${randomId()}`}
                    >
                      {title?.title}
                    </div>
                  );
                })}
                <div className={`text-grey-2 ${descriptionContentPadding}`}>
                  {description?.descriptionContent?.descriptionContent}
                </div>
              </div>
              <div className="text-black">{row?.years}</div>
            </div>
          );
        });

      default:
        return (
          <div className="pl-1.5 text-lg">
            Unsupported content type {currentTabContent?.contentType}
          </div>
        );
    }
  }
  return <Fragment>{renderContent()}</Fragment>;
}
