export function CartItem({ name, dimensions, color, price, discount, href, quantity }) {
  return (
    <div className='rounded-lg border border-gray-200 bg-white p-2 shadow-sm md:p-2'>
      <div className='md:flex md:items-center md:gap-6 md:space-y-0 md:justify-between'>
        <div>
          <a
            href={href}
            className='font-bold text-gray-900 hover:underline text-sm md:text-base'
          >
            {name} - {dimensions} {color && `(${color})`}
          </a>
        </div>
        <div className='flex items-center justify-between md:order-3 md:justify-end'>
          <div className='text-end md:order-4'>
            <p className='text-base font-bold text-red-600 text-nowrap'>
              {quantity} &nbsp; x &nbsp; {price} MAD 
              {/* | {discount} */}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
