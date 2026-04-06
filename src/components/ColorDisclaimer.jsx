import { Info } from 'lucide-react'

const ColorDisclaimer = () => {
  return (
    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-800">
      <Info className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
      <p>
        <span className="hidden sm:inline">
          Les couleurs affichées à l&apos;écran peuvent légèrement différer de la réalité. Nous vous recommandons de vérifier avec un échantillon réel.
        </span>
        <span className="inline sm:hidden">
          Les couleurs peuvent varier selon les supports numériques. Veuillez vérifier avec un échantillon original.
        </span>
      </p>
    </div>
  )
}

export default ColorDisclaimer