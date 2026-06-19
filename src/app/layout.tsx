import type { Metadata } from "next";
import { Cairo, Outfit } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { PrototypeStateProvider } from "@/context/PrototypeStateContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "الرابطة العلمية والتقنية للشباب قسنطينة | STLY Constantine",
  description: "الموقع الرسمي للرابطة العلمية والتقنية للشباب قسنطينة - نحو جيل يقود المستقبل بالعلم والابتكار. نوادي علمية، ورشات تكوينية، ومشاريع تكنولوجية.",
  keywords: ["الرابطة العلمية", "قسنطينة", "الشباب", "ابتكار", "تكنولوجيا", "روبوتيك", "ذكاء اصطناعي", "STLY", "Constantine", "Robotics", "AI"],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-bg text-brand-dark">
        <LanguageProvider>
          <PrototypeStateProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </PrototypeStateProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
