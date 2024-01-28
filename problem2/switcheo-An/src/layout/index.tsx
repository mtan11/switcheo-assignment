import { ReactNode } from 'react';
import { Footer, Header } from '@switcheo/components';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />

      {children}

      <Footer />
    </>
  );
};

export default Layout;
