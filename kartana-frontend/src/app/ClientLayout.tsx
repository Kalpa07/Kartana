"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import { store } from "../store/store";
import { Provider as ReduxProvider } from "react-redux";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideLayout = pathname.startsWith("/auth");

  return (
    <SessionProvider>
       <ReduxProvider store={store}>
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
      </ReduxProvider>
    </SessionProvider>
  );
}
// json-server --watch src/lib/db.json --port 3001


