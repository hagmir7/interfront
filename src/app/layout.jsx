
import "./globals.css";
import "@fontsource/figtree"; // Defaults to weight 400
import "@fontsource/figtree/400.css"; // Specify weight
import "@fontsource/figtree/400-italic.css"; // Specify weight and style
import MainNav from "@/components/main-nav";
import Footer from "@/components/footer";
import LoadingBar from "@/components/ui/LoadingBar";;
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "Fabricant de meubles de cuisine de lux. - Intercocina",
  description: "Intercocina est une entreprise spécialisée dans la fabrication de meubles de cuisine, meubles TV, placards et armoires, meubles de salle de bain, ainsi que de parquets, au Maroc.",
};

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
      </head>
      <body className="bg-[#f2f2f2]">
        <LoadingBar />
        <MainNav />
        <CartProvider>
          {children}
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}
