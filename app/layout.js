import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/Toast";
import { SITE } from "@/lib/apiCatalog";

export const metadata = {
  metadataBase: new URL(SITE.baseUrl),
  title: {
    default: `${SITE.name} — REST API Gratis untuk Developer`,
    template: `%s — ${SITE.name}`
  },
  description: SITE.tagline,
  icons: { icon: "/images/icon-website.png" }
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <ToastProvider />
      </body>
    </html>
  );
}
