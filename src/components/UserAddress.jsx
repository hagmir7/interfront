"use client";
import { MapPin } from "lucide-react";
import React, { useState } from "react";

function UserAddress({ user_id }) {
  const [addresses] = useState([
    {
      id: "ADDR-001",
      address_name: "12 Rue des Jardins",
      city: "Casablanca",
      phone: "0652485214",
      country: "Maroc",
      isDefault: true,
    },
    {
      id: "ADDR-002",
      address_name: "45 Avenue Hassan II",
      city: "Rabat",
      phone: "0365248544",
      country: "Maroc",
      isDefault: false,
    },
    {
      id: "ADDR-003",
      address_name: "27 Rue Al Amal",
      city: "Marrakech",
      phone: "0648382674",
      country: "Maroc",
      isDefault: false,
    },
  ]);

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-blue-600" />
        Mes Adresses
      </h3>

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="py-3 px-4 text-left">Adresse</th>
              <th className="py-3 px-4 text-left">Ville</th>
              <th className="py-3 px-4 text-left">Pays</th>
              <th className="py-3 px-4 text-left">Téléphone</th>
              <th className="py-3 px-4 text-left">Par Défaut</th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((addr) => (
              <tr
                key={addr.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4">{addr.address_name}</td>
                <td className="py-3 px-4">{addr.city}</td>
                <td className="py-3 px-4">{addr.phone}</td>
                <td className="py-3 px-4">{addr.country}</td>
                <td className="py-3 px-4">
                  {addr.isDefault ? (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      Oui
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      Non
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserAddress;
