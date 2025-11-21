'use client'
import { useEffect, useState } from 'react'
import { CartItem } from './CartItem'
import { PaymentMethodSelect } from './PaymentMethodSelect'
import { ShippingMethodSelect } from './ShippingMethodSelect'
import { AddressSelection } from './AddressSelection'
import { OrderSummary } from './OrderSummary'
import { useCart } from '@/context/CartContext'
import { api } from '@/lib/api'
import { AnimatedAlert } from './ui/AnimatedAlert'
import CheckoutMessage from './CheckoutMessage'

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [shippingMethod, setShippingMethod] = useState('2')
  const [selectedAddress, setSelectedAddress] = useState('1')
  const [isLoading, setIsLoading] = useState(false)
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [message, setMessage] = useState(null)
  const [orderCode, setOrderCode] = useState(null)

  const getData = async () => {
    setLoading(true);
    try {
      const response = await api.get("address");
      setAddresses(response.data || []);
      console.log(response.data);

    } catch (error) {
      console.error("Erreur lors du chargement des adresses :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOrder = async () => {
    setIsLoading(true)
    try {
      const response = await api.post('orders', {
        address_id: selectedAddress,
        payment: paymentMethod,
        shipping_id: shippingMethod,
        cart
      })
      setOrderCode(response?.data?.order?.code)
      setMessage({
        content: response.data.message,
        type: "success",
      })
    } catch (error) {
      console.log(error);
      
      setMessage({
        content: error.response?.data?.message || "Une erreur est survenue",
        type: "error",
      })
    }


    setTimeout(() => {
      setIsLoading(false)
      console.log('Order submitted')
    }, 2000)
  }

  useEffect(() => {
    getData();
  }, [])



  // Calculate total price
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return (
    <div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
      <h2 className='text-xl mt-4 font-semibold text-gray-900 sm:text-2xl'>
        Votre panier
      </h2>

      {message?.type == 'error' && (
        <AnimatedAlert
          type={message?.type}
          title={message?.content}
          autoClose={5000}
          onDismiss={() => setMessage(null)}
        />
      )}

      {
        message?.type == "success" && (<CheckoutMessage orderCode={orderCode} />)
      }


      <div className='mt-2 md:gap-6 lg:flex lg:items-start xl:gap-8'>
        <div className='mx-auto w-full flex-none lg:max-w-1xl xl:max-w-3xl'>
          <div className="space-y-3">
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
                  discount="-20%"
                  href={`/product/${item?.attributes?.slug ?? ""}`}
                />
              );
            })}
          </div>


        </div>

       <div className='space-y-3 mt-4 md:mt-0'>
         <div className='rounded-lg border border-gray-200 bg-white p-3 shadow-xs'>
          <PaymentMethodSelect
            value={paymentMethod}
            onChange={setPaymentMethod}
          />
          </div>
        

          <div className='rounded-lg border border-gray-200 bg-white p-3 shadow-xs'>
            <ShippingMethodSelect
              value={shippingMethod}
              onChange={setShippingMethod}
            />
          </div>

          <div className='rounded-lg border border-gray-200 bg-white p-3 shadow-xs'>
            <AddressSelection
            selectedAddress={selectedAddress}
            onAddressChange={setSelectedAddress}
            addresses={addresses}
            addresseCreated={getData}
          />
          </div>

          <div className='rounded-lg border border-gray-200 bg-white p-3 shadow-xs'>
            <OrderSummary
              originalPrice={Number(total)}
              tax={Number(total) * 0.2}
              total={Number(total) * 1.2}
              onSubmit={handleSubmitOrder}
              isLoading={isLoading}
            />
          </div>
       </div>
        
      </div>
    </div>
  )
}
