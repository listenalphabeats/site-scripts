import { isStaging } from './utils'

export function getOfferGenericMuse() {
  return {
    discountName: 'Limited Time Special Discount',
    couponId: isStaging() ? 'mhAenRNG' : '70LO0cr8',
    amountOff: 100,
  }
}

export function getOfferGenericBrainbit() {
  return {
    discountName: 'Limited Time Special Discount',
    couponId: isStaging() ? 'HmBrVIcf' : '4WDuUowk',
    amountOff: 250,
  }
}

export function getOfferMusersFeb() {
  return {
    discountName: '20% off the annual membership',
    couponId: isStaging() ? 'zQ6JJHDP' : 'gI3zXMpo',
    amountOff: 19.8,
  }
}

export function getOfferMusersPartner() {
  return {
    discountName: '15% Muse partner discount',
    couponId: isStaging() ? 'mTdF2WaN' : 'fEiKmnij',
    amountOff: 14.85,
  }
}
