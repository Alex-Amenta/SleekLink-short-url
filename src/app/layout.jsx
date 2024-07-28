import { Poppins } from "next/font/google";
import "./globals.css";
import BackgroundPage from "@/components/BackgroundPage";
import Provider from "@/components/Provider";
import Navbar from "@/components/Navbar";
import ToastProvider from "@/components/ToastProvider";
import { ThemeProvider } from "next-themes";
import CookieModal from "@/components/ui/modals/CookieModal";

const inter = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "SleekLink - Best URL Shortener",
  description:
    "Simplify your links, customize URLs, and track clicks with SleekLink, your reliable URL shortener.",
  keywords: [
    "URL shortener",
    "custom URLs",
    "link management",
    "click tracking",
    "shorten links",
    "SleekLink",
    "link analytics",
  ],
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
      <body className={`${inter.className} bg-slate-50 dark:bg-[#181818]`}>
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider>
              <Navbar />
              <div id="main-content" className="px-5 lg:px-48">
                <BackgroundPage />
                {children}
              </div>
              <CookieModal />
            </ToastProvider>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
