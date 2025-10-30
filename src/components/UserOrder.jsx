"use client"
import { Package } from 'lucide-react';
import React, { useState } from 'react'


function UserOrder({ user_id }) {
    const [orders] = useState([
        { id: "CMD-1001", date: "2025-01-15", total: "2 450,00 DH", status: "Livrée", items: 3 },
        { id: "CMD-1002", date: "2025-02-02", total: "1 290,00 DH", status: "En cours", items: 2 },
        { id: "CMD-1003", date: "2025-03-22", total: "3 890,00 DH", status: "Annulée", items: 5 },
    ]);
    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                Mes Commandes
            </h3>

            <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="py-3 px-4 text-left">#</th>
                            <th className="py-3 px-4 text-left">Date</th>
                            <th className="py-3 px-4 text-left">Articles</th>
                            <th className="py-3 px-4 text-left">Total</th>
                            <th className="py-3 px-4 text-left">Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-t hover:bg-gray-50 transition">
                                <td className="py-3 px-4 font-medium">{order.id}</td>
                                <td className="py-3 px-4">
                                    {new Date(order.date).toLocaleDateString("fr-FR")}
                                </td>
                                <td className="py-3 px-4">{order.items}</td>
                                <td className="py-3 px-4">{order.total}</td>
                                <td className="py-3 px-4">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === "Livrée"
                                            ? "bg-green-100 text-green-700"
                                            : order.status === "En cours"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserOrder