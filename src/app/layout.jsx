
import "./globals.css";
import "@fontsource/figtree"; // Defaults to weight 400
import "@fontsource/figtree/400.css"; // Specify weight
import "@fontsource/figtree/400-italic.css"; // Specify weight and style
import MainNav from "@/components/main-nav";

export const metadata = {
  title: "Fabricant de meubles de cuisine de lux. - Intercocina",
  description: "Intercocina est une entreprise spécialisée dans la fabrication de meubles de cuisine, meubles TV, placards et armoires, meubles de salle de bain, ainsi que de parquets, au Maroc.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <MainNav />
        {children}
      </body>
    </html>
  );
}
