import { ReactNode } from "react";
import Providers from "./providers";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <h1>Reports System</h1>
        <Providers> {children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
