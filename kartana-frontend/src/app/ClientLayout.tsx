"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Define routes where Navbar/Footer should be hidden
  const hideLayout = pathname.startsWith("/auth");

  return (
    <>
      {!hideLayout && (
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>
      )}
      <div className="">{children}</div>
      {!hideLayout && (
        <div className="bottom-0 left-0 w-full z-50">
          <Footer />
        </div>
      )}
    </>
  );
}
