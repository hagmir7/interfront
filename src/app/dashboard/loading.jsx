export default function DashboardLoading() {
  return (
    <div role="status" className="space-y-6 animate-pulse">
      <span className="sr-only">Chargement du tableau de bord…</span>
      <div className="h-8 w-56 rounded-lg bg-slate-200" />
      <div className="h-4 w-72 max-w-full rounded-lg bg-slate-200" />
      <div className="h-72 rounded-2xl border border-slate-200 bg-white" />
    </div>
  );
}
