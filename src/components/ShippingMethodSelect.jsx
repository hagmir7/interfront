export function ShippingMethodSelect({ value, onChange }) {
  const shippingMethods = [
    'EX-WORK',
    'LA VOIE EXPRESS',
    'SDTM',
    'LODIVE',
    'MTR',
    'CARRE',
    'MAROC EXPRESS',
    'GLOG MAROC',
    'AL JAZZERA',
    'C YAHYA',
    'C YASSIN',
    'GHAZALA',
    'GISNAD',
  ]

  return (
    <div>
      <p className='text-md font-semibold text-gray-900 mb-1'>
        Expédition <span className="text-red-600">*</span>
      </p>
      <select
        id='shipping'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        name='shipping'
        className='w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600'
      >
        <option value=''>Sélectionnez le mode d'expédition </option>
        {shippingMethods.map((method, index) => (
          <option key={index + 1} value={(index + 1).toString()}>
            {method}
          </option>
        ))}
      </select>
    </div>
  )
}
