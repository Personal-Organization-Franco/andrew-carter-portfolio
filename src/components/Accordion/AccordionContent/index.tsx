import { useAppContext } from "context";
import { useAccordionSection } from "hooks/useAccordionSection";
import { randomId } from "utils/randomId";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Slider from "react-slick";

export function AccordionContent({ index }: { index: number }) {
  const { activeIndex } = useAppContext();
  const accordionSectionData = useAccordionSection();
  const accordionDatum =
    accordionSectionData?.accordions?.[activeIndex || index];

  const LAYOUT = accordionDatum?.layout?.layout;
  console.log(LAYOUT);

  const renderAccordionContent = () => {
    const layout5050 = LAYOUT && "imageAndVideo" in LAYOUT;
    const layout7030 = LAYOUT && "singleImage" in LAYOUT;
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
                  image && <GatsbyImage image={image} alt="image 50% width" />
                )}
              </div>
            );
          })}
        </div>
      );
    }
    if (layout7030) {
      const singleImage = LAYOUT.singleImage ?? null;
      const image = getImage(singleImage?.gatsbyImageData ?? null);
      const carouselImages = LAYOUT.carouselImages ?? [];
      return (
        <div className="grid grid-cols-[70%_30%] gap-1 auto-rows-fr">
          <div>
            {image && <GatsbyImage image={image} alt="image 70% width" />}
          </div>
          <div>
            <Slider
              {...{
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                adaptiveHeight: true,
                arrows: false,
              }}
            >
              {carouselImages.map((item, index) => {
                const image = item?.gatsbyImageData ?? null;
                return (
                  image && (
                    <GatsbyImage
                      key={`${image?.images?.fallback?.src}${index}`}
                      image={image}
                      alt="carousel image"
                    />
                  )
                );
              })}
            </Slider>
          </div>
        </div>
      );
    }
    return null;
  };

  return <div>{renderAccordionContent()}</div>;
}
