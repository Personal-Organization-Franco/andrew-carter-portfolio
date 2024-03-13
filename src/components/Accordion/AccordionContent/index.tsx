import Slider from "react-slick";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";

import { useAppContext } from "context";
import { useAccordionSection } from "hooks/useAccordionSection";
import { randomId } from "utils/randomId";

export function AccordionContent({ index }: { index: number }) {
  const { activeIndex } = useAppContext();
  const accordionSectionData = useAccordionSection();
  const accordionDatum =
    accordionSectionData?.accordions?.[activeIndex || index];
  const projectInformationTitle = accordionDatum?.projectInformationTitle ?? "";
  const role = accordionDatum?.role ?? "";

  const LAYOUT = accordionDatum?.layout?.layout;

  const renderAccordionContent = () => {
    const layout5050 = LAYOUT && "imageAndVideo" in LAYOUT;
    const layoutVariableWidth = LAYOUT && "variableWidthImages" in LAYOUT;
    const layout2080 = LAYOUT && "video" in LAYOUT;
    const layoutFullWidth = LAYOUT && "imageOrVideo" in LAYOUT;
    if (layout5050) {
      const imageAndVideo = LAYOUT?.imageAndVideo ?? [];
      return (
        <div className="grid grid-cols-2 gap-1">
          {imageAndVideo.map(item => {
            const isVideo = item?.file?.contentType?.includes("video");
            const image = getImage(item?.gatsbyImageData ?? null);
            return (
              <div key={`${item?.file?.url}${randomId()}`}>
                {isVideo ? (
                  <video
                    src={item?.file?.url ?? ""}
                    controls
                    disablePictureInPicture
                    autoPlay
                    loop
                    disableRemotePlayback
                    controlsList="nodownload noplaybackrate"
                    className="w-full rounded-lg"
                  />
                ) : (
                  image && (
                    <GatsbyImage
                      image={image}
                      alt="image 50% width"
                      className="rounded-lg"
                    />
                  )
                )}
              </div>
            );
          })}
        </div>
      );
    }
    if (layoutVariableWidth) {
      const variableWidthImages = LAYOUT.variableWidthImages ?? [];
      return (
        <div className="grid grid-cols-1 max-h-[600px]">
          <Slider
            {...{
              className: "max-h-[600px] variable-width-slider",
              dots: true,
              infinite: true,
              centerMode: true,
              slidesToShow: 1,
              slidesToScroll: 1,
              variableWidth: true,
              customPaging: i => <div className="marker" />,
            }}
          >
            {variableWidthImages.map((item, index) => {
              return (
                item?.url && (
                  <img
                    key={`${item?.url}${randomId()}`}
                    src={item?.url}
                    alt={`carousel image ${index}`}
                    className="max-h-[600px]"
                  />
                )
              );
            })}
          </Slider>
        </div>
      );
    }
    if (layout2080) {
      const video = LAYOUT?.video?.url ?? "";
      const carouselImages = LAYOUT?.carouselImages ?? [];
      return (
        <div className="grid grid-cols-[2fr_3fr] gap-1 grid-flow-col">
          <video
            src={video}
            controls
            disablePictureInPicture
            autoPlay
            loop
            disableRemotePlayback
            controlsList="nodownload noplaybackrate"
            className="rounded-lg"
          />
          <Slider
            {...{
              className: "slider-2080 col-span-3",
              dots: true,
              infinite: true,
              slidesToShow: 1,
              slidesToScroll: 1,
              customPaging: i => <div className="marker" />,
            }}
          >
            {carouselImages.map((item, index) => {
              return (
                item?.url && (
                  <img
                    key={`${item?.url}${randomId()}`}
                    src={item?.url}
                    alt={`carousel image ${index}`}
                    className="rounded-lg"
                  />
                )
              );
            })}
          </Slider>
        </div>
      );
    }
    if (layoutFullWidth) {
      const imageOrVideo = LAYOUT?.imageOrVideo;
      const image = getImage(imageOrVideo?.gatsbyImageData ?? null);
      const isVideo = imageOrVideo?.file?.contentType?.includes("video");
      return (
        <div className="grid grid-cols-1">
          {isVideo ? (
            <video
              src={imageOrVideo?.file?.url ?? ""}
              controls
              disablePictureInPicture
              autoPlay
              loop
              disableRemotePlayback
              controlsList="nodownload noplaybackrate"
              className="w-full rounded-lg max-h-[950px]"
            />
          ) : (
            image && (
              <GatsbyImage
                image={image}
                alt="image 100% width"
                className="rounded-lg"
              />
            )
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {renderAccordionContent()}
      <div className="grid grid-cols-[1fr_2fr_1fr] grid-flow-col mt-6">
        <p className="font-normal text-black text-lg">
          {projectInformationTitle}
        </p>
        {accordionDatum && accordionDatum.projectInformation ? (
          <div className="font-normal text-black text-lg whitespace-pre-wrap max-w-[816px] mb-28">
            {renderRichText(accordionDatum.projectInformation)}
            <p className="text-xl">Role</p>
            <p className="text-grey-2">{role}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
