'use client';
import { useCart } from '@/context/CartContext';
import { Trash } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import CLink from './CLink';
import { Button, Empty, Typography } from 'antd';
import { useAuth } from '@/context/AuthContext';

const TVA_RATE = 0.02; // 2%

// Safely coerce any price value (string, number, null, undefined) to a number
const toNumber = (val) => {
  const n = Number(val);
  return Number.isFinite(n) ? n : 0;
};

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { user, discounts } = useAuth();

  if (cart.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-2 md:py-8 bg-white shadow-sm rounded-none md:rounded-lg mt-3 h-[400px]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="container mx-auto">
            <h1 className="text-lg md:text-2xl font-bold mb-4">Votre panier</h1>
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              styles={{ image: { height: 60 } }}
              description={
                <Typography.Text>
                  Votre panier est vide
                </Typography.Text>
              }
            >
              <CLink href='/shop'><Button variant='solid' color='red' type="primary">Nos Produits</Button></CLink>
            </Empty>
          </div>
        </div>
      </div>
    );
  }

  // Get discount % for an item — only applies if the user is logged in
  const getDiscountPercentage = (item) => {
    if (!user) return 0;
    return toNumber(discounts?.find(d => d.family_id === item.attributes?.family_id)?.percentage);
  };

  // Unit price after discount
  const getDiscountedUnitPrice = (item) => {
    const price = toNumber(item.price);
    const pct = getDiscountPercentage(item);
    return price * (1 - pct / 100);
  };

  // Totals
  const totalHT = cart.reduce(
    (sum, item) => sum + getDiscountedUnitPrice(item) * toNumber(item.quantity),
    0
  );
  const totalTVA = totalHT * TVA_RATE;
  const totalTTC = totalHT + totalTVA;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 bg-white shadow-sm rounded-none md:rounded-lg mt-3">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-xl md:text-2xl font-bold">Votre panier</h1>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {cart.map((item) => {
          const price = toNumber(item.price);
          const discountPct = getDiscountPercentage(item);
          const discountedPrice = getDiscountedUnitPrice(item);

          return (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 last:border-b-0 gap-3"
            >
              {/* Product Image */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {item.attributes.image && (
                  <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                    <Image
                      src={`https://app.intercocina.com/storage/${item.attributes.image}`}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="object-cover rounded w-full h-full"
                    />
                  </div>
                )}

                {/* Product Details */}
                <div className="flex-grow">
                  <h2 className="text-sm md:text-lg font-semibold">
                    <Link href={`/product/${item.attributes.slug}`}>
                      {item.attributes.attribute} {item.name.replace("Façade", '')} {item?.attributes?.dimension} {item.attributes?.color_name?.name}
                    </Link>
                  </h2>

                  <p className="text-gray-600 text-sm md:text-base">
                    Prix: {price.toFixed(2)} MAD
                    {discountPct > 0 && (
                      <>
                        {' '}-{discountPct}%{' '}
                        <span className="font-semibold text-red-500">
                          ({discountedPrice.toFixed(2)} MAD)
                        </span>
                      </>
                    )}
                  </p>

                  {/* Additional */}
                  <div className="flex flex-wrap gap-x-4 mt-1">
                    {item.color_name && (
                      <p className="text-xs md:text-sm text-gray-500">
                        Color: {item.color_name}
                      </p>
                    )}
                    {item.dimension && (
                      <p className="text-xs md:text-sm text-gray-500">
                        Dimension: {item.dimension}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center w-full sm:w-auto gap-4">
                {/* Quantity Control */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-200 px-2 rounded disabled:opacity-50 cursor-pointer"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 px-2 rounded cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  aria-label="Remove item"
                >
                  <Trash size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Summary */}
      <div className="mt-6">
        <div className="w-full sm:max-w-md sm:ml-auto space-y-1">
          <div className="flex justify-between">
            <span className="text-sm md:text-base text-gray-600">Total HT</span>
            <span className="text-sm md:text-base font-medium">{totalHT.toFixed(2)} MAD</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm md:text-base text-gray-600">TVA (2%)</span>
            <span className="text-sm md:text-base font-medium">{totalTVA.toFixed(2)} MAD</span>
          </div>
          <div className="flex justify-between pt-2 border-t mt-2">
            <span className="text-base md:text-lg font-semibold">Total TTC</span>
            <span className="text-lg md:text-xl font-bold">{totalTTC.toFixed(2)} MAD</span>
          </div>
        </div>
      </div>

      <div className='flex justify-center md:justify-end'>
        <CLink
          className="w-full text-center py-2 mt-4 md:w-60 md:py-3 px-4 rounded transition text-sm md:text-base bg-red-500 text-white hover:bg-red-700"
          href='/checkout'
        >
          Passer à la confirmation
        </CLink>
      </div>
    </div>
  );
}