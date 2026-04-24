import {
  Package,
  Send,
  Factory,
  ClipboardCheck,
  BadgeCheck,
  PackageCheck,
  Home,
} from 'lucide-react';

/**
 * Grouped status steps for the tracking timeline.
 *
 * Each group has:
 *  - ids: array of raw status_ids from the DB that belong to this group (ASCENDING order)
 *  - firstId / lastId: computed bounds used for timeline state logic
 *
 * State rules (per group, based on the order's status_id):
 *  - isCurrent   : status_id is within [firstId..lastId]
 *  - isCompleted : status_id >  group.lastId
 *  - isActive    : isCurrent || isCompleted
 *
 * Montage (5) and Monté (6) are intentionally ignored.
 */
export const STATUS_STEPS = [
  {
    key: 'accepte',
    name: 'Accepté',
    color: '#FF6B35',
    icon: Send,
    description: 'La commande a été acceptée et prise en charge.',
    ids: [1],
  },
  {
    key: 'fabrication',
    name: 'Fabrication',
    color: '#3B82F6',
    icon: Factory,
    description: 'La commande est en cours de fabrication.',
    ids: [2, 3, 4],
  },
  {
    key: 'preparation',
    name: 'Préparation',
    color: '#059669',
    icon: Package,
    description: 'Les articles sont en cours de préparation.',
    ids: [7, 8],
  },
  {
    key: 'controle',
    name: 'Contrôle',
    color: '#F59E0B',
    icon: ClipboardCheck,
    description: 'La commande est en cours de contrôle qualité.',
    ids: [9, 10],
  },
  {
    key: 'valide',
    name: 'Prête',
    color: '#22C55E',
    icon: BadgeCheck,
    description: 'La commande est validée et prête pour la livraison.',
    ids: [11],
  },
  {
    key: 'livre',
    name: 'Livré',
    color: '#15803D',
    icon: Home,
    description: 'La commande a été livrée avec succès.',
    ids: [12, 13, 14],
  },
].map((step, index) => ({
  ...step,
  id: index + 1,
  firstId: step.ids[0],
  lastId: step.ids[step.ids.length - 1],
}));

/**
 * Find the group matching a given raw status_id (from the DB).
 * Returns undefined if the status_id is in an ignored group (5, 6) or unknown.
 */
export const getStatusGroup = (statusId) => {
  const id = parseInt(statusId, 10);
  return STATUS_STEPS.find((step) => step.ids.includes(id));
};

/**
 * Build the list of steps to display in the timeline for a given order.
 * Applies conditional hiding rules based on the order data.
 *
 *  - The "Fabrication" step is hidden when:
 *    * `complation_date` is NOT set, AND
 *    * `status_id` is NOT 2 (Reçu)
 *    In other words: Fabrication is shown if the order has been received
 *    (status_id === 2) OR if fabrication has been completed (complation_date set).
 *
 * @param {Object} order - The tracking order
 * @returns {Array} Filtered STATUS_STEPS to render
 */
export const getVisibleSteps = (order) => {
  if (!order) return STATUS_STEPS;

  const statusId = parseInt(order.status_id, 10);

  return STATUS_STEPS.filter((step) => {
    if (step.key === 'fabrication') {
      const hasCompletion = !!order.complation_date;
      const isRecu = statusId === 2;
      // Hide Fabrication only when neither condition is met
      if (!hasCompletion && !isRecu) return false;
    }
    return true;
  });
};