import type { HeadFC } from "gatsby";
import SEO from "components/SEO";
import MainLayout from "components/MainLayout";

const IndexPage = () => {
  return <MainLayout>SOMETHING INSIDE HERE ????</MainLayout>;
};

export default IndexPage;

export const Head: HeadFC = () => <SEO title="Home Page" />;
