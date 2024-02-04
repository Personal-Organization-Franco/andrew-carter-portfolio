import { renderRichText } from "gatsby-source-contentful/rich-text";
import { MARKS } from "@contentful/rich-text-types";
import { ReactNode } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { useHeroSection } from "hooks/useHeroSection";
import WatchNeedles from "assets/watch-needles.svg";

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
  const watchOverlay = getImage(data?.heroSection?.watchOverlay ?? null);
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
          {watchOverlay && watchBackround ? (
            <>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <GatsbyImage
                  image={watchOverlay}
                  alt="watch overlay"
                  className="watch-overlay"
                />
              </div>
              <WatchNeedles className="watch-needles absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <GatsbyImage
                  image={watchBackround}
                  alt="watch background"
                  className="watch-background"
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default HeroSection;
