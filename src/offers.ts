import { isStaging } from './utils'

export function getMuseCESOffer() {
  return {
    discountName: 'Exclusive CES Discount',
    couponId: isStaging() ? 'BXkB18mL' : 'WSeHfM47',
    amountOff: 100,
  }
}

export function getBrainbitCESOffer() {
  return {
    discountName: 'Exclusive CES Discount',
    couponId: isStaging() ? 'Xos0oOEa' : 'A5K0hpO5',
    amountOff: 200,
  }
}
