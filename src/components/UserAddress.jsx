"use client";

import { api } from "@/lib/api";
import { MapPin } from "lucide-react";
import React, { useEffect, useState } from "react";

function UserAddress() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await api.get("address");
      setAddresses(response.data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des adresses :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-blue-600" />
        Mes Adresses
      </h3>

      {loading ? (
        <div className="text-center text-gray-500 py-10">Chargement...</div>
      ) : addresses.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          Aucune adresse trouvée.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="py-3 px-4 text-left">Nom du contact</th>
                <th className="py-3 px-4 text-left">Adresse</th>
                <th className="py-3 px-4 text-left">Ville</th>
                <th className="py-3 px-4 text-left">Téléphone</th>
                <th className="py-3 px-4 text-left">E-mail</th>
              </tr>
            </thead>
            <tbody>
              {addresses.map((addr) => (
                <tr
                  key={addr.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">
                    {addr.first_name} {addr.last_name}
                  </td>
                  <td className="py-3 px-4">{addr.address_name}</td>
                  <td className="py-3 px-4">{addr.city?.name || "-"}</td>
                  <td className="py-3 px-4">{addr.phone}</td>
                  <td className="py-3 px-4">{addr.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserAddress;
