'use client'

export default function GlobalError({ error, reset }) {
  return (
    <html lang="fr">
      <body className="flex w-screen h-screen justify-center items-center bg-neutral-950 text-neutral-100 px-6">
        <div className="max-w-md w-full text-center">
          {/* Icône */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600/10 border border-red-600/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m0 3.75h.008v.008H12v-.008ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>

          <h1 className="text-xl font-semibold tracking-tight">
            Une erreur est survenue
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-neutral-400">
            Nous sommes actuellement en maintenance pour environ{' '}
            <span className="text-neutral-200 font-medium">5 minutes</span>.
            Le service sera de nouveau disponible sous peu, merci de votre
            patience.
          </p>

          {process.env.NODE_ENV === 'development' && error?.message && (
            <p className="mt-4 rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-2 text-left text-xs text-neutral-500 font-mono break-words">
              {error.message}
            </p>
          )}

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-500 active:scale-[0.98]"
            >
              Réessayer
            </button>
            <button
              onClick={() => window.location.reload()}
              className="rounded-xl border border-neutral-700 px-5 py-2.5 text-sm font-medium text-neutral-300 transition hover:bg-neutral-900 active:scale-[0.98]"
            >
              Recharger la page
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}