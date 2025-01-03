import { isStaging } from './utils'

export function getMuseCESOffer() {
  return {
    discountName: 'Exclusive CES Discount',
    couponId: isStaging() ? 'EV1esVhd' : 'CmUrEbFf',
    amountOff: 200,
  }
}

export function getBrainbitCESOffer() {
  return {
    discountName: 'Exclusive CES Discount',
    couponId: isStaging() ? '1P2r7jG5' : 'DhqopqfN',
    amountOff: 299,
  }
}
