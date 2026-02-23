"use client";

import { api } from "@/lib/api";
import { MapPin, PlusCircle, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";


function UserDiscount() {

    const [discounts, setDiscounts] = useState([]);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);
        try {
            const response = await api.get("discounts");
            console.log(response.data);

            setDiscounts(response.data || []);
        } catch (error) {
            console.error("Erreur lors du chargement des adresses :", error);
        } finally {
            setLoading(false);
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
                    Mes Remise
                </h3>

            </div>

            {loading ? (
                <div className="text-center text-gray-500 py-10">Chargement...</div>
            ) : discounts.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                    Aucune remises trouvée.
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs whitespace-nowrap">
                            <tr>
                                <th className="py-3 px-4 text-left">Famille</th>
                                <th className="py-3 px-4 text-left">Remise</th>
                            </tr>
                        </thead>
                        <tbody>
                            {discounts.map((discount) => (
                                <tr
                                    key={discount.id}
                                    className="border-t hover:bg-gray-50 transition whitespace-nowrap"
                                >
                                    <td className="py-3 px-4">
                                        {discount?.family?.name}
                                    </td>
                                    <td className="py-3 px-4">{discount?.percentage || "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default UserDiscount;