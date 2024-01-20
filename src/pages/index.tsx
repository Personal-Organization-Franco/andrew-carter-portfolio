import type { HeadFC } from "gatsby";
import SEO from "components/SEO";
import MainLayout from "components/MainLayout";
import { AppContextProvider } from "context";

const IndexPage = () => {
  return (
    <AppContextProvider>
      <MainLayout>SOMETHING INSIDE HERE ????</MainLayout>
    </AppContextProvider>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <SEO title="Home Page" />;
