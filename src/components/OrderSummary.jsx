import { ArrowRight, RotateCw } from "lucide-react";

export function OrderSummary({ originalPrice, tax, total, onSubmit, isLoading = false }) {
  return (
    <div className="space-y-5">
      
      {/* Prices */}
      <div className="space-y-3">
        <dl className="flex items-center justify-between">
          <dt className="text-sm text-gray-600">Prix HT</dt>
          <dd className="text-base font-semibold text-gray-900">
            {originalPrice.toFixed(2)} MAD
          </dd>
        </dl>

        <dl className="flex items-center justify-between">
          <dt className="text-sm text-gray-600">TTC</dt>
          <dd className="text-base font-semibold text-gray-900">
            {tax.toFixed(2)} MAD
          </dd>
        </dl>
      </div>

      {/* Total */}
      <dl className="flex items-center justify-between border-t border-gray-200 pt-4">
        <dt className="text-lg font-bold text-gray-900">Prix Total TTC</dt>
        <dd className="text-2xl font-extrabold text-red-600">
          {total.toFixed(2)} MAD
        </dd>
      </dl>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={onSubmit}
          disabled={isLoading}
          type="button"
          className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold text-white 
          bg-red-600 hover:bg-red-700 transition-all shadow-sm disabled:opacity-60`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <RotateCw
                  className="w-5 h-5 text-gray-white animate-spin"
                  style={{ animationDuration: "0.8s" }}
                />
              
              Envoi en cours...
            </div>
          ) : (
            <>
              Envoyer la commande

              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
