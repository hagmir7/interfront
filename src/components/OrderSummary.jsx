export function OrderSummary({ originalPrice, tax, total, onSubmit, isLoading = false }) {
  return (
    <div className="space-y-5">
      
      {/* Prices */}
      <div className="space-y-3">
        <dl className="flex items-center justify-between">
          <dt className="text-sm text-gray-600">Prix d'origine</dt>
          <dd className="text-base font-semibold text-gray-900">
            {originalPrice.toFixed(2)} MAD
          </dd>
        </dl>

        <dl className="flex items-center justify-between">
          <dt className="text-sm text-gray-600">Taxe</dt>
          <dd className="text-base font-semibold text-gray-900">
            {tax.toFixed(2)} MAD
          </dd>
        </dl>
      </div>

      {/* Total */}
      <dl className="flex items-center justify-between border-t border-gray-200 pt-4">
        <dt className="text-lg font-bold text-gray-900">Total</dt>
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
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                ></path>
              </svg>
              Envoi en cours...
            </div>
          ) : (
            <>
              Envoyer la commande
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
