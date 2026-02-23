"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { CartItem } from "./CartItem";
import { PaymentMethodSelect } from "./PaymentMethodSelect";
import { ShippingMethodSelect } from "./ShippingMethodSelect";
import { AddressSelection } from "./AddressSelection";
import { OrderSummary } from "./OrderSummary";
import { AnimatedAlert } from "./ui/AnimatedAlert";
import CheckoutMessage from "./CheckoutMessage";
import CLink from "./CLink";
import { LogIn } from "lucide-react";

export default function CheckoutPage() {
  const { cart } = useCart();
  const { user, authLoading } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [shippingMethod, setShippingMethod] = useState("2");
  const [selectedAddress, setSelectedAddress] = useState("1");
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [orderCode, setOrderCode] = useState(null);


  useEffect(() => {
    if (!user) return;

    const loadAddresses = async () => {
      try {
        const res = await api.get("address");
        setAddresses(res.data || []);
      } catch (error) {
        console.error("Erreur chargement adresses:", error);
      }
    };

    loadAddresses();
  }, [user]);

  const handleSubmitOrder = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await api.post("orders", {
        address_id: selectedAddress,
        payment: paymentMethod,
        shipping_id: shippingMethod,
        cart,
      });

      setOrderCode(response?.data?.order?.code);

      setMessage({
        type: "success",
        content: response.data.message,
      });

    } catch (error) {
      setMessage({
        type: "error",
        content:
          error.response?.data?.message ||
          "Une erreur est survenue",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 🔥 Wait for auth state before rendering
  if (authLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        Chargement...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-xl px-2 md:px-4 2xl:px-0">
      <h2 className="text-md md:text-xl mt-4 font-semibold text-gray-900">
        Confirmation de commande
      </h2>

      {/* SUCCESS MESSAGE */}
      {message?.type === "success" && (
        <CheckoutMessage orderCode={orderCode} />
      )}

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-3 xl:gap-8">

        {/* LEFT SIDE — CART ITEMS */}
        <div className="lg:col-span-2 space-y-3">
          {cart.map((item) => {
            const attribute = item?.attributes?.attribute ?? "";
            let name = `${attribute} ${item?.name ?? ""}`.trim();
            name = name.replace(/façade|facade/gi, "").trim();

            return (
              <CartItem
                key={item.id}
                name={name}
                dimensions={item?.attributes?.dimension ?? ""}
                color={item?.attributes?.color_name ?? ""}
                price={item.price}
                href={`/product/${item?.attributes?.slug ?? ""}`}
                quantity={item.quantity}
              />
            );
          })}
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4">

          <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-xs">
            <PaymentMethodSelect
              value={paymentMethod}
              onChange={setPaymentMethod}
            />
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-xs">
            <ShippingMethodSelect
              value={shippingMethod}
              onChange={setShippingMethod}
            />
          </div>

          {/* ADDRESS SECTION */}
          {user && (
            <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-xs">
              <AddressSelection
                selectedAddress={selectedAddress}
                onAddressChange={setSelectedAddress}
                addresses={addresses}
              />
            </div>
          )}

          {/* ERROR MESSAGE */}
          {message?.type === "error" && (
            <AnimatedAlert
              type="error"
              title={message.content}
              autoClose={5000}
              onDismiss={() => setMessage(null)}
            />
          )}

          {/* ORDER SUMMARY OR LOGIN BUTTON */}
          {user ? (
            <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-xs">
              <OrderSummary
                originalPrice={Number(total)}
                tax={Number(total) * 0.2}
                total={Number(total) * 1.2}
                onSubmit={handleSubmitOrder}
                isLoading={isLoading}
              />
            </div>
          ) : (
            <CLink
              href="/user/login?next=/checkout"
              className="w-full justify-center flex items-center gap-3 px-6 py-3 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 transition-all shadow-sm"
            >
              Se connecter
              <LogIn className="h-5 w-5" />
            </CLink>
          )}

        </div>
      </div>
    </div>
  );
}