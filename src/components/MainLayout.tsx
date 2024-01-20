import Footer from "./Footer";
import Header from "./Header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <section className="grow">{children}</section>
      <Footer>This is a fucking footer haq ghal Madonni</Footer>
    </main>
  );
};

export default MainLayout;
