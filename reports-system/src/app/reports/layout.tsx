import { ReactNode } from "react";
import Providers from "../providers";

interface ReportsLayoutProps {
  all: ReactNode;
  filtered: ReactNode;
}

export default function ReportsLayout({ all, filtered }: ReportsLayoutProps) {
  return (
    <div className="grid grid-cols-1 gap-8">
      <Providers>
        {all}
        {filtered}
      </Providers>
    </div>
  );
}
