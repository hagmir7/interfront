export default function ClientSection({ title, description, children }) {
  return (
    <div className="space-y-7">
      <div>
        <p className="mb-2 text-sm font-medium text-red-600">Espace client</p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        <p className="mt-2 text-base leading-relaxed text-slate-500">{description}</p>
      </div>
      <section aria-label={title} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
        {children}
      </section>
    </div>
  );
}
