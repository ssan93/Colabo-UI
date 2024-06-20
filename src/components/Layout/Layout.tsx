import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="max-w-screen-sm ">{children}</div>
    </div>
  );
};
