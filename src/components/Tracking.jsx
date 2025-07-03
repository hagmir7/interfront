"use client"
import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';

export default function Tracking() {
  const [orderNumber, setOrderNumber] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Données de démonstration
  const sampleTrackingData = {
    orderNumber: 'CMD-2024-001234',
    status: 'en_transit',
    estimatedDelivery: '15 Juillet 2025',
    currentLocation: 'Centre de tri - Rabat',
    steps: [
      {
        id: 1,
        title: 'Commande confirmée',
        description: 'Votre commande a été reçue et confirmée',
        date: '28 Juin 2025, 14:30',
        completed: true,
        icon: CheckCircle
      },
      {
        id: 2,
        title: 'Préparation',
        description: 'Votre commande est en cours de préparation',
        date: '29 Juin 2025, 09:15',
        completed: true,
        icon: Package
      },
      {
        id: 3,
        title: 'Expédiée',
        description: 'Votre commande a été expédiée',
        date: '30 Juin 2025, 16:45',
        completed: true,
        icon: Truck
      },
      {
        id: 4,
        title: 'En transit',
        description: 'Votre colis est en route vers sa destination',
        date: '1 Juillet 2025, 08:20',
        completed: true,
        icon: MapPin,
        current: true
      },
      {
        id: 5,
        title: 'Livraison',
        description: 'Votre colis sera livré à votre adresse',
        date: 'Prévue le 15 Juillet 2025',
        completed: false,
        icon: CheckCircle
      }
    ]
  };

  const handleTrackOrder = (e) => {
    if (e) e.preventDefault();
    if (!orderNumber.trim()) return;
    
    setIsLoading(true);
    // Simulation d'une requête API
    setTimeout(() => {
      setTrackingData(sampleTrackingData);
      setIsLoading(false);
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-blue-600';
      case 'preparing': return 'text-yellow-600';
      case 'shipped': return 'text-purple-600';
      case 'en_transit': return 'text-[#da3036]';
      case 'delivered': return 'text-green-600';
      default: return 'text-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Confirmée';
      case 'preparing': return 'En préparation';
      case 'shipped': return 'Expédiée';
      case 'en_transit': return 'En transit';
      case 'delivered': return 'Livrée';
      default: return 'Statut inconnu';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      {/* En-tête */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Suivre votre commande
        </h2>
        <p className="text-gray-600">
          Entrez votre numéro de commande pour suivre son statut en temps réel
        </p>
      </div>

      {/* Formulaire de recherche */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <div className="flex-1 relative">
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="Numéro de commande (ex: CMD-2024-001234)"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#da3036] focus:outline-none transition-colors"
              onKeyPress={(e) => e.key === 'Enter' && handleTrackOrder(e)}
            />
          </div>
          <button
            onClick={handleTrackOrder}
            disabled={isLoading || !orderNumber.trim()}
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

      {/* Résultats du suivi */}
      {trackingData && (
        <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
          {/* Informations de la commande */}
          <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Commande #{trackingData.orderNumber}
                </h3>
                <p className={`text-sm font-medium ${getStatusColor(trackingData.status)}`}>
                  Statut: {getStatusText(trackingData.status)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Livraison estimée</p>
                <p className="text-lg font-semibold text-[#da3036]">
                  {trackingData.estimatedDelivery}
                </p>
              </div>
            </div>
            {trackingData.currentLocation && (
              <div className="mt-3 flex items-center gap-2 text-gray-600">
                <MapPin size={16} />
                <span className="text-sm">Position actuelle: {trackingData.currentLocation}</span>
              </div>
            )}
          </div>

          {/* Timeline de suivi */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Historique de suivi
            </h4>
            <div className="relative">
              {trackingData.steps.map((step, index) => {
                const IconComponent = step.icon;
                const isLast = index === trackingData.steps.length - 1;
                
                return (
                  <div key={step.id} className="relative flex gap-4 pb-6">
                    {/* Ligne de connexion */}
                    {!isLast && (
                      <div className={`absolute left-6 top-12 w-0.5 h-full ${
                        step.completed ? 'bg-[#da3036]' : 'bg-gray-300'
                      }`}></div>
                    )}
                    
                    {/* Icône */}
                    <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                      step.current 
                        ? 'bg-[#da3036] border-[#da3036] text-white animate-pulse' 
                        : step.completed 
                          ? 'bg-[#da3036] border-[#da3036] text-white'
                          : 'bg-white border-gray-300 text-gray-400'
                    }`}>
                      <IconComponent size={20} />
                    </div>
                    
                    {/* Contenu */}
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <h5 className={`font-medium ${
                          step.current ? 'text-[#da3036]' : step.completed ? 'text-gray-800' : 'text-gray-500'
                        }`}>
                          {step.title}
                          {step.current && (
                            <span className="ml-2 px-2 py-1 text-xs bg-[#da3036] text-white rounded-full">
                              En cours
                            </span>
                          )}
                        </h5>
                        <span className={`text-sm ${
                          step.completed ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {step.date}
                        </span>
                      </div>
                      <p className={`text-sm mt-1 ${
                        step.completed ? 'text-gray-600' : 'text-gray-400'
                      }`}>
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
              <Clock className="text-blue-600 mt-0.5" size={18} />
              <div>
                <p className="text-sm text-blue-800 font-medium">
                  Information de livraison
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  Les délais de livraison peuvent varier en fonction des conditions météorologiques et du trafic. 
                  Vous recevrez une notification SMS/Email lors de la livraison.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message d'aide */}
      {!trackingData && !isLoading && (
        <div className="text-center py-8">
          <Package className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-500">
            Entrez votre numéro de commande ci-dessus pour commencer le suivi
          </p>
        </div>
      )}
    </div>
  );
}