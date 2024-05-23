const Footer = ({ children }: { children: React.ReactNode }) => {
  return (
    <footer className="pt-12 pb-4 text-sm sm:text-xl text-grey-2">
      {children}
    </footer>
  );
};

export default Footer;
