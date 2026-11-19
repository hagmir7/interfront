"use client";

import { api } from "@/lib/api";
import { Percent } from "lucide-react";
import React, { useEffect, useState } from "react";


function UserDiscount() {

    const [discounts, setDiscounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = (signal) => {
        return api.get("discounts", { signal }).then(response => {
            if (signal?.aborted) return;
            setDiscounts(response.data || []);
            setError(null);
        }).catch(() => {
            if (signal?.aborted) return;
            setError("Impossible de charger vos remises. Veuillez réessayer.");
        }).finally(() => {
            if (signal?.aborted) return;
            setLoading(false);
        });
    };



    useEffect(() => {
        const controller = new AbortController();
        getData(controller.signal);
        return () => controller.abort();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Percent className="w-5 h-5 text-red-600" />
                    Mes remises
                </h3>

            </div>

            {error && <div role="alert" className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error} <button type="button" onClick={() => { setLoading(true); getData(); }} className="ml-2 font-semibold underline">Réessayer</button></div>}

            {loading ? (
                <div className="text-center text-gray-500 py-10">Chargement...</div>
            ) : discounts.length === 0 && !error ? (
                <div className="text-center text-gray-500 py-10">
                    Aucune remise disponible.
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
                                    <td className="py-3 px-4">{discount?.percentage != null ? `${discount.percentage} %` : "-"}</td>
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
