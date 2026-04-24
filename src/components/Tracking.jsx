"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {
  Search,
  Package,
  Clock,
  AlertCircle,
  Copy,
  Check,
  RefreshCcw,
  X,
  Share2,
} from 'lucide-react';
import {
  STATUS_STEPS,
  getStatusGroup,
  getVisibleSteps,
} from '@/constants/trackingStatuses';
import { tracking } from '@/services/tracking';

const formatDate = (value) => {
  if (!value) return null;
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const formatDateTime = (value) => {
  if (!value) return null;
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function Tracking({ initialCode = '' }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [orderCode, setOrderCode] = useState(initialCode);
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const fetchOrder = useCallback(async (code) => {
    if (!code || !code.trim()) return;

    setIsLoading(true);
    setError(null);
    setTrackingData(null);

    try {
      const data = await tracking(code.trim());

      let order = data;
      if (Array.isArray(data)) order = data[0];
      else if (data && data.data) order = Array.isArray(data.data) ? data.data[0] : data.data;

      if (!order || (!order.id && !order.piece)) {
        throw new Error("Aucune donnée trouvée pour ce code.");
      }

      setTrackingData(order);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("Commande introuvable. Vérifiez votre code et réessayez.");
      } else {
        setError(err.message || "Une erreur s'est produite lors de la recherche.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-fetch when an initial code is provided (e.g. from ?code= URL param)
  useEffect(() => {
    if (initialCode) {
      fetchOrder(initialCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCode]);

  // React to URL ?code= changes (back/forward navigation, external links)
  useEffect(() => {
    const urlCode = searchParams.get('code');
    if (urlCode && urlCode !== orderCode) {
      setOrderCode(urlCode);
      fetchOrder(urlCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const updateUrlWithCode = (code) => {
    const params = new URLSearchParams(searchParams.toString());
    if (code) params.set('code', code);
    else params.delete('code');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleTrackOrder = async (e) => {
    if (e) e.preventDefault();
    if (!orderCode.trim()) return;
    updateUrlWithCode(orderCode.trim());
    await fetchOrder(orderCode);
  };

  const handleReset = () => {
    setOrderCode('');
    setTrackingData(null);
    setError(null);
    updateUrlWithCode('');
  };

  const handleCopyLink = async () => {
    try {
      const url = `${window.location.origin}${pathname}?code=${encodeURIComponent(orderCode.trim())}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API failed - silently ignore
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}${pathname}?code=${encodeURIComponent(orderCode.trim())}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Suivi commande ${trackingData?.code || trackingData?.piece_bc || orderCode}`,
          text: `Suivez la progression de la commande`,
          url,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      handleCopyLink();
    }
  };

  const rawStatusId = trackingData ? parseInt(trackingData.status_id, 10) : null;

  const fabricationHidden =
    !!trackingData &&
    !trackingData.complation_date &&
    rawStatusId !== 2;

  const currentStatusId = (() => {
    if (rawStatusId === null) return null;
    if (rawStatusId === 5 || rawStatusId === 6) return 7;
    if (fabricationHidden && [2, 3, 4].includes(rawStatusId)) return 7;
    return rawStatusId;
  })();

  const currentGroup = trackingData ? getStatusGroup(currentStatusId) : null;
  const visibleSteps = trackingData ? getVisibleSteps(trackingData) : STATUS_STEPS;

  // Progress percentage based on visible steps
  const progressPercent = (() => {
    if (!trackingData || !currentStatusId) return 0;
    const currentIndex = visibleSteps.findIndex(
      (s) => currentStatusId >= s.firstId && currentStatusId <= s.lastId
    );
    const completedIndex = visibleSteps.findIndex((s) => currentStatusId <= s.lastId);
    const index = currentIndex >= 0 ? currentIndex : completedIndex;
    if (index < 0) return 100;
    return Math.round(((index + 0.5) / visibleSteps.length) * 100);
  })();

  return (
    <div className="max-w-7xl mx-auto px-2">
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
        {/* Search header */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">
            Suivre votre commande
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Entrez votre code de commande pour suivre son statut en temps réel
          </p>
        </div>

        {/* Search form */}
        <form onSubmit={handleTrackOrder} className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                value={orderCode}
                onChange={(e) => setOrderCode(e.target.value)}
                placeholder="Code de commande (ex: 26BC02100)"
                className="w-full pl-10 pr-10 py-3 border-2 border-gray-300 rounded-lg focus:border-[#da3036] focus:outline-none transition-colors"
                aria-label="Code de commande"
              />
              {orderCode && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Effacer"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading || !orderCode.trim()}
              className="px-6 py-3 bg-[#da3036] text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 font-medium"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Recherche...</span>
                </>
              ) : (
                <>
                  <Search size={18} />
                  <span>Suivre</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="max-w-xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
          >
            <AlertCircle className="text-red-600 mt-0.5 flex-shrink-0" size={20} />
            <div className="flex-1">
              <p className="text-sm text-red-700 font-medium">Erreur de suivi</p>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
            <button
              onClick={() => fetchOrder(orderCode)}
              className="flex items-center gap-1 text-sm text-red-700 hover:text-red-900 font-medium"
              aria-label="Réessayer"
            >
              <RefreshCcw size={14} />
              Réessayer
            </button>
          </div>
        )}

        {/* Tracking results */}
        {trackingData && (
          <div className="bg-gray-50 rounded-xl p-4 md:p-6 shadow-sm">
            {/* Order info card */}
            <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Commande #
                      {trackingData.code ||
                        trackingData.piece_bc ||
                        trackingData.piece}
                    </h3>
                    {trackingData.urgent === '1' && (
                      <span className="px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded-full font-medium">
                        Urgent
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Pièce: <span className="font-medium">{trackingData.piece}</span>
                    {trackingData.piece_bc && (
                      <>
                        {' '}
                        • BC:{' '}
                        <span className="font-medium">{trackingData.piece_bc}</span>
                      </>
                    )}
                  </p>
                  {currentGroup && (
                    <p
                      className="text-sm font-medium mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: `${currentGroup.color}20`,
                        color: currentGroup.color,
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: currentGroup.color }}
                      ></span>
                      Statut: {currentGroup.name}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-start sm:items-end gap-2">
                  <div className="sm:text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Livraison estimée
                    </p>
                    <p className="text-lg font-semibold text-[#da3036]">
                      {formatDate(trackingData.delivery_date) || 'Non définie'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center gap-1 text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                      aria-label="Copier le lien de suivi"
                    >
                      {copied ? (
                        <>
                          <Check size={12} className="text-green-600" />
                          <span className="text-green-600">Copié</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copier</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-1 text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                      aria-label="Partager"
                    >
                      <Share2 size={12} />
                      <span>Partager</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500">Progression</span>
                  <span className="text-xs font-medium text-gray-700">
                    {progressPercent}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-700 ease-out rounded-full"
                    style={{
                      width: `${progressPercent}%`,
                      backgroundColor: currentGroup?.color || '#da3036',
                    }}
                  ></div>
                </div>
              </div>

              {/* Additional details */}
              <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                {trackingData.type && (
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wide">
                      Type
                    </p>
                    <p className="font-medium text-gray-800">{trackingData.type}</p>
                  </div>
                )}
                {trackingData.ref && (
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wide">
                      Référence
                    </p>
                    <p className="font-medium text-gray-800">{trackingData.ref}</p>
                  </div>
                )}
                {trackingData.client_id && (
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wide">
                      Client
                    </p>
                    <p className="font-medium text-gray-800">
                      {trackingData.client_id}
                    </p>
                  </div>
                )}
                {trackingData.created_at && (
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wide">
                      Créée le
                    </p>
                    <p className="font-medium text-gray-800">
                      {formatDate(trackingData.created_at)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Historique de suivi
              </h4>
              <div className="relative">
                {visibleSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  const isLast = index === visibleSteps.length - 1;

                  const isCompleted =
                    currentStatusId !== null && currentStatusId > step.lastId;
                  const isCurrent =
                    currentStatusId !== null &&
                    currentStatusId >= step.firstId &&
                    currentStatusId <= step.lastId;
                  const isFinished = step.lastId === 14 && currentStatusId === 14;
                  const isActive = isCompleted || isCurrent;

                  let stepDate = null;
                  if (step.firstId === 1 && trackingData.created_at) {
                    stepDate = trackingData.created_at;
                  } else if (step.lastId === 14 && trackingData.complation_date) {
                    stepDate = trackingData.complation_date;
                  } else if (isCurrent && trackingData.updated_at) {
                    stepDate = trackingData.updated_at;
                  }

                  return (
                    <div key={step.id} className="relative flex gap-4 pb-6">
                      {/* Connection line */}
                      {!isLast && (
                        <div
                          className="absolute left-6 top-12 w-0.5 h-full transition-colors duration-500"
                          style={{
                            backgroundColor: isCompleted ? step.color : '#D1D5DB',
                          }}
                        ></div>
                      )}

                      {/* Icon */}
                      <div
                        className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 flex-shrink-0 transition-all duration-500"
                        style={{
                          backgroundColor: isActive ? step.color : '#FFFFFF',
                          borderColor: isActive ? step.color : '#D1D5DB',
                          color: isActive ? '#FFFFFF' : '#9CA3AF',
                          boxShadow: isCurrent
                            ? `0 0 0 4px ${step.color}25`
                            : 'none',
                        }}
                      >
                        <div
                          className={
                            isCurrent && !isFinished ? 'animate-pulse' : ''
                          }
                        >
                          <IconComponent size={20} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <h5
                            className="font-medium flex items-center gap-2 flex-wrap"
                            style={{
                              color: isCurrent
                                ? step.color
                                : isCompleted
                                ? '#1F2937'
                                : '#9CA3AF',
                            }}
                          >
                            {step.name}
                            {isCurrent && (
                              <span
                                className="px-2 py-0.5 text-xs text-white rounded-full"
                                style={{ backgroundColor: step.color }}
                              >
                                En cours
                              </span>
                            )}
                          </h5>
                          {stepDate && (
                            <span
                              className={`text-sm ${
                                isActive ? 'text-gray-600' : 'text-gray-400'
                              }`}
                            >
                              {formatDateTime(stepDate)}
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-sm mt-1 ${
                            isActive ? 'text-gray-600' : 'text-gray-400'
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer note */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Clock
                  className="text-blue-600 mt-0.5 flex-shrink-0"
                  size={18}
                />
                <div>
                  <p className="text-sm text-blue-800 font-medium">
                    Information de livraison
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    Les délais de livraison peuvent varier en fonction des
                    conditions météorologiques et du trafic. Vous recevrez une
                    notification SMS/Email lors de la livraison.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!trackingData && !isLoading && !error && (
          <div className="text-center py-12">
            <Package className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500 mb-2">
              Entrez votre code de commande ci-dessus pour commencer le suivi
            </p>
            <p className="text-xs text-gray-400">
              Exemples: CMD-XXXXXX, BPS00000, 26BC00000
            </p>
          </div>
        )}
      </div>
    </div>
  );
}