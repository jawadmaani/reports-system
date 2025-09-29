import { ReactNode } from "react";
import Providers from "./providers";
import MainHeader from "../components/main-header/main-header";
import "./globals.css";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children}: RootLayoutProps) => {
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
