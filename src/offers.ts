import { isStaging } from './utils'

export function getMuseHolidayOffer() {
  return {
    discountName: 'Holiday discount',
    couponId: isStaging() ? 'EEkB1vom' : 'nMNvr0Zo',
    amountOff: 150,
    ctaTitle: 'Order now',
  }
}

export function getMuseCESOffer() {
  return {
    discountName: 'Exclusive CES Discount',
    couponId: isStaging() ? 'EV1esVhd' : 'CmUrEbFf',
    amountOff: 200,
    ctaTitle: 'Order now',
  }
}

export function getBrainbitHolidayOffer() {
  return {
    discountName: 'Holiday discount',
    couponId: isStaging() ? 'B4o0gHgR' : 'QVyhS92c',
    amountOff: 200,
    ctaTitle: 'Order now',
  }
}

export function getBrainbitCESOffer() {
  return {
    discountName: 'Exclusive CES Discount',
    couponId: isStaging() ? '1P2r7jG5' : 'DhqopqfN',
    amountOff: 299,
    ctaTitle: 'Order now',
  }
}
