export function OrderSummary({ originalPrice, tax, total, onSubmit, isLoading = false }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <dl className="flex items-center justify-between gap-4">
          <dt className="text-base font-normal text-gray-500">Prix d'origine</dt>
          <dd className="text-base font-bold text-gray-900">{originalPrice.toFixed(2)} MAD</dd>
        </dl>
        <dl className="flex items-center justify-between gap-4">
          <dt className="text-base font-normal text-gray-500">Taxe</dt>
          <dd className="text-base font-bold text-gray-900">{tax.toFixed(2)} MAD</dd>
        </dl>
      </div>
      
      <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
        <dt className="text-base font-bold text-gray-900">Total</dt>
        <dd className="text-xl font-black text-gray-900">{total.toFixed(2)} MAD</dd>
      </dl>
      
      <div className="flex justify-end">
        <button 
          onClick={onSubmit}
          disabled={isLoading}
          type="button" 
          className="btn btn-primary gap-2 text-center flex items-start justify-center"
        >
          <span>
            Envoyer la commande
            {isLoading && (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path className="animate-spin" d="M3 12a9 9 0 0 0 9 9a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9" />
                <path className="animate-spin" d="M17 12a5 5 0 1 0 -5 5" />
              </svg>
            )}
          </span>
          {!isLoading && (
            <svg className="h-5 w-5 mt-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}