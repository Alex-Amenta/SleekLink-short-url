import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import BackgroundPage from "@/components/BackgroundPage";
import Provider from "@/components/Provider";
import Navbar from "@/components/Navbar";
import ToastProvider from "@/components/ToastProvider";

const inter = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "ShortURL - Acortador de URLs",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href="/ico-logo.png"
        sizes="100x100"
        type="image/x-icon"
      />
      <body className={inter.className}>
        <Provider>
          <ToastProvider>
            <BackgroundPage />
            <Navbar />
            {children}
          </ToastProvider>
        </Provider>
      </body>
    </html>
  );
}
