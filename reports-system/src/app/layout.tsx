import { ReactNode } from "react";
import Providers from "./providers";
import MainHeader from "../componrnts/main-header/main-header";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        <Providers> {children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
