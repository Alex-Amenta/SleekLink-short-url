import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import BackgroundPage from "@/components/BackgroundPage";
import Provider from "@/components/Provider";
import Navbar from "@/components/Navbar";
import ToastProvider from "@/components/ToastProvider";
import DashboardNavbar from "@/components/DashboardNavbar";
import ModalCookies from "@/components/ui/ModalCookies";

const inter = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "SleekLink - Acortador de URLs",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href="/logo-sleeklink.png"
        sizes="100x100"
        type="image/x-icon"
      />
      <body className={inter.className}>
        <Provider>
          <ToastProvider>
            <div id="main-content">
              <BackgroundPage />
              <Navbar />
              <DashboardNavbar />
              {children}
            </div>
            <ModalCookies />
          </ToastProvider>
        </Provider>
      </body>
    </html>
  );
}
