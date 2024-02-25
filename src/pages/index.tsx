import type { HeadFC } from "gatsby";
import SEO from "components/SEO";
import MainLayout from "components/MainLayout";
import { AppContextProvider } from "context";
import HeroSection from "components/HeroSection";
import AccordionSection from "components/AccordionSection";

const IndexPage = () => {
  return (
    <AppContextProvider>
      <MainLayout>
        <HeroSection />
        <AccordionSection />
      </MainLayout>
    </AppContextProvider>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <SEO title="Home Page" />;
