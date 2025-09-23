import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <h1>Reports System</h1>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
