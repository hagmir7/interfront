"use client";

export default function DashboardError({ reset }) {
  return (
    <div role="alert" className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
      <h2 className="text-xl font-semibold">Chargement impossible</h2>
      <p className="mt-3 text-slate-500">Veuillez réessayer dans quelques instants.</p>
      <button type="button" onClick={reset} className="mt-6 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Réessayer</button>
    </div>
  );
}
