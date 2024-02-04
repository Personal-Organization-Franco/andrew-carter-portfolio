import type { HeadFC } from "gatsby";
import SEO from "components/SEO";
import MainLayout from "components/MainLayout";
import { AppContextProvider } from "context";
import HeroSection from "components/HeroSection";

const IndexPage = () => {
  return (
    <AppContextProvider>
      <MainLayout>
        <HeroSection />
      </MainLayout>
    </AppContextProvider>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <SEO title="Home Page" />;
