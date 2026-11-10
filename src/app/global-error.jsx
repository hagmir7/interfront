
"use client";

import { useEffect, useState } from "react";

export default function GlobalError({ error, reset }) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((previous) => {
        if (previous <= 1) {
          window.location.reload();
          return 5;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <html lang="fr">
      <body className="flex min-h-screen w-screen items-center justify-center bg-neutral-950 px-6 text-neutral-100">
        <div className="w-full max-w-md text-center">
          {/* Error Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-600/30 bg-red-600/10">
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
            Nous sommes actuellement en maintenance.
            Le service sera de nouveau disponible sous peu.
            Merci de votre patience.
          </p>

          {/* Automatic Reload Countdown */}
          <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
            <div className="flex items-center justify-center gap-2">
              <svg
                className="h-4 w-4 animate-spin text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>

              <span className="text-sm text-neutral-300">
                Nouvelle tentative dans{" "}
                <span className="font-semibold text-white">
                  {countdown}s
                </span>
              </span>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-neutral-800">
              <div
                className="h-full rounded-full bg-red-600 transition-all duration-1000 ease-linear"
                style={{
                  width: `${(countdown / 5) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Development Error */}
          {process.env.NODE_ENV === "development" &&
            error?.message && (
              <p className="mt-4 break-words rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-left font-mono text-xs text-neutral-500">
                {error.message}
              </p>
            )}

          {/* Buttons */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-500 active:scale-[0.98]"
            >
              Réessayer
            </button>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-xl border border-neutral-700 px-5 py-2.5 text-sm font-medium text-neutral-300 transition hover:bg-neutral-900 active:scale-[0.98]"
            >
              Recharger la page
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
