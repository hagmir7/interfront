'use client'
import { useState } from 'react'
import { CartItem } from './CartItem'
import { PaymentMethodSelect } from './PaymentMethodSelect'
import { ShippingMethodSelect } from './ShippingMethodSelect'
import { AddressSelection } from './AddressSelection'
import { OrderSummary } from './OrderSummary'
import { useCart } from '@/context/CartContext'

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [shippingMethod, setShippingMethod] = useState('2')
  const [selectedAddress, setSelectedAddress] = useState('1')
  const [isLoading, setIsLoading] = useState(false)

  const addresses = [
    {
      id: '1',
      name: 'Hassan Agmir',
      phone: '0601462997',
      address: 'Ait frigou guigou, Fès',
    },
  ]

  const handleSubmitOrder = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      console.log('Order submitted')
    }, 2000)
  }

  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  console.log(cart);
  
    const [isCheckingOut, setIsCheckingOut] = useState(false);
  
    // Calculate total price
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
      <h2 className='text-xl mt-4 font-semibold text-gray-900 sm:text-2xl'>
        Votre panier
      </h2>

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

        <div className='mx-auto mt-6 max-w-5xl flex-1 space-y-6 lg:mt-0 lg:w-full'>
          <PaymentMethodSelect
            value={paymentMethod}
            onChange={setPaymentMethod}
          />

          <div className='space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm'>
            <ShippingMethodSelect
              value={shippingMethod}
              onChange={setShippingMethod}
            />
          </div>

          <AddressSelection
            selectedAddress={selectedAddress}
            onAddressChange={setSelectedAddress}
            addresses={addresses}
          />

          <div className='space-y-4 mt-5 rounded-lg border border-gray-200 bg-white p-4 shadow-sm'>
            <OrderSummary
              originalPrice={227.38}
              tax={45.48}
              total={272.85}
              onSubmit={handleSubmitOrder}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
