"use client"
import { useState, useEffect } from "react"
import { AddressForm } from "./AddressForm"
import { ArrowRight, PlusCircle } from "lucide-react"

export function AddressSelection({
  selectedAddress,
  onAddressChange,
  addresses,
  addresseCreated
}) {
  const [showModal, setShowModal] = useState(false)

  // ✅ Set first address as default IF nothing selected
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      onAddressChange(addresses[0].id)
    }
  }, [addresses, selectedAddress, onAddressChange])

  const handleAddAddress = (addressData) => {
    addresseCreated();
    setTimeout(() => {
      setShowModal(false)
    }, 3000);
  
  }

  return (
    <div className="space-y-4">
      <p className="text-md font-semibold text-gray-900 mb-1">
        Sélectionnez une adresse
      </p>

      <ul className="grid w-full">
        {addresses.map((address) => (
          <li key={address.id} className="mb-3">
            <input
              type="radio"
              value={address.id}
              id={`address-${address.id}`}
              name="address"
              className="hidden peer"
              checked={selectedAddress === address.id}
              onChange={(e) => onAddressChange(Number(e.target.value))}
              required
            />
            <label
              htmlFor={`address-${address.id}`}
              className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 transition-all"
            >
              <div className="block">
                <div className="w-full text-sm md:text-lg font-semibold">
                  {address.first_name} {address.last_name} ({address.phone})
                </div>
                <div className="w-full">
                  {address.address_name}, {address?.city?.name}
                </div>
              </div>

              <ArrowRight size={24}  className="text-gray-700"/>
            </label>
          </li>
        ))}

        <li>
          <div className="flex items-center justify-center w-full">
            <button
              onClick={() => setShowModal(true)}
              type="button"
              className="group text-md cursor-pointer flex flex-col items-center justify-center w-full py-3 rounded-xl border-2 border-red-300 border-dashed bg-red-50 hover:bg-red-100 transition-all"
            >
              <div className="flex items-center gap-3">
                <PlusCircle
                  size={20}
                  className="text-red-600 group-hover:text-red-700 transition-colors"
                />
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
