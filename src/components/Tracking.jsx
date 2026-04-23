"use client"
import React, { useState } from 'react';
import {
  Search,
  Package,
  Truck,
  Clock,
  Send,
  Inbox,
  Factory,
  Wrench,
  Hammer,
  Layers,
  ClipboardCheck,
  ShieldCheck,
  BadgeCheck,
  PackageCheck,
  Boxes,
  Home,
  AlertCircle,
} from 'lucide-react';

const STATUS_STEPS = [
  { id: 1,  name: 'Transféré',   color: '#FF6B35', icon: Send,            description: 'La commande a été transférée' },
  { id: 2,  name: 'Reçu',        color: '#10B981', icon: Inbox,           description: 'La commande a été reçue' },
  { id: 3,  name: 'Fabrication', color: '#3B82F6', icon: Factory,         description: 'Fabrication en cours' },
  { id: 4,  name: 'Fabriqué',    color: '#06B6D4', icon: Wrench,          description: 'Fabrication terminée' },
  { id: 5,  name: 'Montage',     color: '#8B5CF6', icon: Hammer,          description: 'Montage en cours' },
  { id: 6,  name: 'Monté',       color: '#A855F7', icon: Layers,          description: 'Montage terminé' },
  { id: 7,  name: 'Préparation', color: '#059669', icon: Package,         description: 'Préparation de la commande' },
  { id: 8,  name: 'Préparé',     color: '#14B8A6', icon: PackageCheck,    description: 'Commande préparée' },
  { id: 9,  name: 'Contrôle',    color: '#F59E0B', icon: ClipboardCheck,  description: 'Contrôle qualité en cours' },
  { id: 10, name: 'Contrôlé',    color: '#EF4444', icon: ShieldCheck,     description: 'Contrôle qualité terminé' },
  { id: 11, name: 'Validé',      color: '#22C55E', icon: BadgeCheck,      description: 'Commande validée' },
  { id: 12, name: 'Livraison',   color: '#6366F1', icon: Truck,           description: 'En cours de livraison' },
  { id: 13, name: 'Chargement',  color: '#7C3AED', icon: Boxes,           description: 'Chargement du véhicule' },
  { id: 14, name: 'Livré',       color: '#15803D', icon: Home,            description: 'Commande livrée' },
];

const formatDate = (value) => {
  if (!value) return null;
  try {
    const d = new Date(value);
    if (isNaN(d.getTime())) return value;
    return d.toLocaleString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return value;
  }
};

const formatDateOnly = (value) => {
  if (!value) return null;
  try {
    const d = new Date(value);
    if (isNaN(d.getTime())) return value;
    return d.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return value;
  }
};

export default function Tracking() {
  const [orderCode, setOrderCode] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTrackOrder = async (e) => {
    if (e) e.preventDefault();
    if (!orderCode.trim()) return;

    setIsLoading(true);
    setError(null);
    setTrackingData(null);

    try {
      // Call the internal Next.js proxy route to bypass the 402 / Cloudflare block
      const res = await fetch(
        `/api/tracking?code=${encodeURIComponent(orderCode.trim())}`,
        {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
        }
      );

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Commande introuvable. Vérifiez votre code et réessayez.");
        }
        throw new Error(`Erreur serveur (${res.status}). Veuillez réessayer plus tard.`);
      }

      const data = await res.json();

      // Handle different response shapes: direct object, { data: ... }, or array
      let order = data;
      if (Array.isArray(data)) order = data[0];
      else if (data && data.data) order = Array.isArray(data.data) ? data.data[0] : data.data;

      if (!order || !order.code) {
        throw new Error("Aucune donnée trouvée pour ce code.");
      }

      setTrackingData(order);
    } catch (err) {
      setError(err.message || "Une erreur s'est produite lors de la recherche.");
    } finally {
      setIsLoading(false);
    }
  };

  const currentStatusId = trackingData ? parseInt(trackingData.status_id, 10) : null;
  const currentStep = STATUS_STEPS.find((s) => s.id === currentStatusId);

  return (
    <div className="max-w-7xl mx-auto px-2">
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">
            Suivre votre commande
          </h2>
          <p className="text-gray-600">
            Entrez votre code de commande pour suivre son statut en temps réel
          </p>
        </div>

        {/* Formulaire de recherche */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1 relative">
              <input
                type="text"
                value={orderCode}
                onChange={(e) => setOrderCode(e.target.value)}
                placeholder="Code de commande (ex: BPS00366)"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#da3036] focus:outline-none transition-colors"
                onKeyPress={(e) => e.key === 'Enter' && handleTrackOrder(e)}
              />
            </div>
            <button
              onClick={handleTrackOrder}
              disabled={isLoading || !orderCode.trim()}
              className="px-6 py-3 bg-[#da3036] text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 font-medium"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Recherche...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Search size={18} />
                  <span>Suivre</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Erreur */}
        {error && (
          <div className="max-w-md mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="text-red-600 mt-0.5 flex-shrink-0" size={20} />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Résultats du suivi */}
        {trackingData && (
          <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
            {/* Informations de la commande */}
            <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Commande #{trackingData.code}
                    </h3>
                    {trackingData.urgent === "1" && (
                      <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full font-medium">
                        Urgent
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Pièce: <span className="font-medium">{trackingData.piece}</span>
                    {trackingData.piece_bc && (
                      <> • BC: <span className="font-medium">{trackingData.piece_bc}</span></>
                    )}
                  </p>
                  {currentStep && (
                    <p
                      className="text-sm font-medium mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: `${currentStep.color}20`,
                        color: currentStep.color,
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: currentStep.color }}
                      ></span>
                      Statut: {currentStep.name}
                    </p>
                  )}
                </div>
                <div className="sm:text-right">
                  <p className="text-sm text-gray-600">Livraison estimée</p>
                  <p className="text-lg font-semibold text-[#da3036]">
                    {formatDateOnly(trackingData.delivery_date) || 'Non définie'}
                  </p>
                </div>
              </div>

              {/* Détails supplémentaires */}
              <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                {trackingData.type && (
                  <div>
                    <p className="text-gray-500">Type</p>
                    <p className="font-medium text-gray-800">{trackingData.type}</p>
                  </div>
                )}
                {trackingData.ref && (
                  <div>
                    <p className="text-gray-500">Référence</p>
                    <p className="font-medium text-gray-800">{trackingData.ref}</p>
                  </div>
                )}
                {trackingData.client_id && (
                  <div>
                    <p className="text-gray-500">Client</p>
                    <p className="font-medium text-gray-800">{trackingData.client_id}</p>
                  </div>
                )}
                {trackingData.created_at && (
                  <div>
                    <p className="text-gray-500">Créée le</p>
                    <p className="font-medium text-gray-800">
                      {formatDateOnly(trackingData.created_at)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Timeline de suivi */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Historique de suivi
              </h4>
              <div className="relative">
                {STATUS_STEPS.map((step, index) => {
                  const IconComponent = step.icon;
                  const isLast = index === STATUS_STEPS.length - 1;
                  const isCompleted = currentStatusId !== null && step.id < currentStatusId;
                  const isCurrent = step.id === currentStatusId;
                  const isFinished = currentStatusId === 14 && step.id === 14;
                  const isActive = isCompleted || isCurrent;

                  // Pick a date for this step if available from the order data
                  let stepDate = null;
                  if (step.id === 1 && trackingData.created_at) stepDate = trackingData.created_at;
                  else if (step.id === 14 && trackingData.complation_date) stepDate = trackingData.complation_date;
                  else if (isCurrent && trackingData.updated_at) stepDate = trackingData.updated_at;

                  return (
                    <div key={step.id} className="relative flex gap-4 pb-6">
                      {/* Ligne de connexion */}
                      {!isLast && (
                        <div
                          className="absolute left-6 top-12 w-0.5 h-full"
                          style={{
                            backgroundColor: isCompleted ? step.color : '#D1D5DB',
                          }}
                        ></div>
                      )}

                      {/* Icône */}
                      <div
                        className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 flex-shrink-0"
                        style={{
                          backgroundColor: isActive ? step.color : '#FFFFFF',
                          borderColor: isActive ? step.color : '#D1D5DB',
                          color: isActive ? '#FFFFFF' : '#9CA3AF',
                        }}
                      >
                        <div className={isCurrent && !isFinished ? 'animate-pulse' : ''}>
                          <IconComponent size={20} />
                        </div>
                      </div>

                      {/* Contenu */}
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
                              {formatDate(stepDate)}
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

            {/* Note de bas de page */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Clock className="text-blue-600 mt-0.5 flex-shrink-0" size={18} />
                <div>
                  <p className="text-sm text-blue-800 font-medium">
                    Information de livraison
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    Les délais de livraison peuvent varier en fonction des conditions
                    météorologiques et du trafic. Vous recevrez une notification
                    SMS/Email lors de la livraison.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Message d'aide */}
        {!trackingData && !isLoading && !error && (
          <div className="text-center py-8">
            <Package className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500">
              Entrez votre code de commande ci-dessus pour commencer le suivi
            </p>
          </div>
        )}
      </div>
    </div>
  );
}