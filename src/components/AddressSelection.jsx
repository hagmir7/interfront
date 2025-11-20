'use client'
import { useState } from 'react'
import { AddressForm } from './AddressForm'
import { PlusCircle } from 'lucide-react'

export function AddressSelection({
  selectedAddress,
  onAddressChange,
  addresses,
}) {
  const [showModal, setShowModal] = useState(false)

  const handleAddAddress = (addressData) => {
    console.log('New address:', addressData)
    setShowModal(false)
  }

  return (
    <div className='space-y-4 mt-5 rounded-lg border border-gray-200 bg-white p-4 shadow-sm'>
      <p className='text-md font-semibold text-gray-900 mb-1'>
        Sélectionnez ou ajoutez une adresse
      </p>

      <ul className='grid w-full'>
        {addresses.map((address) => (
          <li key={address.id} className='mb-3'>
            <input
              type='radio'
              value={address.id}
              id={`address-${address.id}`}
              name='hosting'
              className='hidden peer'
              checked={selectedAddress === address.id}
              onChange={(e) => onAddressChange(e.target.value)}
              required
            />
            <label
              htmlFor={`address-${address.id}`}
              className='inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100'
            >
              <div className='block'>
                <div className='w-full text-lg font-semibold'>
                  {address.name} ({address.phone})
                </div>
                <div className='w-full'>{address.address}</div>
              </div>
              <svg
                className='w-5 h-5 ms-3 rtl:rotate-180'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M1 5h12m0 0L9 1m4 4L9 9'
                />
              </svg>
            </label>
          </li>
        ))}

        <li>
          <div className='flex items-center justify-center w-full'>
           <button 
           onClick={() => setShowModal(true)}
            type="button"
            className="group text-md cursor-pointer flex flex-col items-center justify-center w-full py-3 rounded-xl border-2 border-red-300 border-dashed bg-red-50 hover:bg-red-100 transition-all"
        >
            <div className="flex items-center gap-3">
              <PlusCircle size={26} className="text-red-600 group-hover:text-red-700 transition-colors"  />
                <span className="text-red-600 font-semibold group-hover:text-red-700 transition-colors">
                    Ajouter une adresse
                </span>
            </div>
        </button>

          </div>
        </li>
      </ul>
      {showModal && (
        <AddressForm
          onSubmit={handleAddAddress}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
