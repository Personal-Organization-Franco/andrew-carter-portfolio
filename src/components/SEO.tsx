import { useSiteMetadata } from "hooks/useSiteMetaData";

type SEOProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

const SEO = ({ title, description, children }: SEOProps) => {
  const { title: defaultTitle, description: defaultDescription = "" } =
    useSiteMetadata();

  const seo = {
    title: title ? `${defaultTitle} - ${title}` : defaultTitle,
    description: description || defaultDescription,
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
      />
      {children}
    </>
  );
};

export default SEO;
