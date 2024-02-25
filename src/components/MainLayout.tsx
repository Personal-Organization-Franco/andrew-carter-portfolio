import Footer from "./Footer";
import Header from "./Header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <section className="grow px-1.5">{children}</section>
      <Footer>This is a fucking footer haq ghal Madonni</Footer>
    </main>
  );
};

export default MainLayout;
