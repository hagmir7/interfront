export function CartItem({ name, dimensions, color, price, discount, href }) {
  return (
    <div className='rounded-lg border border-gray-200 bg-white p-2 shadow-sm md:p-2'>
      <div className='md:flex md:items-center md:gap-6 md:space-y-0 md:justify-between'>
        <div>
          <a
            href={href}
            className='text-base font-bold text-gray-900 hover:underline'
          >
            {name} - {dimensions} ({color})
          </a>
        </div>
        <div className='flex items-center justify-between md:order-3 md:justify-end'>
          <div className='text-end md:order-4'>
            <p className='text-base font-bold text-gray-900 text-nowrap'>
              1 &nbsp; x &nbsp; {price} | {discount}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
