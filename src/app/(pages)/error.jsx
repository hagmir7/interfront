'use client'

import { useEffect, useState } from 'react'

export default function Error({ error, reset }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    console.error(error)
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [error])

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div
        className={`w-[90%] max-w-[480px] transition-all duration-500 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <p className="text-xs font-medium tracking-widest uppercase text-red-500 mb-4">
          Erreur système
        </p>

        <h1 className="text-4xl font-light text-gray-900 leading-snug mb-3">
          Une erreur est survenue
        </h1>

        <p className="text-sm leading-relaxed text-gray-400 font-light mb-9">
          Nous avons rencontré un problème inattendu. Vous pouvez tenter
          de relancer la page ou revenir à l'accueil.
        </p>

        <hr className="border-gray-100 mb-8" />

        <div className="flex items-center gap-5">
          <button
            onClick={() => reset()}
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium tracking-wide px-6 py-2.5 rounded-full transition-colors duration-200 cursor-pointer"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="text-sm text-gray-400 hover:text-gray-600 underline underline-offset-4 transition-colors duration-200"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  )
}