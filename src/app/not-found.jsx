export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-[90%] max-w-[480px]">

        <p className="text-xs font-medium tracking-widest uppercase text-red-500 mb-4">
          Erreur 404
        </p>

        <h1 className="text-4xl font-light text-gray-900 leading-snug mb-3">
          Page introuvable
        </h1>

        <p className="text-sm leading-relaxed text-gray-400 font-light mb-9">
          La page que vous recherchez n'existe pas ou a été déplacée.
          Vérifiez l'adresse ou revenez à l'accueil.
        </p>

        <hr className="border-gray-100 mb-8" />

        <div className="flex items-center gap-5">
          <a
            href="/"
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium tracking-wide px-6 py-2.5 rounded-full transition-colors duration-200"
          >
            Retour à l'accueil
          </a>
          <a
            href="javascript:history.back()"
            className="text-sm text-gray-400 hover:text-gray-600 underline underline-offset-4 transition-colors duration-200"
          >
            Page précédente
          </a>
        </div>

      </div>
    </div>
  )
}