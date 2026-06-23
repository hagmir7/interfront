import "./globals.css";
import "@fontsource/figtree";
import "@fontsource/figtree/400.css";
import "@fontsource/figtree/400-italic.css";
import MainNav from "@/components/main-nav";
import Footer from "@/components/footer";
import { CartProvider } from "@/context/CartContext";
import { LoadingBar } from "@/components/ui/LoadingBar";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { AuthProvider } from "@/context/AuthContext";
import TopNav from "@/components/top-nav";
import { getDomain } from "@/lib/domain";

export async function generateMetadata() {
  return {
    metadataBase: new URL(await getDomain()),
  };
}
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="INTER" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="preconnect" href="https://app.intercocina.com" />
      </head>
      <body className="bg-[#f2f2f2]">
        <LoadingBar />
        <CartProvider>
          <AuthProvider>
            <header>
              <TopNav />
              <MainNav />
            </header>
            <main>
              {children}
            </main>
            <Footer />
            <WhatsAppFloat />
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}