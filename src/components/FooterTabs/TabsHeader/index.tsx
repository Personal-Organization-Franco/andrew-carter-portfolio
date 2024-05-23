import { useAppContext } from "context";
import { useFooterTabs } from "hooks/useFooterTabs";
import { useCallback } from "react";
import { randomId } from "utils/randomId";

export function TabsHeader() {
  const data = useFooterTabs();
  const { footerTabsActiveIndex, setFooterTabsActiveIndex } = useAppContext();

  const isEmailTab = (index: number) => {
    return data?.tabs?.[index]?.tabContent?.contentType === "EMAIL_CONTENT";
  };

  const handleFooterTabsHeaderClick = (index: number) => () => {
    setFooterTabsActiveIndex(index);
  };

  const isActiveIndex = useCallback(
    (index: number) => {
      return index === footerTabsActiveIndex;
    },
    [footerTabsActiveIndex],
  );
  return (
    <div className="flex">
      {data?.tabs?.map((tab, index) => {
        const textColorClass = `${
          isActiveIndex(index) ? "text-black" : "text-grey-3"
        }`;
        const tabIsEmail = isEmailTab(index);
        return !tabIsEmail ? (
          <div
            className={`text-lg pl-1 ${textColorClass} cursor-pointer`}
            onClick={handleFooterTabsHeaderClick(index)}
            key={tab?.tabHeader?.name + randomId()}
          >
            {tab?.tabHeader?.content}
            {index !== (data?.tabs?.length ?? 1) - 1 && ","}
          </div>
        ) : (
          <a
            href={`mailto:${tab?.tabContent?.email}`}
            className={`text-lg pl-1 ${textColorClass} cursor-pointer`}
            onClick={handleFooterTabsHeaderClick(index)}
            key={tab?.tabHeader?.name + randomId()}
          >
            {tab?.tabHeader?.content}
          </a>
        );
      })}
    </div>
  );
}
