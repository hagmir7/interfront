"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { api } from "@/lib/api"
import { RotateCw } from "lucide-react"
import { AnimatedAlert } from "./ui/AnimatedAlert"

export function AddressForm({ onSubmit, onClose, open = true }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    city_id: "",
    address_name: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [cities, setCities] = useState([])
  const [message, setMessage] = useState(null)

  const getCities = async () => {
    const response = await api.get("cities")
    setCities(response.data)
  }

  useEffect(() => {
    getCities()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await api.post("address", formData)
      onSubmit()
      setMessage({
        content: response.data.message,
        type: "success",
      })

    } catch (error) {
      setMessage({
        content: error.response?.data?.message || "Une erreur est survenue",
        type: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Nouvelle adresse</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">

          {message?.type && (
            <AnimatedAlert
              type={message?.type}
              title={message?.content}
              autoClose={3000}
              onDismiss={() => setMessage(null)}
            />
          )}


          <div className="flex w-full gap-3">
            {/* Nom */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => handleInputChange("last_name", e.target.value)}
                className="border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
              />
            </div>

            {/* Prénom */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => handleInputChange("first_name", e.target.value)}
                className="border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
              />
            </div>
          </div>

          <div className="flex w-full gap-3">
            {/* Téléphone */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
              />
            </div>

            {/* Email */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
              />
            </div>
          </div>

          {/* Ville */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
            <select
              value={formData.city_id}
              onChange={(e) => handleInputChange("city_id", e.target.value)}
              className="border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
            >
              <option value="">Choisissez une ville</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id.toString()}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          {/* Adresse */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
            <input
              type="text"
              value={formData.address_name}
              onChange={(e) => handleInputChange("address_name", e.target.value)}
              className="border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition disabled:opacity-50"
          >
            {isLoading && (
              <RotateCw className="inline w-4 h-4 me-3 animate-spin" style={{ animationDuration: "0.7s" }} />
            )}
            <span>Créer</span>
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
