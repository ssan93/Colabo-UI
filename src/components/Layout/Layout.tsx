import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-200">
      <div className="h-full w-full max-w-screen-sm bg-white">{children}</div>
    </div>
  );
};
