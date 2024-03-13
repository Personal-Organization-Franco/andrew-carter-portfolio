import { renderRichText } from "gatsby-source-contentful/rich-text";
import { MARKS } from "@contentful/rich-text-types";
import { ReactNode } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { useHeroSection } from "hooks/useHeroSection";
import WatchNeedles from "assets/watch-needles.svg";
import WatchOverlay from "assets/watch-overlay.svg";

const options = {
  renderMark: {
    [MARKS.BOLD]: (text: ReactNode) => (
      <strong className="text-black font-normal">{text}</strong>
    ),
  },
};

function HeroSection() {
  const data = useHeroSection();

  const watchBackround = getImage(data?.heroSection?.watchBackground ?? null);
  return (
    <>
      <div className="max-w-4xl">
        {data?.heroSection?.heroText ? (
          <h1 className="text-grey-2 text-lg">
            {renderRichText(data.heroSection?.heroText, options)}
          </h1>
        ) : null}
      </div>
      <div className="watch-wrapper flex justify-end">
        <div className="watch-container w-48 h-48 mr-20 relative">
          <WatchOverlay
            alt="watch overlay"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-10"
          />
          <WatchNeedles className="watch-needles absolute m-auto top-6 left-6 right-0 z-20" />
          <div className="watch-background-wrapper absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 z-5">
            {watchBackround ? (
              <GatsbyImage
                image={watchBackround}
                alt="watch background"
                className="watch-background"
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
