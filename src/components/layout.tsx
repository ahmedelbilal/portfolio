import { useTranslation } from "gatsby-plugin-react-i18next";
import React from "react";
import TargetCursor from "./TargetCursor";
import Header from "./header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div
      className="min-h-screen bg-[#FAFAFA] text-gray-900 dark:bg-gray-900 dark:text-white p-4 sm:p-10 font-sans"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Header />
      <TargetCursor spinDuration={2} hideDefaultCursor={true} />
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
