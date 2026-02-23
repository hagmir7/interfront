export function PaymentMethodSelect({ value, onChange }) {
  const paymentMethods = [
    { value: '1', label: 'Virement Bancaire' },
    { value: '2', label: 'Versement Agences' },
    { value: '3', label: 'Chèque à la livraison' },
  ]

  return (
    <div className=''>
      <p className='text-md font-semibold text-gray-900 mb-1'>Méthode de paiement <span className="text-red-600">*</span></p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600'
        required
      >
        <option value=''>Sélectionnez le mode de paiement</option>
        {paymentMethods.map((method) => (
          <option key={method.value} value={method.value} className='py-2'>
            {method.label}
          </option>
        ))}
      </select>
    </div>
  )
}
