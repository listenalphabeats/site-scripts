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

export function getOfferSuperBowlBrainbit() {
  return {
    discountName: '50% Off SuperBowl Deal',
    couponId: isStaging() ? 'gmtxMx5q' : 'osSWNTSD',
    amountOff: 250,
  }
}
