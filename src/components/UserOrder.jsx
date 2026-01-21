"use client";

import { useEffect, useState } from "react";
import { Package } from "lucide-react";
import { api } from "@/lib/api";
import InterSpin from "./ui/InterSpin";

export default function UserOrder({ user_id }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000"
      : "https://interapi.facepy.com";

  async function fetchOrders(pageNumber = 1) {
    try {
      const response = await api.get(
        `${baseURL}/api/orders-list?page=${pageNumber}`
      );

      const newOrders = response.data.data || [];

      // Append instead of replace if loading more
      if (pageNumber === 1) {
        setOrders(newOrders);
      } else {
        setOrders((prev) => [...prev, ...newOrders]);
      }

      // If no next page => stop Load More
      setHasMore(response.data.next_page_url !== null);
    } catch (error) {
      console.error("Error loading orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  useEffect(() => {
    fetchOrders(1);
  }, [user_id]);

  function loadMore() {
    if (!hasMore) return;

    const nextPage = page + 1;
    setLoadingMore(true);
    setPage(nextPage);
    fetchOrders(nextPage);
  }

  function getStatusInfo(status) {
    const map = {
      1: { name: "En Attente", color: "bg-gray-300 border border-gray-600" },
      2: { name: "Confirmé", color: "bg-blue-300 border border-blue-600" },
      3: { name: "Préparation", color: "bg-orange-200 border border-orange-600" },
      4: { name: "Prêt", color: "bg-green-200 border border-green-600" },
      5: { name: "Annulé", color: "bg-red-200 border border-red-600" },
    };
    return map[status] || { name: "Inconnu", color: "bg-black text-white" };
  }

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Package className="w-5 h-5 text-blue-600" />
        Mes Commandes
      </h3>

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="min-w-full text-sm text-gray-700 whitespace-nowrap">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="py-3 px-4 text-left">Code</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Articles</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-left">Statut</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4 font-medium">{order.code}</td>

                <td className="py-3 px-4">
                  {new Date(order.created_at).toLocaleDateString("fr-FR")}
                </td>

                <td className="py-3 px-4">{order.items_count}</td>

                <td className="py-3 px-4">{order.total_amount} MAD</td>

                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusInfo(order.status)?.color}`}
                  >
                    {getStatusInfo(order.status)?.name}
                  </span>
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500 italic"
                >
                  Aucune commande trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* LOAD MORE BUTTON */}
      {hasMore && (
        <div className="text-center mt-4">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-300"
          >
            {loadingMore ? <div className="flex gap-2"><InterSpin /> Chargement...</div> : "Charger plus"}
          </button>
        </div>
      )}
    </div>
  );
}
