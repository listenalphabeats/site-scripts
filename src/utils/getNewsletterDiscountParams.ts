/** @deprecated */
export const NEWSLETTER_DISCOUNT_PARAMS_STORAGE_ID = 'newsletterDiscountParams'

/** @deprecated */
export function getNewsletterDiscountParams() {
  return localStorage.getItem(NEWSLETTER_DISCOUNT_PARAMS_STORAGE_ID)
}
