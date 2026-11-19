import MainNav from "@/components/main-nav";
import TopNav from "@/components/top-nav";
import Footer from "@/components/footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import WhatsAppNumberAlert from "@/components/WhatsAppNumberAlert";
import SIBCountdown from "@/components/SIBCountdown";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

export default function StorefrontLayout({ children }) {
  return (
    <>
      <CartProvider>
        <AuthProvider>
          <WhatsAppNumberAlert />
          <header>
            <TopNav />
            <MainNav />
          </header>
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
        </AuthProvider>
      </CartProvider>
      <SIBCountdown />
    </>
  );
}
