"use client";

import { api } from "@/lib/api";
import { MapPin, PlusCircle, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { AddressForm } from "./AddressForm";
import { AnimatedAlert } from "./ui/AnimatedAlert";

function UserAddress() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleAddAddress = (addressData) => {
    setShowModal(false);
    getData();
  };

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

  const deleteAddress = async (address_id) => {
    try {
      const response = await api.delete(`address/${address_id}`);

      setMessage({
        content: response.data.message,
        type: "success",
      });
      getData();
    } catch (error) {
      setMessage({
        content: error.response?.data?.message || "Une erreur est survenue",
        type: "error",
      });
    } finally {
      setDeleteConfirm(null);
    }
  };

  const confirmDelete = (addr) => {
    setDeleteConfirm(addr);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Mes Adresses
        </h3>

        <button
          onClick={() => setShowModal(true)}
          className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm shadow transition-all flex gap-2 items-center"
        >
          <PlusCircle size={15} />
          <span>Nouveau</span>
        </button>
      </div>
      
      {message?.type && (
        <AnimatedAlert
          type={message?.type}
          title={message?.content}
          autoClose={3000}
          onDismiss={() => setMessage(null)}
        />
      )}
      
      <div className="mt-3"></div>

      {showModal && (
        <AddressForm
          onSubmit={handleAddAddress}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Confirmer la suppression
            </h3>
            <p className="text-gray-600 mb-4">
              Êtes-vous sûr de vouloir supprimer l'adresse de{" "}
              <span className="font-medium">
                {deleteConfirm.first_name} {deleteConfirm.last_name}
              </span>{" "}
              ?
            </p>
            <p className="text-sm text-gray-500 mb-6">
              {deleteConfirm.address_name}, {deleteConfirm.city?.name || "-"}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm transition-all"
              >
                Annuler
              </button>
              <button
                onClick={() => deleteAddress(deleteConfirm.id)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-all flex items-center gap-2"
              >
                <Trash size={15} />
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-500 py-10">Chargement...</div>
      ) : addresses.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          Aucune adresse trouvée.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs whitespace-nowrap">
              <tr>
                <th className="py-3 px-4 text-left">Nom du contact</th>
                <th className="py-3 px-4 text-left">Adresse</th>
                <th className="py-3 px-4 text-left">Ville</th>
                <th className="py-3 px-4 text-left">Téléphone</th>
                <th className="py-3 px-4 text-left">E-mail</th>
                <th className="py-3 px-4 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {addresses.map((addr) => (
                <tr
                  key={addr.id}
                  className="border-t hover:bg-gray-50 transition whitespace-nowrap"
                >
                  <td className="py-3 px-4">
                    {addr.first_name} {addr.last_name}
                  </td>
                  <td className="py-3 px-4">{addr.address_name}</td>
                  <td className="py-3 px-4">{addr.city?.name || "-"}</td>
                  <td className="py-3 px-4">{addr.phone}</td>
                  <td className="py-3 px-4">{addr.email || "-"}</td>
                  <td className="py-3 px-4">
                    <button onClick={() => confirmDelete(addr)}>
                      <Trash
                        size={15}
                        className="text-red-600 cursor-pointer hover:text-red-700 transition"
                      />
                    </button>
                  </td>
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