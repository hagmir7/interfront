'use client'

import { useState } from 'react'

export function AddressForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    phone: '',
    email: '',
    city: '',
    addressName: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const cities = [
    'Nador',
    'Casablanca',
    'Rabat',
    'Fès',
    'Marrakech',
    'Tanger',
    'Agadir',
    'Meknès',
    'Oujda',
    'Tétouan',
    'Laâyoune',
    'Safi',
    'Khouribga',
    'El Jadida',
    'Beni Mellal',
    'Kénitra',
    'Berkane',
    'Taourirt',
    'Mohammédia',
    'Almería',
    'Lérida',
    'Madrid',
    'Barcelone',
    'Alicante',
    'Badajoz',
    'León',
    'Lugo',
    'Toledo',
    'Tenerife',
    'Selouan',
    'Al Aaroui',
    'Kassita',
    'Sidi-Kacem',
    'Driouch',
    'Essaouira',
    'Taza',
    'Saïdia',
    'Settat',
    'Témara',
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      onSubmit(formData)
      setIsLoading(false)
    }, 1000)
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50'>
      <div
        className='max-w-3xl px-6 py-4 mx-auto text-left bg-white rounded shadow-lg'
        style={{ minWidth: '50%' }}
      >
        <div className='flex items-center justify-between'>
          <h5 className='mr-3 text-black max-w-none text-2xl font-semibold'>
            Nouvelle adresse
          </h5>
          <button
            type='button'
            className='z-50 cursor-pointer'
            onClick={onClose}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <input
            type='hidden'
            name='_token'
            value='bfznKQIwuDj4h5wsOpjMRIdOLw4SAyGS8xGr7ZZh'
            autoComplete='off'
          />

          <div className='flex w-full gap-3'>
            <div className='w-full'>
              <label
                htmlFor='last_name'
                className='block text-sm font-semibold text-gray-700'
              >
                Nom
              </label>
              <input
                type='text'
                name='last_name'
                id='last_name'
                className='mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm'
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
              />
            </div>
            <div className='w-full'>
              <label
                htmlFor='first_name'
                className='block text-sm font-semibold text-gray-700'
              >
                Prénom
              </label>
              <input
                type='text'
                name='first_name'
                id='first_name'
                className='mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm'
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
              />
            </div>
          </div>

          <div className='flex w-full gap-3'>
            <div className='w-full'>
              <label
                htmlFor='phone'
                className='block text-sm font-semibold text-gray-700'
              >
                Téléphone
              </label>
              <input
                type='text'
                name='phone'
                id='phone'
                className='mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm'
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>
            <div className='w-full'>
              <label
                htmlFor='email'
                className='block text-sm font-semibold text-gray-700'
              >
                E-mail
              </label>
              <input
                type='email'
                name='email'
                id='email'
                className='mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm'
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='countries'
              className='block mb-2 text-sm font-medium text-gray-900'
            >
              Ville
            </label>
            <select
              id='countries'
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className='border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5'
            >
              <option value=''>Choisissez une ville</option>
              {cities.map((city, index) => (
                <option key={index + 1} value={(index + 1).toString()}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor='address_name'
              className='block text-sm font-semibold text-gray-700'
            >
              Adresse
            </label>
            <input
              type='text'
              name='address_name'
              id='address_name'
              className='mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm'
              value={formData.addressName}
              onChange={(e) => handleInputChange('addressName', e.target.value)}
            />
          </div>

          <div>
            <button
              type='submit'
              disabled={isLoading}
              className='w-full flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 space-x-1'
            >
              {isLoading && (
                <svg
                  className='inline w-4 h-4 me-3 text-red animate-spin'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='#E5E7EB'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentColor'
                  />
                </svg>
              )}
              <span>Créer</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
